import { Router } from "express";
import * as UserController from "../controllers/users.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = new Router();

router.post("/", UserController.createUser);
router.get("/:email", auth, UserController.getUser);
router.put("/updateUser/:email", auth, UserController.updateUser);
router.put("/updatePassword/:email", auth, UserController.updatePassword);
router.get("/current", auth, UserController.getUser); //No entendí bien si es así lo que pide la /current , lo entendí como que te traiga el usuario

export default router;
