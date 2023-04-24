import mongoose from "mongoose";
import chai from "chai";
import supertest from "supertest";
import mongoDB from "./db.js";

const expect = chai.expect;

const requester = supertest(mongoDB());

const mockProduct = {
  id: "63ec1b91af624e3dbf210573",
  title: "productOne",
  description: "This is the product one",
  price: 10000,
  thumbnail: "foto",
  stock: 999999,
  code: "ABC123knd7W3y",
  category: "products",
  status: true,
  owner: "admin",
};

const newProduct = {
  id: "63ec1b91af632f3dbf210999",
  title: "Nuevo Producto",
  price: 120,
  description: "Este producto es nuevo",
  thumbnail: "foto nueva",
  category: "novedoso",
  stock: 1000,
  code: "abc123nuevo",
  status: true,
  owner: "admin",
};

const mockCart = {
  id: 101101,
  products: [
    { product: "63ec1c2f2d9092879a262b73", quantity: 9 },
    { product: "63ec1c5611561404e23ef5b8", quantity: 12 },
    { product: "63ec1cac476f258e4e351b9a", quantity: 18 },
  ],
};

const mockUser = {
  firstName: "Ignacio",
  lastName: "Fernandez",
  age: 31,
  email: "nachofernandez@gmail.com",
  password: "carp912nachito",
};

describe("Modulo de testing de Routers de Products, Carts y Sessions", () => {
  before(async () => {
    await mongoDB();
  });

  // Products Router

  describe("Testing de products router", () => {
    beforeEach(async () => {
      await mongoose.connection.collection("products").deleteMany({});
      this.timeout(100000);
    });
    after(async () => {
      mongoose.connection.close();
    });
    it("Get Products debe devolver un array", async () => {
      const res = await requester.get("/api/products/");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body).to.include.all.keys(
        "id",
        "title",
        "price",
        "description",
        "thumbnail",
        "category",
        "stock",
        "code",
        "status",
        "owner"
      );
    });
    it("Get Products by ID debe devolver un producto", async () => {
      const res = await requester.get("/api/products/:pid").send(mockProduct);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.include.all.keys(
        "id",
        "title",
        "price",
        "description",
        "thumbnail",
        "category",
        "stock",
        "code",
        "status",
        "owner"
      );
      expect(res.body.id).to.equal(mockProduct.id);
    });
    it("Add Products debe crear un producto ", async () => {
      const res = await requester.post("/api/products/:pid").send(newProduct);
      expect(res).to.have.status(201);
    });
    it("Update Products debe modificar un producto", async () => {
      const updatedProduct = { price: 250 }; // Actualiza el precio
      const res = await requester
        .put("/api/products/:pid")
        .send(updatedProduct);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.include.all.keys(
        "id",
        "title",
        "price",
        "description",
        "thumbnail",
        "category",
        "stock",
        "code",
        "status",
        "owner"
      );
      expect(res.body.id).to.equal(mockProduct.id);
    });
  });

  // Carts Router

  describe("Testing de carts router", () => {
    beforeEach(async () => {
      await mongoose.connection.collection("carts").deleteMany({});
      this.timeout(100000);
    });
    after(async () => {
      mongoose.connection.close();
    });
    it("Add Cart debe crear un carrito", async () => {
      const res = await requester.post("/api/carts");
      expect(res.statusCode).to.equal(201);
    });
    it("Add Product to Cart debe agregar un producto al carrito", async () => {
      const res = await requester
        .post("/api/carts/:cid/product/:pid/:quantity")
        .send(mockProduct);
      expect(res).to.have.status(201);
    });
    it("Get Cart debe devolver un carrito", async () => {
      const res = await requester.get("/api/carts/:cid").send(mockCart.id);
      expect(res).to.be.an("object");
      expect(res.body).to.include.all.keys("id", "products");
    });
    it("Update Cart debe modificar un carrito", async () => {
      const res = await requester.put("/api/carts/:cid").send(mockCart);
      expect(res).to.be.an("object");
      expect(res).to.have.status(200);
    });
    it("Update Product Quantity debe modificar la cantidad de producto de un carrito", async () => {
      const res = await requester.patch("/api/carts/:cid/product/:pid");
      expect(res).to.have.status(200);
    });
    it("Delete All Products debe vaciar el carrito", async () => {
      const res = await requester.delete("/api/carts/:cid");
      expect(res).to.have.status(200);
      expect(res.body.products).to.be.an("array").that.is.empty;
    });
    it("Delete One Product debe eliminar un producto", async () => {
      const res = await requester.delete("/api/carts/:cid/product/:pid");
      expect(res).to.have.status(200);
    });
  });

  // PassportLocal Router (Sessions)

  describe("Testing de passport local router (session)", () => {
    beforeEach(async () => {
      await mongoose.connection.collection("sessions").deleteMany({});
      this.timeout(100000);
    });
    after(async () => {
      mongoose.connection.close();
    });
    it("Sing Up debe registrar un usuario", async () => {
      const res = await requester
        .post("/api/passportLocal/singup")
        .send(mockUser);
      expect(res.body).to.include.all.keys(
        "firstName",
        "lastName",
        "age",
        "email",
        "password"
      );
    });
    it("Login debe iniciar sesión de un usuario", async () => {
      const res = await requester.post("/api/passportLocal/login").send({
        email: mockUser.email,
        password: mockUser.password,
      });
      expect(res).to.have.status(200);
    });
  });
});

// import mongoose from "mongoose";
// import chai from "chai";
// import supertest from "supertest";
// import mongoDB from "./db.js";

// const expect = chai.expect;

// const requester = supertest(mongoDB());

// const mockProduct = {
//   id: "63ec1b91af624e3dbf210573",
//   title: "productOne",
//   description: "This is the product one",
//   price: 10000,
//   thumbnail: "foto",
//   stock: 999999,
//   code: "ABC123knd7W3y",
//   category: "products",
//   status: true,
//   owner: "admin",
// };

// // Nuevo producto para el endpoint de add product
// const newProduct = {
//   id: "63ec1b91af632f3dbf210999",
//   title: "Nuevo Producto",
//   price: 120,
//   description: "Este producto es nuevo",
//   thumbnail: "foto nueva",
//   category: "novedoso",
//   stock: 1000,
//   code: "abc123nuevo",
//   status: true,
//   owner: "admin",
// };

// describe("Testing de products router", () => {
//   before(async () => {
//     await mongoDB();
//   });
//   beforeEach(async () => {
//     await mongoose.connection.collection("products").deleteMany({});
//     this.timeout(100000);
//   });
//   after(async () => {
//     mongoose.connection.close();
//   });
//   it("Get Products debe devolver un array", async () => {
//     const res = await requester.get("/api/products/");
//     expect(res).to.have.status(200);
//     expect(res.body).to.be.an("array");
//     expect(res.body).to.include.all.keys(
//       "id",
//       "title",
//       "price",
//       "description",
//       "thumbnail",
//       "category",
//       "stock",
//       "code",
//       "status",
//       "owner"
//     );
//   });
//   it("Get Products by ID debe devolver un producto", async () => {
//     const res = await requester.get("/api/products/:pid").send(mockProduct);
//     expect(res).to.have.status(200);
//     expect(res.body).to.be.an("object");
//     expect(res.body).to.include.all.keys(
//       "id",
//       "title",
//       "price",
//       "description",
//       "thumbnail",
//       "category",
//       "stock",
//       "code",
//       "status",
//       "owner"
//     );
//     expect(res.body.id).to.equal(mockProduct.id);
//   });
//   it("Add Products debe crear un producto ", async () => {
//     const res = await requester.post("/api/products/:pid").send(newProduct);
//     expect(res).to.have.status(201);
//   });
//   it("Update Products debe modificar un producto", async () => {
//     const updatedProduct = { price: 250 }; // Actualiza el precio
//     const res = await requester.put("/api/products/:pid").send(updatedProduct);
//     expect(res).to.have.status(200);
//     expect(res.body).to.be.an("object");
//     expect(res.body).to.include.all.keys(
//       "id",
//       "title",
//       "price",
//       "description",
//       "thumbnail",
//       "category",
//       "stock",
//       "code",
//       "status",
//       "owner"
//     );
//     expect(res.body.id).to.equal(mockProduct.id);
//   });
// });
