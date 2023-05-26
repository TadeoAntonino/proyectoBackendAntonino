import CartsService from "../services/carts.service.js";
import { STATUS } from "../constants/constants.js";

/* Instancia */

export default class CartsController {
  static #instance;
  constructor() {
    this.cartsService = new CartsService();
  }
  async getCart(req, res) {
    try {
      const response = await this.cartsService.getCart();
      res.status(200).json({
        carts: response,
        status: STATUS.SUCCESS,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCartById(req, res) {
    try {
      const { cid } = req.params;
      const response = await this.cartsService.getCartById(cid);
      res.status(200).json({
        products: response,
        status: STATUS.SUCCESS,
      });
    } catch (error) {
      throw new CustomError(
        "not found",
        "no se encontró el carrito",
        "el carrito no se ha encontrado",
        3
      );
      // res.status(400).json({
      //   error: error.message,
      //   status: STATUS.FAIL,
      // });
    }
  }

  async addCart(req, res) {
    try {
      const { body } = req;
      const response = await this.cartsService.addCart(body);
      res.status(201).json({
        newCart: response,
        status: STATUS.SUCCESS,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const { products } = req.body;
      const response = await this.cartsService.updateCart(cid, products);
      res.status(201).json({
        cart: response,
        status: STATUS.SUCCESS,
      });
    } catch (error) {
      throw new CustomError(
        "not found",
        "no se encontró el carrito",
        "el carrito a actualizar no fue encontrado",
        3
      );
      // res.status(400).json({
      //   error: error.message,
      //   status: STATUS.FAIL,
      // });
    }
  }

  async updateProductQ(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const response = await this.cartsService.updateProductQ(
        cid,
        pid,
        quantity
      );
      res.status(201).json({
        cart: response,
        status: STATUS.SUCCESS,
      });
    } catch (error) {
      throw new CustomError(
        "invalid data",
        "no se proporciono una cantidad adecuada",
        "la cantidad debe ser un entero positivo",
        6
      );
      // res.status(400).json({
      //   error: error.message,
      //   status: STATUS.FAIL,
      // });
    }
  }

  async deleteAllProducts(req, res) {
    try {
      const { cid } = req.params;
      await this.cartsService.deleteAllProducts(cid);
      res.status(201).json({
        cart: "Se eliminaron todos los productos",
        status: STATUS.SUCCESS,
      });
    } catch (error) {
      throw new CustomError(
        "not found",
        "no se encontraron los productos",
        "los productos no se han encontrado",
        5
      );
      // res.status(400).json({
      //   error: error.message,
      //   status: STATUS.FAIL,
      // });
    }
  }

  async deleteOneProduct(req, res) {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      await this.cartsService.deleteOneProduct(cid, pid);
      res.status(201).json({
        cart: "Se eliminó el producto",
        status: STATUS.SUCCESS,
      });
    } catch (error) {
      throw new CustomError(
        "not found",
        "no se encontró el producto",
        "el producto que se desea eliminar no se ha encontrado",
        5
      );
      // res.status(400).json({
      //   error: error.message,
      //   status: STATUS.FAIL,
      // });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { cid, pid, quantity } = req.params;
      const cart = await this.cartsService.addProductToCart(
        cid,
        pid,
        Number(quantity)
      );
      if (cart) {
        res.status(200).json({
          status: STATUS.SUCCESS,
          message: `Producto: ${pid} agregado al carrito: ${cart._id}`,
          cart: cart,
        });
      } else {
        throw new CustomError(
          "incomplete data",
          "no se proporcionó toda la información",
          "debe proporcionarse más información",
          6
        );
      }
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }

  static getInstance() {
    if (this.#instance) {
      return this.#instance;
    }

    this.#instance = new CartsController();
    return this.#instance;
  }
}
