import { Router } from "express";
import * as productController from "../controllers/products.controller.js";
//import ProductManager from "../dao/productManager.js";

class ProductsRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.get("/", productController.getProducts);
    this.expressRouter.get("/:pid", productController.getProductById);
    this.expressRouter.post("/", productController.addProduct);
    this.expressRouter.put("/:pid", productController.updateProduct);
    this.expressRouter.delete("/:pid", productController.deleteProduct);
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
