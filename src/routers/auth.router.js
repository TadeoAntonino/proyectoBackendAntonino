import { Router } from "express";
import authController from "../controllers/auth.controller.js";

class AuthRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.post("/login", authController.login);
    this.expressRouter.get("/logout", authController.logout);
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default AuthRouter;
