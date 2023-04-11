import { Router } from "express";
import productsController from "../controllers/products.controller.js";
//import ProductManager from "../dao/productManager.js";

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
