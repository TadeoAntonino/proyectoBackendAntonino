import express from "express";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routers/views.router.js";
import { Server } from "socket.io";
import dotenv from "dotenv";
import "./config/db.js";
//import * as ProductService from "./services/products.service.js"; para cargar productos a db

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "src/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(err));

const io = new Server(server);

const messages = [];

io.on("connection", (socket) => {
  console.log(`Conectado desde el id: ${socket.id} 🚀🚀🚀`);
  socket.emit("Welcome", { welcome: "Bienvenido al chat" });

  socket.on("disconnect", (socket) => {
    console.log(`Desconectado 🚩🚩🚩`);
  });

  socket.on("message", (data) => {
    messages.push(data);
    io.emit("message", data);
  });

  socket.on("newUser", (data) => {
    socket.broadcast.emit("newUser", data);
  });
});

/*let producto = [
  {
    title: "title",
    description: "description",
    price: 8,
    thumbnail: "thumbnail",
    stock: 20,
    code: 2567852873,
    status: true,
    category: "categoria",
  },
  {
    title: "title",
    description: "description",
    price: 8,
    thumbnail: "thumbnail",
    stock: 20,
    code: 2560,
    status: true,
    category: "categoria",
  },
  {
    title: "title",
    description: "description",
    price: 8,
    thumbnail: "thumbnail",
    stock: 20,
    code: 2561,
    status: true,
    category: "categoria",
  },
  {
    title: "title",
    description: "description",
    price: 8,
    thumbnail: "thumbnail",
    stock: 20,
    code: 2562,
    status: true,
    category: "categoria",
  },
  {
    title: "title",
    description: "description",
    price: 8,
    thumbnail: "thumbnail",
    stock: 20,
    code: 2563,
    status: true,
    category: "categoria",
  },
  {
    title: "title",
    description: "description",
    price: 8,
    thumbnail: "thumbnail",
    stock: 20,
    code: 2564,
    status: true,
    category: "categoria",
  },
  {
    title: "title",
    description: "description",
    price: 8,
    thumbnail: "thumbnail",
    stock: 20,
    code: 2565,
    status: true,
    category: "categoria",
  },
  {
    title: "title",
    description: "description",
    price: 8,
    thumbnail: "thumbnail",
    stock: 20,
    code: 25666,
    status: true,
    category: "categoria",
  },
  {
    title: "title",
    description: "description",
    price: 8,
    thumbnail: "thumbnail",
    stock: 20,
    code: 256456,
    status: true,
    category: "categoria",
  },
  {
    title: "title",
    description: "description",
    price: 8,
    thumbnail: "thumbnail",
    stock: 20,
    code: 256678,
    status: true,
    category: "categoria",
  },
  {
    title: "title",
    description: "description",
    price: 8,
    thumbnail: "thumbnail",
    stock: 20,
    code: 256687,
    status: true,
    category: "categoria",
  },
  {
    title: "title",
    description: "description",
    price: 8,
    thumbnail: "thumbnail",
    stock: 20,
    code: 2562387,
    status: true,
    category: "categoria",
  },
];

producto.forEach(product => {ProductService.addProduct(product)});*/
