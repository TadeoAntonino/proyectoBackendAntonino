import fs from "fs";

export default class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./productos.json";
    this.getProductFile();
  }

  addProduct(product) {
    const {
      title,
      description,
      price,
      thumbnail,
      stock,
      code,
      status,
      category,
    } = product;
    if (Object.values(product).includes(undefined))
      return { error: "Completar todos los campos" };

    if (typeof title !== "string") return { error: "title must be string" };

    if (typeof description !== "string")
      return { error: "description must be string" };

    if (typeof price !== "number") return { error: "price must be a number" };

    if (typeof thumbnail !== "string")
      return { error: "thumbnail must be string" };

    if (typeof stock !== "number") return { error: "stock must be a number" };

    if (typeof code !== "number") return { error: "code must be a number" };

    if (typeof status !== "boolean") return { error: "status must be boolean" };

    if (typeof category !== "string")
      return { error: "category must be string" };

    const newProduct = { ...product, id: this.#getMaxId() + 1 };
    if (!this.products.includes(newProduct.id)) {
      this.products.push(newProduct);
      const productosAgregar = JSON.stringify(this.products);
      fs.writeFileSync(this.path, productosAgregar, "utf-8");
      return { mensaje: "Producto agrega2" };
    } else {
      return { error: "El ID no está disponible" };
    }
  }

  // inicializa la clase
  getProductFile() {
    if (fs.existsSync("productos.json")) {
      let file = fs.readFileSync("productos.json", "utf-8");
      this.products = JSON.parse(file);
    } else {
      fs.writeFileSync("productos.json", "[]", "utf-8");
      let file = fs.readFileSync("productos.json", "utf-8");
      this.products = JSON.parse(file);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const findProduct = this.products.find((product) => {
      return product.id === Number(id);
    });
    if (findProduct?.length === 0) {
      return { error: "not found" };
    } else {
      return findProduct;
    }
  }

  updateProduct(id, product) {
    const products = this.products;
    const objIndex = products.findIndex((p) => p.id === Number(id));
    products[objIndex] = { ...product, id: Number(id) };
    const productosAgregar = JSON.stringify(products);
    fs.writeFileSync(this.path, productosAgregar, "utf-8");
    return { mensaje: "Producto actualiza2" };
  }

  deleteProduct(ID) {
    const find = this.products.find((product) => product.id === ID);
    if (find) {
      const filtered = this.products.filter((product) => product.id !== ID);
      const productosAgregar = JSON.stringify(filtered);
      fs.writeFileSync(this.path, productosAgregar, "utf-8");
    } else {
      console.error("Error: El producto no existe");
    }
  }

  #getMaxId() {
    let maxId = 0;
    this.products.map((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    return maxId;
  }
}
