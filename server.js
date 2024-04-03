const express = require("express")
require("dotenv").config()
require('./db')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

//Routes
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")

const app = express()

app.use("/users", userRoutes)
app.use("/products", productRoutes)

// const token = jwt.sign({name: "furqan"}, process.env.TOKEN_SECRET)
// console.log(token)

app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT: ${process.env.PORT}`)
})