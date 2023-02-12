import * as CartServices from "../services/carts.services.js";
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
