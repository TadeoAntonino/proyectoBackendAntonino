import { Router } from "express";
//import CartManager from "../dao/cartManager.js";
import * as CartsController from "../controllers/carts.controllers.js";

//const carritoManager = new CartManager();

const router = Router();

// con controllers

router.post("/", CartsController.createCart);
router.get("/:cid", CartsController.getCartProducts);
router.post("/:cid/product/:pid", CartsController.addProductToCart);


// Con File System

/*router.post("/", (req, res) => {
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
}); */

export default router;
