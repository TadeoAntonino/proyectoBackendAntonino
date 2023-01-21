import { Router } from "express";
import ProductManager from "../productManager.js";

const productoManager = new ProductManager();

const router = Router();

router.get("/", (req, res) => {
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
});

export default router;
