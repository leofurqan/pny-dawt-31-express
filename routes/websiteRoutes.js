const express = require("express");
const bodyParser = require("body-parser");
const joi = require("joi");
const router = express.Router();
const Product = require("../models/Product")

router.get("/", async (req, res) => {
  const products = await Product.find({}).lean()
  res.render("home", {products: products});
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact", { layout: false });
});

module.exports = router;
