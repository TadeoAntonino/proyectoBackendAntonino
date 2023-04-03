import { Router } from "express";
import * as messagesController from "../controllers/messages.controllers.js";

class MessagesRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.get("/", messagesController.getMessages);
    this.expressRouter.put("/", messagesController.addMessages);
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default new MessagesRouter();
