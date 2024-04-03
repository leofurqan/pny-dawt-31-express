const mongoose = require("mongoose")
const productSchema = require("../schema/productSchema")

const Product = mongoose.model("products", productSchema)

module.exports = Product