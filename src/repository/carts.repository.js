import CartsDTO from "../DTOs/cartsDTO.js";

export class CartsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  async getCart() {
    const cart = await this.dao.getCart();
    const cartDTO = new CartsDTO(cart);
    return cartDTO;
  }
  async getCartById(cid) {
    const cart = await this.dao.getCartById(cid);
    const cartDTO = new CartsDTO(cart);
    return cartDTO;
  }
  async addCart(data) {
    const cart = await this.dao.addCart(data);
    const cartDTO = new CartsDTO(cart);
    return cartDTO;
  }
  async updateCart(cid, data) {
    const cart = await this.dao.updateCart(cid, data);
    const cartDTO = new CartsDTO(cart);
    return cartDTO;
  }
  async updateProductQ(cid, pid, quantity) {
    const cart = await this.dao.updateProductQ(cid, pid, quantity);
    const cartDTO = new CartsDTO(cart);
    return cartDTO;
  }
  async deleteAllProducts(cid) {
    const cart = await this.dao.deleteAllProducts(cid);
    const cartDTO = new CartsDTO(cart);
    return cartDTO;
  }
  async deleteOneProduct(cid, pid) {
    const cart = await this.dao.deleteOneProduct(cid, pid);
    const cartDTO = new CartsDTO(cart);
    return cartDTO;
  }
}
