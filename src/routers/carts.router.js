import { Router } from "express";
import * as CartsController from "../controllers/carts.controllers.js";
//import CartManager from "../dao/cartManager.js";

const router = Router();

router.get("/", CartsController.getCart);

router.get("/:cid", CartsController.getCartById);

router.post("/", CartsController.addCart);

router.put("/:cid", CartsController.updateCart);

router.put("/:cid/products/:pid", CartsController.updateProductQ);

router.delete("/:cid", CartsController.deleteAllProducts);

router.delete("/:cid/products/:pid", CartsController.deleteOneProduct);

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
