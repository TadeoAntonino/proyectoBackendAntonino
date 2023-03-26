import { Router } from "express";
import renderMockProducts from "../mocking/genProducts.js";

const router = Router();

router.get("/mockingproducts", renderMockProducts);

export default router;
