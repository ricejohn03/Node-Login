const express = require('express')
const router = express.Router()
const auth = require('../auth/auth')
router.get('/auth', auth, (req, res) => {

    res.send("You have been authorized")
})

module.exports = router