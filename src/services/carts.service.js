import { CartsModel } from "../dao/models/carts.models.js";

export async function getCart() {
  try {
    const carts = await CartsModel.find({
      deletedAt: { $exists: false },
    }).populate("products");
    return carts;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCartById(cid) {
  try {
    const cart = await CartsModel.findById(cid).populate("products");
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addCart(data) {
  try {
    const cart = await CartsModel.create(data);
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateCart(cid, data) {
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
    throw new Error(error.message);
  }
}

export async function updateProductQ(cid, pid, quantity) {
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
    throw new Error(error.message);
  }
}

export async function deleteAllProducts(cid) {
  try {
    const updateCart = await CartsModel.findById(cid);
    updateCart.products = [];
    updateCart.save();
    return updateCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteOneProduct(cid, pid) {
  try {
    const updateCart = await CartsModel.findById(cid);
    let updateProducts = [];

    //Rellena el array de productos con todos aquellos productos cuyo id no coincide con el ingresado

    updateCart.products.forEach((object) => {
      if (object.product._id != pid) {
        updateProducts.push(object.product);
      }
    });
    updateCart.products = updateProducts;
    updateCart.save();
    return updateCart;
  } catch (error) {
    throw new Error(error.message);
  }
}
