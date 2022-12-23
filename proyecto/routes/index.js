const Router = require('express');

const productRouter = require ("../routers/products.router.js")
const cartRouter = require ("../routers/carts.router.js")

const router = Router();


router.use("/products", productRouter);
router.use("/carts", cartRouter); 

module.exports = router;