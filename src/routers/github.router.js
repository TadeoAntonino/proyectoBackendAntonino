import { Router } from "express";
import passport from "../utils/passport.util.js";

const router = Router();

router.get(
  "/login",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/callback",
  passport.authenticate("github", { failureRedirect: "/api/github/fail" })
);

router.get("/fail", (req, res) => {
  res.send("Fail");
});

export default router;
