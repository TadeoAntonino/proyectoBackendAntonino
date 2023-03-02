import passport from "passport";
import { Strategy } from "passport-local";
import { UserModel } from "../dao/models/users.models.js";
import * as UserService from "../services/users.service.js";

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
  UserModel.findById(_id),
    function (err, user) {
      done(err, user);
    };
});

passport.use(
  "singup",
  new Strategy(
    { passReqToCallback: true, usernameField: "email" },
    async function (req, username, password, done) {
      try {
        const userExists = await UserModel.findOne({ email: username });
        if (userExists) {
          return done("El usuario ya existe", false);
        } else {
          const user = await UserService.createUser(req.body);
          return done(null, user);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    }
  )
);

export default passport;
