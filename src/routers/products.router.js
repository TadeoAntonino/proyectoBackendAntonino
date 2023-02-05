import { Router } from "express";
//import ProductManager from "../dao/productManager.js";
import * as ProductController from "../controllers/products.controllers.js";

//const productoManager = new ProductManager();

const router = Router();

// Con controllers

router.get("/", ProductController.getProducts);
router.get("/:pid", ProductController.getProductById);
router.post("/", ProductController.addProduct);
router.put("/:pid", ProductController.updateProduct);
router.delete("/", ProductController.deleteProduct);

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

export default router;
