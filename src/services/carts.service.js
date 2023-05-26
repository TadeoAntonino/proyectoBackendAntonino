import { CartsModel } from "../dao/models/carts.models.js";
import CustomError from "../utils/customError.js";

export default class CartsService {
  async getCart() {
    try {
      const carts = await CartsModel.find({
        deletedAt: { $exists: false },
      }).populate("products");
      return carts;
    } catch (error) {
      throw new CustomError(
        "not found",
        "no se encontraron los carritos",
        "los carritos no se han encontrado",
        3
      );
      // throw new Error(error.message);
    }
  }

  async getCartById(cid) {
    try {
      const cart = await CartsModel.findById(cid).populate("products");
      return cart;
    } catch (error) {
      throw new CustomError(
        "not found",
        "no se encontró el carrito",
        "el carrito no se ha encontrado",
        3
      );
      // throw new Error(error.message);
    }
  }

  async addCart(data) {
    try {
      const cart = await CartsModel.create(data);
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCart(cid, data) {
    try {
      const updateCart = await CartsModel.findById(cid);
      let productToPush = {
        product: data.product,
        quantity: data.quantity,
      };
      updateCart.products.push(productToPush);
      updateCart.save();
      return updateCart;
    } catch (error) {
      throw new CustomError(
        "not found",
        "no se encontró el carrito",
        "el carrito a actualizar no fue encontrado",
        3
      );
      // throw new Error(error.message);
    }
  }

  async updateProductQ(cid, pid, quantity) {
    try {
      const { quantity } = req.body;
      const updateCart = await CartsModel.findById(cid);
      updateCart.products.forEach((object) => {
        if (object.product._id == pid) {
          let updateObjet = object;
          updateObjet.quantity = quantity;
          object = updateObjet;
          updateCart.save();
          return updateCart;
        }
      });
      return updateCart;
    } catch (error) {
      throw new CustomError(
        "invalid data",
        "no se proporciono una cantidad adecuada",
        "la cantidad debe ser un entero positivo",
        6
      );
      // throw new Error(error.message);
    }
  }

  async deleteAllProducts(cid) {
    try {
      const updateCart = await CartsModel.findById(cid);
      updateCart.products = [];
      updateCart.save();
      return updateCart;
    } catch (error) {
      throw new CustomError(
        "not found",
        "no se encontraron los productos",
        "los productos no se han encontrado",
        5
      );
      // throw new Error(error.message);
    }
  }

  async deleteOneProduct(cid, pid) {
    try {
      const updateCart = await CartsModel.findById(cid);
      let updateProducts = [];
      updateCart.products.forEach((object) => {
        if (object.product._id != pid) {
          updateProducts.push(object.product);
        }
      });
      updateCart.products = updateProducts;
      updateCart.save();
      return updateCart;
    } catch (error) {
      throw new CustomError(
        "not found",
        "no se encontró el producto",
        "el producto que se desea eliminar no se ha encontrado",
        5
      );
      // throw new Error(error.message);
    }
  }
}
