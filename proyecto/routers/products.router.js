import { Router } from "express";
import fs from 'fs';
import ProductManager from "../productManager";

const products = fs.readFileSync("../productos.json", "utf-8");

const router = Router();

router.get("/", (req, res) => {
  res.json(products);
});

router.get("/:pid", (req, res) => {
    prodId = getProductById();
    res.json(prodId);
});

router.post("/", (req, res) => {
  products.push(req.body);
  res.status(201).json(products);
});

router.put("/", (req, res) => {

});

router.delete("/", (req, res) => {

});

export default router;