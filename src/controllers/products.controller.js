import ProductService from "../services/products.service.js";
import CustomError from "../utils/customError.js";
//import factory from "../services/factory.js";

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
      throw new CustomError(
        "not found",
        "no se encontraron los productos",
        "los productos no se han encontrado",
        3
      );

      // res.status(400).json({
      //   error: error.message,
      //   status: "FAIL",
      // });
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
      throw new CustomError(
        "not found",
        "no se encontró el producto",
        "el producto no se ha encontrado",
        3
      );
      // res.status(400).json({
      //   error: error.message,
      //   status: "FAIL",
      // });
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
      throw new CustomError(
        "incomplete data",
        "no se proporcionó toda la información",
        "se debe agregar toda la información necesaria",
        4
      );
      // res.status(400).json({
      //   error: error.message,
      //   status: "FAIL",
      // });
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
      throw new CustomError(
        "not found",
        "no se encuentra el producto",
        "no se encuentra el producto que se requiere eliminar",
        5
      );
      // res.status(400).json({
      //   error: error.message,
      //   status: "FAIL",
      // });
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
      throw new CustomError(
        "invalid data",
        "no se ha proporcionado la información correcta",
        "se requiere la información correspondiente",
        7
      );
      // res.status(400).json({
      //   error: error.message,
      //   status: "FAIL",
      // });
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
