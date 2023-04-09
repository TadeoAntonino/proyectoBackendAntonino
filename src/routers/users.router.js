import { Router } from "express";
import userController from "../controllers/users.controller.js";
import auth from "../middlewares/auth.middleware.js";

class UserRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.post("/", userController.createUser);
    this.expressRouter.get("/:email", auth, userController.getUser);
    this.expressRouter.put(
      "/updateUser/:email",
      auth,
      userController.updateUser
    );
    this.expressRouter.put(
      "/updatePassword/:email",
      auth,
      userController.updatePassword
    );
    this.expressRouter.get("/current", auth, userController.getUser); //No entendí bien si es así lo que pide la /current , lo entendí como que te traiga el usuario
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default new UserRouter();
