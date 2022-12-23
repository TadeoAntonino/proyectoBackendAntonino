import { Router } from "express";
//import fs from 'fs';

const carts = [];

const router = Router();

router.get("/:cid", (req, res) => {
  res.json(carts);
});

router.post("/", (req, res) => {
  carts.push(req.body);
  res.status(201).json(carts);
});

router.post("/:cid/product/:pid", (req, res) => {

});

export default router;