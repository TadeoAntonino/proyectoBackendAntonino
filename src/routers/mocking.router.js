import { Router } from "express";
import renderMockProducts from "../mocking/genProducts.js";

class MockingRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.get("/mockingproducts", renderMockProducts);
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default new MockingRouter();
