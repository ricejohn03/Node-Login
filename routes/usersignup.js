const express = require('express')
const router = express.Router()
const UserSchema = require('../models/user')
const { check, validationResult } = require('express-validator')

router.post('/signup',
    [
        check('name', 'name is required to sign up').not().isEmpty(),
        check('email', 'a valid email is required to sign up').not().isEmpty().isEmail(),
        check('password', 'password is required and needs to be alteast 6 charaters').not().isEmpty().isLength({ min: 6 }),
    ],

    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ err: errors.array() })
        }
        console.log(req.body)
        const user = new UserSchema(req.body)
        user.save((err, user) => {
            if (err) {
                res.status(400).json({mgs: "Error when saving"})
            }
        })
        res.send("user has been successfully created")
})

module.exports = router