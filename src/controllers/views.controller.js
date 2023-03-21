import * as ProductsServices from "../services/products.service.js";
import * as CartServices from "../services/carts.service.js";
import * as UserServices from "../services/users.service.js";
import auth from "../middlewares/auth.middleware.js";

export async function getProductsIndex(req, res) {
  try {
    const paginatedData = await ProductsServices.getProducts(
      {},
      { lean: true }
    );
    res.status(200).render("index", paginatedData);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}

export async function getProducts(req, res) {
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
    const paginatedData = await ProductsServices.getProducts(query, options);
    res.status(200).render("products", paginatedData);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}

export async function getRealTimeProducts(req, res) {
  try {
    const paginatedData = await ProductsServices.getProducts(
      {},
      { lean: true }
    );
    res.status(200).render("realTimeProducts", paginatedData);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}

export async function getChat(req, res) {
  try {
    res.status(200).render("chat");
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}

export async function login(req, res) {
  try {
    if (!req.isAuthenticated()) {
      return res.status(200).render("login");
    }

    return res.status(200).redirect("/products");
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function registrarUser(req, res) {
  try {
    res.status(200).render("registrarse");
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCartById(req, res) {
  try {
    const cart = await CartServices.getCartById({}, { lean: true });
    res.status(200).render("cart", cart);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProfile(req, res) {
  try {
    const user = await UserServices.getUser(
      req?.session?.passport?.user?.email,
      {
        lean: true,
      }
    );
    res.status(200).render("profile", { user });
  } catch (error) {
    console.log(error.message);
  }
}

export async function getAdminField(req, res) {
  try {
    const user = await UserServices.getUser({}, { lean: true });
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

export async function fail(req, res) {
  try {
    res.status(200).render("fail");
  } catch (error) {
    throw new Error(error.message);
  }
}
