import { Router } from "express";
import * as MessagesController from "../controllers/messages.controllers.js";

class MessagesRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.get("/", MessagesController.getMessages);
    this.expressRouter.put("/", MessagesController.addMessages);
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default new MessagesRouter();
