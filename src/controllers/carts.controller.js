import * as CartServices from "../services/carts.service.js";
import { STATUS } from "../constants/constants.js";

export async function getCart(req, res) {
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

export async function getCartById(req, res) {
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

export async function addCart(req, res) {
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

export async function updateCart(req, res) {
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

//Actualizar la cantidad (Quantity) de producto

export async function updateProductQ(req, res) {
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
      cart: "Se elimin?? el producto",
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
        message: `Error: el carrito no existe o la cantidad no es v??lida`,
      });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}
