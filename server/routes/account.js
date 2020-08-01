const express = require('express');
const router = express.Router();
const User = require('../mongoDB/schemaUsers');
const passport = require('passport')
const jwt = require('jsonwebtoken')
const mongodbConfig = require('../mongoDB/configDb');




router.post('/api/newuser/', async (require, resolve) => {

    const newUser = await new User({ name: require.body.name, email: require.body.email, password: require.body.password, regData: new Date().getTime() });

    await newUser.save().then(() => resolve.status(200).json("Пользователь создан")).catch(error => (resolve.status(400).json("Ошибка")))

})





















module.exports = router
