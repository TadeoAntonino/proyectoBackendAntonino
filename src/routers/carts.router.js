import { Router } from "express";
import CartManager from "../cartManager.js";

const carritoManager = new CartManager();

const router = Router();

router.post("/", (req, res) => {
  const nuevoCarrito = carritoManager.createCart();
  res.json(nuevoCarrito);
});

router.get("/:cid", (req, res) => {
  const { cid } = req.params;
  let carrito = carritoManager.getCartProducts(cid);
  res.json(carrito);
});

router.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  let addProduct = carritoManager.addProductToCart(cid, pid);
  res.json(addProduct);
});

export default router;
