import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";

const cartController = cartsController.getInstance();

class CartRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.post("/", cartController.addCart);
    this.expressRouter.post(
      "/:cid/product/:pid/:quantity",
      cartController.addProductToCart
    );
    this.expressRouter.get("/:cid", cartController.getCart);
    this.expressRouter.put("/:cid/", cartController.updateCart);
    this.expressRouter.patch(
      "/:cid/product/:pid",
      cartController.updateProductQ
    );
    this.expressRouter.delete("/:cid", cartController.deleteAllProducts);
    this.expressRouter.delete(
      "/:cid/product/:pid",
      cartController.deleteOneProduct
    );
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default CartRouter;
