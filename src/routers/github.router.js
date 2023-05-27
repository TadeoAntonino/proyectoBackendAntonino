import { Router } from "express";
import passport from "../utils/passport.util.js";

class GithubRouter {
  constructor() {
    this.expressRouter = Router();
    this.expressRouter.get(
      "/login",
      passport.authenticate("github", { scope: ["user:email"] })
    );

    this.expressRouter.get(
      "/callback",
      passport.authenticate("github", { failureRedirect: "/api/github/fail" })
    );

    this.expressRouter.get("/fail", (req, res) => {
      res.send("Fail 😀 (funciona)");
    });
  }

  getRouter() {
    return this.expressRouter;
  }
}

export default GithubRouter;
