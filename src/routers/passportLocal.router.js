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
    failureMessage: true,
  }),
  function (req, res) {
    req.session.logged = true;
    req.session.user = req.user;
    res.status(200).redirect("/products");
  }
);

export default router;
