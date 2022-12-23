const Router = require('express');

const carts = [];

const router = Router();

router.get("/", (req, res) => {
    res.json(carts);
});

router.post("/", (req, res) => {
    carts.push(req.body);
    res.status(201).json(carts);
});


module.exports = router;