var express = require('express');
const router = express.Router();
var users = require('../mongoDB/schemaUsers.js')
const mongodbConfig = require("../mongoDb/configDb.js");
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const session = require('express-session')
const passport = require('passport')
const jwt = require('jsonwebtoken')




router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())




router.post('/api/newuser/', async (require, resolve) => {

    try {

        await mongoose.connection.collection("users").findOne({ email: require.body.email }, function (err, result) {
            if (result != undefined) {
                resolve.status(404).json({
                    succes: false,
                    msg: "Ошибка. Данный пользователь уже зарегистрирован"
                })
            }
        })

        const newUser = await new users({ name: require.body.name, email: require.body.email, password: require.body.password, regData: new Date().getTime() });

        await newUser.save().then(async () => {

            await mongoose.connection.collection("users").findOne({ email: require.body.email, password: require.body.password }, function (err, result) {

                const token = jwt.sign({
                    id: result._id,
                    email: result.email,
                    password: result.password
                }, mongodbConfig.secret, {
                    expiresIn: 3600
                })

                resolve.status(200).json({
                    succes: true,
                    token: "Bearer " + token,
                    user: {
                        id: result._id,
                        email: result.email,
                        name: result.name
                    }
                })
            })

        })
    } catch (e) {
        resolve.status(404).json({
            succes: false,
            msg: `Ошибка + ${e}`})
            throw e
    }

})

















module.exports = router
