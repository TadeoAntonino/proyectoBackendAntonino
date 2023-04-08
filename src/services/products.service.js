import { ProductsModel } from "../dao/models/products.models.js";
import CustomError from "../utils/customError.js";

class ProductService {
  async getProducts(page, limit, sort, category) {
    try {
      const products = await ProductsModel.paginate(
        category ? { category: category } : {},
        { page, limit, sort: { price: sort }, lean: true }
      );
      console.log(products);
      return products;
    } catch (error) {
      throw new CustomError(
        "not found",
        "no se encontraron los productos",
        "los productos no se han encontrado",
        3
      );
      // throw new Error(error.message);
    }
  }

  async getProductById(pid) {
    try {
      const product = await ProductsModel.findById(pid);
      return product;
    } catch (error) {
      throw new CustomError(
        "not found",
        "no se encontró el producto",
        "el producto no se ha encontrado",
        3
      );
      // throw new Error(error.message);
    }
  }

  async addProduct(data) {
    try {
      const newProduct = await ProductsModel.create(data);
      return newProduct;
    } catch (error) {
      throw new CustomError(
        "incomplete data",
        "no se proporcionó toda la información",
        "se debe agregar toda la información necesaria",
        4
      );
      // throw new Error(error.message);
    }
  }

  async updateProduct(pid, data) {
    try {
      const productUpdated = await ProductsModel.findByIdAndUpdate(pid, data, {
        new: true,
      });
      return productUpdated;
    } catch (error) {
      throw new CustomError(
        "invalid data",
        "no se ha proporcionado la información correcta",
        "se requiere la información correspondiente",
        7
      );
      // throw new Error(error.message);
    }
  }

  async deleteProduct(pid) {
    try {
      await ProductsModel.findByIdAndDelete(pid);
    } catch (error) {
      throw new CustomError(
        "not found",
        "no se encuentra el producto",
        "no se encuentra el producto que se requiere eliminar",
        5
      );
      // throw new Error(error.message);
    }
  }
}

export default new ProductService();
