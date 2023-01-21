import fs from "fs";

export default class CartManager {
  constructor() {
    this.carts = [];
    this.path = "./carrito.json";
    this.#getCartFile();
  }

  createCart() {
    const id = this.#getMaxId() + 1;
    this.carts.push({
      id: id,
      products: [],
    });
    this.#updateCartFile();
    return { mensaje: `el id del carrito es ${id}` };
  }

  getCartProducts(id) {
    console.log(this.carts);
    let idBuscado =
      this.carts.find((c) => {
        return c.id === parseInt(id);
      }) ?? {};
    if (Object.keys(idBuscado)?.length) {
      return idBuscado.products;
    } else {
      return { error: `No existe un carrito con el id ${id}` };
    }
  }

  addProductToCart(cid, pid) {
    let carrito = this.carts.find((c) => {
      return c.id === parseInt(cid);
    });
    if (!Object.keys(carrito)?.length) {
      return { error: `No existe un carrito con el id ${cid}` };
    }

    let carritoIndex = this.carts.findIndex((c) => c.id === parseInt(cid));
    let exists = false;

    for (let i = 0; i < carrito.products.length; i++) {
      if (carrito.products[i].product === parseInt(pid)) {
        carrito.products[i].quantity += 1;
        exists = true;
      }
    }
    if (!exists) {
      carrito.products.push({
        product: parseInt(pid),
        quantity: 1,
      });
    }
    this.carts[carritoIndex] = carrito;
    this.#updateCartFile();
    return {mensaje: `Producto con id ${pid} agregado correctamente en el carrito ${cid} `};
  }

  #getCartFile() {
    if (fs.existsSync("carrito.json")) {
      let file = fs.readFileSync("carrito.json", "utf-8");
      this.carts = JSON.parse(file);
    } else {
      this.#updateCartFile();
    }
  }

  #updateCartFile() {
    fs.writeFileSync("carrito.json", JSON.stringify(this.carts), "utf-8");
    let file = fs.readFileSync("carrito.json", "utf-8");
    this.carts = JSON.parse(file);
  }

  #getMaxId() {
    let maxId = 0;
    this.carts.map((cart) => {
      if (cart.id > maxId) maxId = cart.id;
    });
    return maxId;
  }
}
