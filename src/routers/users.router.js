import { Router } from "express";
import userController from "../controllers/users.controller.js";
import auth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

class UserRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.get("/getUsers", userController.getUsers);
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
    this.expressRouter.get("/premium/:uid", auth, userController.changeRole); // Mover la ruta suelta /api/users/premium/:uid a un router específico para usuarios en /api/users/
    this.expressRouter.post(
      "/:uid/documents",
      upload,
      userController.uploadDocs
    );
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default UserRouter;
