import { Router } from "express";
import * as UserController from "../controllers/users.controller.js";
import auth from "../middlewares/auth.middleware.js";

class UserRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.post("/", UserController.createUser);
    this.expressRouter.get("/:email", auth, UserController.getUser);
    this.expressRouter.put(
      "/updateUser/:email",
      auth,
      UserController.updateUser
    );
    this.expressRouter.put(
      "/updatePassword/:email",
      auth,
      UserController.updatePassword
    );
    this.expressRouter.get("/current", auth, UserController.getUser); //No entendí bien si es así lo que pide la /current , lo entendí como que te traiga el usuario
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default new UserRouter();
