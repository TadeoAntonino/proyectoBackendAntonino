import { Router } from "express";
import MessagesController from "../controllers/messages.controllers.js";

/* Instancias */

const messagesControllerInstance = new MessagesController();
const messagesController = messagesControllerInstance;

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

export default MessagesRouter;
