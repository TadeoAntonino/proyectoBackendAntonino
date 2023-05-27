import { Router } from "express";
import userController from "../controllers/users.controller.js";
import auth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

class UserRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.post("/", userController.createUser);
    this.expressRouter.post(
      "/:uid/documents",
      upload,
      userController.uploadDocs
    );
    this.expressRouter.get("/getUsers", userController.getUsers);
    this.expressRouter.get("/:email", auth, userController.getUser);
    this.expressRouter.get("/current", auth, userController.getUser);
    this.expressRouter.get("/premium/:uid", auth, userController.changeRole);
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
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default UserRouter;
