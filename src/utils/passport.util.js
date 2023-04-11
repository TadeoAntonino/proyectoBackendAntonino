import passport from "passport";
import { Strategy } from "passport-local";
import passportGithub from "passport-github2";
import { UserModel } from "../dao/models/users.models.js";
import UserService from "../services/users.service.js";
import AuthService from "../services/auth.service.js";
import dotenv from "dotenv";

dotenv.config();

/* Instancias */

const authServiceInstance = new AuthService();
const authService = authServiceInstance;

const userServiceInstance = new UserService();
const userService = userServiceInstance;

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser(async (_id, done) => {
//   const user = await UserService.getUserById(_id);
//   if (!user) {
//     return done(null, false);
//   }
// });

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  "signup",
  new Strategy(
    { passReqToCallback: true, usernameField: "email" },
    async function (req, username, password, done) {
      try {
        const userExists = await UserModel.findOne({ email: username });
        if (userExists) {
          return done("El usuario ya existe", false);
        } else {
          const user = await userService.createUser(req.body);
          return done(null, user);
        }
      } catch (error) {
        console.error(error);
        throw new Error(error.message);
      }
    }
  )
);

// passport.use(
//   "login",
//   new passportLocal.Strategy(
//     { passReqToCallback: true, usernameField: "email" },
//     async function (req, username, password, done) {
//       try {
//         const login = await AuthService.login(username, password);
//         if (login) {
//           const user = await UserModel.findOne({ email: username });
//           delete user.password;
//           return done(null, user);
//         } else {
//           return done(null, false);
//         }
//       } catch (error) {
//         console.error(error);
//         throw new Error(error.message);
//       }
//     }
//   )
// );

passport.use(
  "login",
  new Strategy(
    { passReqToCallback: true, usernameField: "email" },
    async function (req, username, password, done) {
      try {
        const login = await authService.login(username, password);
        if (login) {
          const user = await UserModel.findOne({ email: username });
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
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
