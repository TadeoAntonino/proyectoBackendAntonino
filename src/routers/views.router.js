import { Router } from "express";
import * as ViewsController from "../controllers/views.controller.js";

const router = Router();

router.get("/products", ViewsController.getHome);
router.get("/realtimeproducts", ViewsController.getRealTimeProducts);
router.get("/chat", ViewsController.getChat);
router.get("/carts/:cid", ViewsController.getCartById);
router.get("/", ViewsController.login);
router.get("/registrarse", ViewsController.registrarUser);
router.get("/profile", ViewsController.getProfile);
router.get("/admin", ViewsController.getAdminField);
router.get("/fail", ViewsController.fail);

export default router;
