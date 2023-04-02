import { Router } from "express";
import * as AuthController from "../controllers/auth.controller.js";

class AuthRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.post("/login", AuthController.login);
    this.expressRouter.get("/logout", AuthController.logout);
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default new AuthRouter();
