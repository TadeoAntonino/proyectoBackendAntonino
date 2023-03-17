import { Router } from "express";
import passport from "../utils/passport.util.js";

const router = Router();

router.get("/fail", (req, res) => {
  res.send("Fail");
});

router.post(
  "/signup",
  passport.authenticate("signup", {
    failureRedirect: "/fail",
    failureFlash: true,
    keepSessionInfo: true,
  }),
  (req, res) => {
    try {
      res.redirect("/products");
    } catch (error) {
      console.log(error);
    }
  }
);

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/fail",
  }),
  (req, res) => {
    req.session.logged = true;
    req.session.user = req.user;
    res.send("Usuario registrado con passport Local 😁");
  }
);

export default router;
