const { Schema, model } = require('mongoose')

module.exports = model('users', { name: String, email: String, password: String, avatar: Number, regData: String});