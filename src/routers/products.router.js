import { Router } from "express";
import productsController from "../controllers/products.controller.js";

class ProductsRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.get("/", productsController.getProducts);
    this.expressRouter.get("/:pid", productsController.getProductById);
    this.expressRouter.post("/", productsController.addProduct);
    this.expressRouter.put("/:pid", productsController.updateProduct);
    this.expressRouter.delete("/:pid", productsController.deleteProduct);
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default ProductsRouter;
