import ProductService from "../services/products.service.js";
import CartsService from "../services/carts.service.js";
import UserService from "../services/users.service.js";
// import auth from "../middlewares/auth.middleware.js";

/* Instancias */

const cartsServiceInstance = new CartsService();
const cartsService = cartsServiceInstance;

const productServiceInstance = new ProductService();
const productService = productServiceInstance;

const userServiceInstance = new UserService();
const userService = userServiceInstance;

class ViewsController {
  static #instance;

  async getProductsIndex(req, res) {
    try {
      const paginatedData = await productService.getProducts(
        {},
        { lean: true }
      );
      res.status(200).render("index", paginatedData);
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }

  async getProducts(req, res) {
    try {
      const { limit, sort, page } = req.query;
      const options = {
        limit: limit ? Number(limit) : 10,
        sort: sort ? { price: sort } : {},
        page: page ? Number(page) : 1,
        lean: true,
      };
      let query = {};
      if (req.query.category) query.category = req.query.category;
      const paginatedData = await productService.getProducts(query, options);
      res.status(200).render("products", paginatedData);
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }

  async getRealTimeProducts(req, res) {
    try {
      const paginatedData = await productService.getProducts(
        {},
        { lean: true }
      );
      res.status(200).render("realTimeProducts", paginatedData);
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }

  async getChat(req, res) {
    try {
      res.status(200).render("chat");
    } catch (error) {
      res.status(500).json({ Error: error.message });
    }
  }

  async login(req, res) {
    try {
      if (!req.isAuthenticated()) {
        return res.status(200).render("login");
      }

      return res.status(200).redirect("/products");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async registrarUser(req, res) {
    try {
      res.status(200).render("registrarse");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCartById(req, res) {
    try {
      const cart = await cartsService.getCartById({}, { lean: true });
      res.status(200).render("cart", cart);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProfile(req, res) {
    try {
      const user = await userService.getUser(
        req?.session?.passport?.user?.email,
        {
          lean: true,
        }
      );
      res.status(200).render("profile", { user });
    } catch (error) {
      throw new Error(err);
    }
  }

  async getAdminField(req, res) {
    try {
      const user = await userService.getUser({}, { lean: true });
      if (user.email === "adminCoder@coder.com") {
        return res.status(200).render("admin", { user });
      }
      return res
        .status(401)
        .json({ Error: "Usted debe ser admin para poder acceder aquí" });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async fail(req, res) {
    try {
      res.status(200).render("fail");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static getInstance() {
    if (this.#instance) {
      return this.#instance;
    }

    this.#instance = new ViewsController();
    return this.#instance;
  }
}

export default ViewsController.getInstance();
