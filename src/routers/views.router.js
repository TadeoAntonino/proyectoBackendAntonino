import { Router } from "express";
import ProductManager from "../productManager.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
  try {
    const productsList = ProductManager.getProducts();
    res.status(200).render("index", { products: productsList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

viewsRouter.get("/realtimeproducts", (req, res) => {
  try {
    const productsList = ProductManager.getProducts();
    res.status(200).render("realTime", { products: productsList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default viewsRouter;
