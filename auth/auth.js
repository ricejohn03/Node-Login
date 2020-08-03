const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    const token = req.header('x-auth')
    jwt.verify(token, process.env.JWT, (err, val) => {
        if (err) {
            return res.status(501).json({ err: "the token you have provided is invalid" })
        }
        next()
    })

}
