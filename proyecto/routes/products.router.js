const Router = require('express');
const ProductManager = require("../productManager.js");


const router = Router();
const products = new ProductManager;

router.get("/", async (req, res, next) => {
    try {
        const allProducts = await products.getProducts();
        res.status(200).json(allProducts);
    }
    catch(e){
        next(e);
        console.log(e);
    }
});



router.get("/:pid", async (req, res, next) => {
    try {
        const {pid} = req.params;
        const allProducts = await products.getProducts();
        const product = Object.values(allProducts).filter((e)=>{
            e.id == Number(pid);
        })
        for(let [key, value] of Object.entries(allProducts)){
            if(value.id === pid){
                console.log(value);
            }

        }

        res.status(200);
       
    }
    catch(e){
        next(e);
        console.log(e);
    }
})


router.post("/", (req, res) => {
    ProductManager.addProduct();
    res.status(201).json({});
});


router.put("/:pid", (req, res) => {
    ProductManager.updateProduct();
    res.status(201).json({});
});

router.delete("/:pid", (req, res) => {
    ProductManager.deleteProduct();
    res.status(201).json({});
});



module.exports = router;