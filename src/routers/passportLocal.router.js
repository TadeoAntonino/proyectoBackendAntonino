import { Router } from "express";
import passport from "../utils/passport.util.js";

class PassportLocalRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.get("/fail", (req, res) => {
      res.send("Fail");
    });

    this.expressRouter.post(
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

    this.expressRouter.post(
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
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default new PassportLocalRouter();
