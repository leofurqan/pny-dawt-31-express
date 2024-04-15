const express = require("express")
require("dotenv").config()
require('./db')
const exphb = require("express-handlebars")

//Routes
const websiteRoutes = require("./routes/websiteRoutes")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
 
const app = express()

app.engine('handlebars', exphb.engine())
app.set('view engine', 'handlebars')
app.set('views', './views');

app.use("/", websiteRoutes)
app.use("/users", userRoutes)
app.use("/products", productRoutes)

// const token = jwt.sign({name: "furqan"}, process.env.TOKEN_SECRET)
// console.log(token)

app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT: ${process.env.PORT}`)
})