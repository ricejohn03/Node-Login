const express = require('express')
const UserSchema = require('../models/user')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { check, validationResult } = require('express-validator')

router.post('/signin',
    [
        check('email', 'email is required for login').not().isEmpty(),
        check('password', 'password is required and needs to be alteast 6 charaters').not().isEmpty().isLength({ min: 6 }),

    ],

    (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ err: errors.array() })
        }
        const { email, password } = req.body
        UserSchema.findOne({ email }, (err, user) => {
        if (err || !user) {
            res.status(400).json({err: "user with that email does not exist"})
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({err: "email and password do not match"})
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT)
        return res.send({token: token, user: user})
    })

})

module.exports = router
