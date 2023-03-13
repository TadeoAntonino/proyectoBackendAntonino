import { Router } from "express";
import * as ProductController from "../controllers/products.controller.js";
//import ProductManager from "../dao/productManager.js";

const router = Router();

router.get("/", ProductController.getProducts);
router.get("/:pid", ProductController.getProductById);
router.post("/", ProductController.addProduct);
router.put("/:pid", ProductController.updateProduct);
router.delete("/:pid", ProductController.deleteProduct);

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

export default router;
