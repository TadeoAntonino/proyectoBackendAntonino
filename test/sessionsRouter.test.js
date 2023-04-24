import mongoose from "mongoose";
import chai from "chai";
import supertest from "supertest";
import mongoDB from "./db.js";

const expect = chai.expect;

const requester = supertest(mongoDB());

const mockUser = {
  firstName: "Ignacio",
  lastName: "Fernandez",
  age: 31,
  email: "nachofernandez@gmail.com",
  password: "carp912nachito",
};

describe("Testing de passport local router (session)", () => {
  before(async () => {
    await mongoDB();
  });
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
