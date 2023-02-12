import * as ProductService from "../services/products.service.js";

export async function addProduct() {
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

export async function getProducts() {
  try {
    const response = await ProductService.getProducts();
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

export async function getProductById() {
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

export async function deleteProduct() {
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

export async function updateProduct() {
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
