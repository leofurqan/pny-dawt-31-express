const jwt = require("jsonwebtoken")
require('dotenv').config()

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token']

    if(!token) {
        return res.status(403).send({status: false, message: "Token required for authentication"})
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).send({status: false, message: "Invalid Token"})
        } else {
            return next()
        }
    })
}

module.exports = verifyToken