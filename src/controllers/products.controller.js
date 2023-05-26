import ProductService from "../services/products.service.js";

/* Instancia */

const productServiceInstance = new ProductService();
const productService = productServiceInstance;

class ProductsController {
  static #instance;

  async getProducts(req, res) {
    try {
      const { page = 1, limit = 5, sort = "asc", category } = req.query;

      const response = await productService.getProducts(
        Number(page),
        Number(limit),
        sort,
        category
      );
      res.json({
        products: response,
        status: "SUCCESS",
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: "FAIL",
      });
    }
  }

  async getProductById(req, res) {
    try {
      const response = await productService.getProductById();
      res.json({
        product: response,
        status: "SUCCESS",
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: "FAIL",
      });
    }
  }

  async addProduct(req, res) {
    try {
      const response = await productService.addProduct();
      res.json({
        product: response,
        status: "SUCCESS",
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: "FAIL",
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const response = await productService.deleteProduct();
      res.json({
        product: response,
        status: "SUCCESS",
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: "FAIL",
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const response = await productService.updateProduct();
      res.json({
        product: response,
        status: "SUCCESS",
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: "FAIL",
      });
    }
  }

  static getInstance() {
    if (this.#instance) {
      return this.#instance;
    }

    this.#instance = new ProductsController();
    return this.#instance;
  }
}

export default ProductsController.getInstance();
