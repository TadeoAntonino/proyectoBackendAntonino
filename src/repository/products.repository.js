import ProductsDTO from "../DTOs/productsDTO.js";

export class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  async getProducts(page, limit, sort, category) {
    const product = await this.dao.getProducts(page, limit, sort, category);
    const productDTO = new ProductsDTO(product);
    return productDTO;
  }
  async getProductById(pid) {
    const product = await this.dao.getProductById(pid);
    const productDTO = new ProductsDTO(product);
    return productDTO;
  }
  async addProduct(data) {
    const product = await this.dao.addProduct(data);
    const productDTO = new ProductsDTO(product);
    return productDTO;
  }
  async updateProduct(pid) {
    const product = await this.dao.updateProduct(pid);
    const productDTO = new ProductsDTO(product);
    return productDTO;
  }
  async deleteProduct(pid) {
    const product = await this.dao.deleteProduct(pid);
    const productDTO = new ProductsDTO(product);
    return productDTO;
  }
}
