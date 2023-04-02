import * as CartServices from "../services/carts.service.js";
import { STATUS } from "../constants/constants.js";

class CartsController {
  async getCart(req, res) {
    try {
      const response = await CartServices.getCart();
      res.status(200).json({
        carts: response,
        status: STATUS.SUCCESS,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: STATUS.FAIL,
      });
    }
  }

  async getCartById(req, res) {
    try {
      const { cid } = req.params;
      const response = await CartServices.getCartById(cid);
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
  }

  async addCart(req, res) {
    try {
      const { body } = req;
      const response = await CartServices.addCart(body);
      res.status(201).json({
        newCart: response,
        status: STATUS.SUCCESS,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        status: STATUS.FAIL,
      });
    }
  }

  async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const { products } = req.body;
      const response = await CartServices.updateCart(cid, products);
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
  }

  async updateProductQ(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const response = await CartServices.updateProductQ(cid, pid, quantity);
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
  }

  async deleteAllProducts(req, res) {
    try {
      const { cid } = req.params;
      await CartServices.deleteAllProducts(cid);
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
  }

  async deleteOneProduct(req, res) {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      await CartServices.deleteOneProduct(cid, pid);
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
  }

  async addProductToCart(req, res) {
    try {
      const { cid, pid, quantity } = req.params;
      const cart = await CartServices.addProductToCart(
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
        res.status(404).json({
          status: STATUS.FAIL,
          message: `Error: el carrito no existe o la cantidad no es válida`,
        });
      }
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }
}

export default new CartsController();
