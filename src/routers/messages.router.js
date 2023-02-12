import { Router } from "express";
import * as MessagesController from "../controllers/messages.controllers.js";

const route = Router();

route.get('/', MessagesController.getMessages);
route.put('/', MessagesController.addMessages);