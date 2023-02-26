import * as CartServices from "../services/carts.service.js";
import { STATUS } from "../constants/constants.js";

export async function getCart(req, res) {
  try {
    const response = await CartServices.getCart();
    res.json({
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

export async function getCartById(req, res) {
  try {
    const { cid } = req.params;
    const response = await CartServices.getCartById(cid);
    res.json({
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

export async function addCart(req, res) {
  try {
    const { body } = req;
    const response = await CartServices.addCart(body);
    res.status(201).json({
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

export async function updateCart(req, res) {
  try {
    const { cid } = req.params;
    const { body } = req;
    const response = await CartServices.updateCart(cid, body);
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

export async function updateProductQ(req, res) {
  try {
    const { cid, pid } = req.params;
    const { body } = req;
    const response = await CartServices.updateProductQ(cid, pid, body);
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

export async function deleteAllProducts(req, res) {
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

export async function deleteOneProduct(req, res) {
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

export async function addProductToCart(req, res) {
  try {
    const { cid, pid, quantity } = req.params;
    if (quantity <= 0) {
      res.status(400).json({
        success: false,
        message: "La cantidad debe ser un número positivo",
      });
    }
    const cart = await CartServices.addProductToCart(
      cid,
      pid,
      Number(quantity)
    );
    if (cart) {
      res.status(200).json({
        success: true,
        message: `Product ${pid} added to cart ${cart._id}`,
        data: cart,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `Product ${pid} not found.`,
      });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}
