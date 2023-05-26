import CartsService from "../services/carts.service.js";
import { STATUS } from "../constants/constants.js";

/* Instancia */

export default class CartsController {
  static #instance;
  constructor() {
    this.cartsService = new CartsService();
  }
  getCart = async (req, res) => {
    try {
      const response = await this.cartsService.getCart();
      res.status(200).json({
        carts: response,
        status: STATUS.SUCCESS,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getCartById = async (req, res) => {
    try {
      const { cid } = req.params;
      const response = await this.cartsService.getCartById(cid);
      res.status(200).json({
        products: response,
        status: STATUS.SUCCESS,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: STATUS.FAIL,
      });
    }
  };

  addCart = async (req, res) => {
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
  };

  updateCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const { products } = req.body;
      const response = await this.cartsService.updateCart(cid, products);
      res.status(201).json({
        cart: response,
        status: STATUS.SUCCESS,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: STATUS.FAIL,
      });
    }
  };

  updateProductQ = async (req, res) => {
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
      res.status(400).json({
        error: error.message,
        status: STATUS.FAIL,
      });
    }
  };

  deleteAllProducts = async (req, res) => {
    try {
      const { cid } = req.params;
      await this.cartsService.deleteAllProducts(cid);
      res.status(201).json({
        cart: "Se eliminaron todos los productos",
        status: STATUS.SUCCESS,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: STATUS.FAIL,
      });
    }
  };

  deleteOneProduct = async (req, res) => {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      await this.cartsService.deleteOneProduct(cid, pid);
      res.status(201).json({
        cart: "Se eliminó el producto",
        status: STATUS.SUCCESS,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: STATUS.FAIL,
      });
    }
  };

  addProductToCart = async (req, res) => {
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
      }
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  };

  static getInstance() {
    if (this.#instance) {
      return this.#instance;
    }

    this.#instance = new CartsController();
    return this.#instance;
  }
}
