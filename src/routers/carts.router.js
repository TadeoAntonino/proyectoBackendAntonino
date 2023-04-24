import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
//import CartManager from "../dao/cartManager.js";

class CartRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.post("/", cartsController.addCart);
    this.expressRouter.post(
      "/:cid/product/:pid/:quantity",
      cartsController.addProductToCart
    );
    this.expressRouter.get("/:cid", cartsController.getCart);
    this.expressRouter.put("/:cid/", cartsController.updateCart);
    this.expressRouter.patch(
      "/:cid/product/:pid",
      cartsController.updateProductQ
    );
    this.expressRouter.delete("/:cid", cartsController.deleteAllProducts);
    this.expressRouter.delete(
      "/:cid/product/:pid",
      cartsController.deleteOneProduct
    );
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default CartRouter;

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
