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

// Nuevo producto para el endpoint de add product
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

describe("Testing de products router", () => {
  before(async () => {
    await mongoDB();
  });
  beforeEach(async () => {
    await mongoose.connection.collection("products").deleteMany({});
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
    const res = await requester.put("/api/products/:pid").send(updatedProduct);
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
