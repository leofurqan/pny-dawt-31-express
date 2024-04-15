const express = require("express")
const bodyParser = require("body-parser")
const joi = require("joi")
const bcrypt = require("bcrypt")
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
const User = require("../models/User")

const jsonParser = bodyParser.json()

router.post('/add', jsonParser, async (req, res) => {
    try {
        await addUserValidator.validateAsync(req.body)

        const checkEmail = await User.findOne({ email: req.body.email })
        if (!checkEmail) {
            const user = new User(req.body)
            await user.save()

            res.send({ status: true, message: "User added successfully..." })
        } else {
            res.send({ status: false, message: "User already exists" })
        }
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

router.get('/:id', jsonParser, async (req, res) => {
    var user_id = req.params.id
    const user = await User.findOne({_id: user_id}).select('-password')

    if(user) {
        res.send({status: true, user: user})
    } else {
        res.send({status: false, message: "User ID Invalid"})
    }
})

router.get('/', jsonParser, async(req, res) => {
    try{
        const users = await User.find({}).select('-password')

        if(users) {
            res.send({status: true, users: users})
        } else {
            res.send({status: false, message: "No Users Found"})
        }
    } catch(error) {
        console.log(error)
    }
})

router.patch('/:id', jsonParser, async (req, res) => {
    try {
        await editUserValidator.validateAsync(req.body)

        await User.findByIdAndUpdate(req.params.id, req.body)
        res.send({status: true, message: "User updated successfully..."})
    } catch(error) {
        console.log(error)
    }
})

router.delete('/:id', jsonParser, async(req, res) => {
    try {
        const user_id = req.params.id

        await User.findByIdAndDelete(user_id)
        res.send({status: true, message: "User deleted successfully..."})
    } catch(error) {
        console.log(error)
    }
})

module.exports = router