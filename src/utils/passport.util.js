import passport from "passport";
import passportLocal from "passport-local";
import passportGithub from "passport-github2";
import { UserModel } from "../dao/models/users.models.js";
import * as UserService from "../services/users.service.js";
import * as AuthService from "../services/auth.service.js";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  const user = await UserService.getUserById(_id);
  if (!user) {
    return done(null, false);
  }
});

passport.use(
  "signup",
  new passportLocal.Strategy(
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
        console.error(error);
        throw new Error(error.message);
      }
    }
  )
);

passport.use(
  "login",
  new passportLocal.Strategy(
    { passReqToCallback: true, usernameField: "email" },
    async function (req, username, password, done) {
      try {
        const login = await AuthService.login(username, password);
        if (login) {
          const user = await UserModel.findOne({ email: username });
          delete user.password;
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        console.error(error);
        throw new Error(error.message);
      }
    }
  )
);

passport.use(
  "github",
  new passportGithub.Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        done(null, true);
      } catch (error) {
        console.error(error);
        throw new Error(error.message);
      }
    }
  )
);

export default passport;
