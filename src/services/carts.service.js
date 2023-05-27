import CartsModel from "../dao/models/carts.models.js";

export default class CartsService {
  async getCarts() {
    try {
      const carts = await CartsModel.find({
        deletedAt: { $exists: false },
      }).populate("products");
      return carts;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCartById(cid) {
    try {
      const cart = await CartsModel.findById(cid).populate("products");
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProductToCart(cid, pid, quantity) {
    return true;
  }

  async addCart(data) {
    try {
      const cart = await CartsModel.create(data);
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  updateCart = async (cid, data) => {
    try {
      const carrito = await CartsModel.findById(cid);

      if (!carrito) {
        throw new Error("Carrito no encontrado");
      }

      data.forEach((producto) => {
        const { id, cantidad } = producto;

        const productoEnCarrito = carrito.productos.find((p) => p.id === id);

        if (productoEnCarrito) {
          productoEnCarrito.cantidad = cantidad;
        } else {
          carrito.productos.push({ id, cantidad });
        }
      });

      await carrito.save();

      return carrito;
    } catch (error) {
      throw new Error("No se pudo actualizar el carrito de compras");
    }
  };

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
      throw new Error(error.message);
    }
  }

  async deleteAllProducts(cid) {
    try {
      const updateCart = await CartsModel.findById(cid);
      updateCart.products = [];
      updateCart.save();
      return updateCart;
    } catch (error) {
      throw new Error(error.message);
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
      throw new Error(error.message);
    }
  }
}
