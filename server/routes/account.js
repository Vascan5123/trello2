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

        const newUser = await new users({ name: require.body.name, email: require.body.email, password: require.body.password, avatar: 0, regData: new Date().getTime() });

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
                        name: result.name,
                        avatar: result.avatar
                    }
                })
            })

        })
    } catch (e) {
        resolve.status(404).json({
            succes: false,
            msg: `Ошибка + ${e}`
        })
    }

})










router.post('/api/newAvatar/', async (require, resolve) => {
    await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) }, { $set: { avatar: require.body.newAvatar } })
    resolve.status(200).json({
        succes: true
    })


})

router.post('/api/newName/', async (require, resolve) => {
    await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) }, { $set: { name: require.body.newName } })
    resolve.status(200).json({
        succes: true
    })


})

router.post('/api/newEmail/', async (require, resolve) => {
    console.log(require.body.id)
    await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) }, { $set: { email: require.body.newEmail } })
    resolve.status(200).json({
        succes: true
    })


})













module.exports = router
