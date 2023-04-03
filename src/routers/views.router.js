import { Router } from "express";
import * as viewsController from "../controllers/views.controller.js";

class ViewsRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.get("/products", viewsController.getProductsIndex);
    this.expressRouter.get(
      "/realtimeproducts",
      viewsController.getRealTimeProducts
    );
    this.expressRouter.get("/chat", viewsController.getChat);
    this.expressRouter.get("/carts/:cid", viewsController.getCartById);
    this.expressRouter.get("/", viewsController.login);
    this.expressRouter.get("/registrarse", viewsController.registrarUser);
    this.expressRouter.get("/profile", viewsController.getProfile);
    this.expressRouter.get("/admin", viewsController.getAdminField);
    this.expressRouter.get("/fail", viewsController.fail);
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default new ViewsRouter();
