const express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const router = express.Router()
const saltRounds = 10

//Models
const User = require("../models/User")

const jsonParser = bodyParser.json()

router.post('/add', jsonParser, async (req, res) => {
    try {
        const checkEmail = await User.findOne({ email: req.body.email })

        if (!checkEmail) {
            const password = req.body.password
            req.body.password = await bcrypt.hashSync(password, saltRounds)
            const user = new User(req.body)
            await user.save()

            res.send({ status: true, message: "User added successfully..." })
        } else {
            res.send({ status: false, message: "User already exists" })
        }
    } catch (error) {
        console.log(error)
        res.send({ status: false, message: "something went wrong..." })
    }
})

module.exports = router