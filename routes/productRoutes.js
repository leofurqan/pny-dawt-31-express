const express = require("express")
const bodyParser = require("body-parser")
const joi = require("joi")
const router = express.Router()
const auth = require('../middleware/auth')

//Validators
const addUserValidator = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(8)
})

const editUserValidator = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required()
})

const loginUserValidator = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(8)
})

//Models
const Product = require("../models/Product")

const jsonParser = bodyParser.json()

router.post('/add', jsonParser, async (req, res) => {
    try {
        const product = new Product(req.body)
        await product.save()
    } catch (error) {
        console.log(error)
        res.send({ status: false, message: error.details[0].message })
    }
})

router.post('/login', jsonParser, async(req, res) => {
    try {
        await loginUserValidator.validateAsync(req.body)

        const user = await User.findOne({email: req.body.email})

        if(user) {
            const match = await bcrypt.compare(req.body.password, user.password)

            if(match) {
                res.send({status: true, user: user, message: "Login Successfull..."})
            } else {
                res.send({status: false, message: "Invalid Credentials!!"})
            }
        } else {
            res.send({status: false, message: "Invalid Credentials!!"})
        }
    } catch(error) {
        console.log(error)
        res.send({status: false, message: error.details[0].message})
    }
})

module.exports = router