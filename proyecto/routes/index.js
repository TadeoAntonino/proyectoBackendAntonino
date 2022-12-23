const Router = require('express');

const productRouter = require ("./products.router.js")

const router = Router();


router.use("/products", productRouter);
//agregar /cart 

module.exports = router;