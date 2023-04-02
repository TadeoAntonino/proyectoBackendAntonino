import { ProductsModel } from "../dao/models/products.models.js";

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
      throw new Error(error.message);
    }
  }

  async getProductById(pid) {
    try {
      const product = await ProductsModel.findById(pid);
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProduct(data) {
    try {
      const newProduct = await ProductsModel.create(data);
      return newProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(pid, data) {
    try {
      const productUpdated = await ProductsModel.findByIdAndUpdate(pid, data, {
        new: true,
      });
      return productUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduct(pid) {
    try {
      await ProductsModel.findByIdAndDelete(pid);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new ProductService();
