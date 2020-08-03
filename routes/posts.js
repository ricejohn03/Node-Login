const express = require('express')
const router = express.Router()
const auth = require('../auth/auth')
router.get('/posts', auth, (req, res) => {
    res.send("You have made it to and authenticated route")

})

module.exports = router