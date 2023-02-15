import * as ProductService from "../services/products.service.js";

export async function getProducts(req, res) {
  try {

    const { page = 1, limit = 5, sort = "asc", category } = req.query;
   
    const response = await ProductService.getProducts(Number(page), Number(limit), sort, category);
    res.json({
      products: response,
      status: "SUCCESS",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: "FAIL",
    });
  }
}

export async function getProductById(req, res) {
  try {
    const response = await ProductService.getProductById();
    res.json({
      product: response,
      status: "SUCCESS",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: "FAIL",
    });
  }
}

export async function addProduct(req, res) {
  try {
    const response = await ProductService.addProduct();
    res.json({
      product: response,
      status: "SUCCESS",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: "FAIL",
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    const response = await ProductService.deleteProduct();
    res.json({
      product: response,
      status: "SUCCESS",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: "FAIL",
    });
  }
}

export async function updateProduct(req, res) {
  try {
    const response = await ProductService.updateProduct();
    res.json({
      product: response,
      status: "SUCCESS",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: "FAIL",
    });
  }
}
