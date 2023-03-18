import { Router } from "express";
import * as CartsController from "../controllers/carts.controller.js";
//import CartManager from "../dao/cartManager.js";

const router = Router();

router.post("/", CartsController.addCart);
router.post("/:cid/product/:pid/:quantity", CartsController.addProductToCart);
router.get("/:cid", CartsController.getCart);
router.put("/:cid/", CartsController.updateCart);
router.put("/:cid/product/:pid", CartsController.updateProductQ);
router.delete("/:cid", CartsController.deleteAllProducts);
router.delete("/:cid/product/:pid", CartsController.deleteOneProduct);

// Con File System

//const carritoManager = new CartManager();

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
