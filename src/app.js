import express from "express";
import ProductsRouter from "./routers/products.router.js";
import CartsRouter from "./routers/carts.router.js";
import ViewsRouter from "./routers/views.router.js";
import UserRouter from "./routers/users.router.js";
import AuthRouter from "./routers/auth.router.js";
import GithubRouter from "./routers/github.router.js";
import MockingRouter from "./routers/mocking.router.js";
import PassportLocalRouter from "./routers/passportLocal.router.js";
import LoggerTest from "./routers/loggerTest.router.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import config from "./config/config.js";
import "./config/db.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "./utils/passport.util.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import logger from "./utils/logger.js";

const app = express();

/* Instancias */

const authRouterInstance = new AuthRouter();
const authRouter = authRouterInstance.getRouter();

const cartsRouterInstance = new CartsRouter();
const cartsRouter = cartsRouterInstance.getRouter();

const viewsRouterInstance = new ViewsRouter();
const viewsRouter = viewsRouterInstance.getRouter();

const productsRouterInstance = new ProductsRouter();
const productsRouter = productsRouterInstance.getRouter();

const userRouterInstance = new UserRouter();
const userRouter = userRouterInstance.getRouter();

const githubRouterInstance = new GithubRouter();
const githubRouter = githubRouterInstance.getRouter();

const mockingRouterInstance = new MockingRouter();
const mockingRouter = mockingRouterInstance.getRouter();

const passportLocalRouterInstance = new PassportLocalRouter();
const passportLocalRouter = passportLocalRouterInstance.getRouter();

const loggerTestInstance = new LoggerTest();
const loggerTest = loggerTestInstance.getRouter();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

app.use(cookieParser());
app.use(
  session({
    store: new MongoStore({
      mongoUrl: config.MONGO_URI,
      options: {
        userNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: config.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 100000000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);
app.use("/api/passportLocal", passportLocalRouter);
app.use("/api/github", githubRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/api/sessions", userRouter);
app.use("/api/mock", mockingRouter);
app.use("/api/loggerTesting", loggerTest);

app.use(function (err, req, res, next) {
  logger.error(err);
});

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "src/views");

app.use(errorHandler);

const server = app.listen(config.PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${config.PORT}`)
);
server.on("error", (err) => logger.error(err));

const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`Conectado desde el id: ${socket.id} 🚀🚀🚀`);
  socket.emit("Welcome", { welcome: "Bienvenido al chat 😄" });

  socket.on("disconnect", (socket) => {
    console.log(`Desconectado 🚩🚩🚩`);
  });

  const messages = [];

  socket.on("message", (data) => {
    messages.push(data);
    io.emit("message", data);
  });

  socket.on("newUser", (data) => {
    socket.broadcast.emit("newUser", data);
  });
});
