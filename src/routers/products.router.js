import { Router } from "express";
import * as ProductController from "../controllers/products.controller.js";
//import ProductManager from "../dao/productManager.js";

class ProductsRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.get("/", ProductController.getProducts);
    this.expressRouter.get("/:pid", ProductController.getProductById);
    this.expressRouter.post("/", ProductController.addProduct);
    this.expressRouter.put("/:pid", ProductController.updateProduct);
    this.expressRouter.delete("/:pid", ProductController.deleteProduct);
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default new ProductsRouter();

//const productoManager = new ProductManager();

// Con File System

/*router.get("/", (req, res) => {
  res.json(productoManager.getProducts());
});

router.get("/:pid", (req, res) => {
  const { pid } = req.params;
  const prodId = productoManager.getProductById(pid);
  res.json(prodId);
});

router.post("/", (req, res) => {
  const { body } = req;
  const product = productoManager.addProduct(body);
  res.status(201).json(product);
});

router.put("/:pid", (req, res) => {
  const { body } = req;
  const { pid } = req.params;
  const product = productoManager.updateProduct(pid, body);
  res.status(201).json(product);
});

router.delete("/", (req, res) => {
  productoManager.deleteProduct();
}); */
