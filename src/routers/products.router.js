import { Router } from "express";
import ProductManager from "../productManager";



const router = Router();

router.get("/", (req, res) => {
  res.json(ProductManager.getProducts());
});

router.get("/:pid", (req, res) => {
    prodId = ProductManager.getProductById();
    res.json(prodId);
});

router.post("/", (req, res) => {
  const { body } = req;
  ProductManager.addProduct(body);
  res.status(201).send("Producto agregado");
});

router.put("/", (req, res) => {

  ProductManager.updateProduct(body);
});

router.delete("/", (req, res) => {
  ProductManager.deleteProduct();
});

export default router;