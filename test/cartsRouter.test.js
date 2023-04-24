import mongoose from "mongoose";
import supertest from "supertest";
import chai from "chai";
import mongoDB from "./db.js";

const expect = chai.expect;

const requester = supertest(mongoDB());

const mockCart = {
  id: 101101,
  products: [
    { product: "63ec1c2f2d9092879a262b73", quantity: 9 },
    { product: "63ec1c5611561404e23ef5b8", quantity: 12 },
    { product: "63ec1cac476f258e4e351b9a", quantity: 18 },
  ],
};

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

describe("Testing de carts router", () => {
  before(async () => {
    await mongoDB();
  });
  beforeEach(async () => {
    await mongoose.connection.collection("carts").deleteMany({});
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
