const mongoose = require('mongoose')
const crypto = require('crypto')
const { v1: uuidv1 } = require('uuid')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    _hashedpassword: {
        type: String,
        required: true
    },

    salt: String


}, { timestamps: true })

UserSchema.virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = uuidv1()
        this._hashedpassword = this.encrpytpassword(password)

    })
    .get(() => this._password)

UserSchema.methods = {
    authenticate: function (plaintext) {
        return this.encrpytpassword(plaintext) === this._hashedpassword
    },
    encrpytpassword: function (password) {
        if (!password) {
            return ''
        }
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    }
}

module.exports = mongoose.model("user", UserSchema)