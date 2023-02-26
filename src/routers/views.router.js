import { Router } from "express";
import * as ProductService from "../services/products.service.js";
//import ProductService from "../dao/productManager.js";

const viewsRouter = Router();

viewsRouter.get("/products", async (req, res) => {
  try {
    const { page = 1, limit = 5, sort = "asc", category } = req.query;
    console.log(sort, "el sort");
    const productsList = await ProductService.getProducts(
      Number(page),
      Number(limit),
      sort,
      category
    );
    console.log(productsList);
    res.status(200).render("index", productsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

viewsRouter.get("/realtimeproducts", (req, res) => {
  try {
    const productsList = ProductService.getProducts();
    res.status(200).render("realTime", { products: productsList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

viewsRouter.get("/chat", (req, res) => {
  try {
    res.render("chat");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default viewsRouter;
