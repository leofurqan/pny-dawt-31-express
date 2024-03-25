const express = require("express")
require("dotenv").config()
require('./db')
const bcrypt = require('bcrypt')

//Routes
const userRoutes = require("./routes/userRoutes")

const app = express()

app.use("/users", userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT: ${process.env.PORT}`)
})