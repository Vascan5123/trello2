var express = require('express');
var app = express()
var http = require('http').createServer(app);
var path = require('path')
const mongodbConfig = require("./mongoDb/configDb.js");
const mongoose = require('mongoose');
var users = require('./mongoDB/schemaUsers.js')
var bodyParser = require('body-parser');
const { error } = require('console');
const { isDate } = require('util');


/* app.use('/static', express.static(path.resolve("src"))) */

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/api/autologin/', async (require, resolve) => {

    /* const kitty = await new users({ name: contacts[0].name });
    await kitty.save().then(() => console.log('meow')); */

    resolve.status(200).json("contacts")
})



app.post('/api/signin/', async (require, resolve) => {


    await mongoose.connection.collection("users").findOne({ email: require.body.email, password: require.body.password }, function (err, result) {

        if (result != null) {
            resolve.status(200).json("Вход в аккаунт")
        } else if (result == null) {
            resolve.status(400).json("Ошибка")
        }

    });
})




    /* const newUser = await new users({ name: require.body.name, email: require.body.email, password: require.body.password, regData: new Date().getTime() }); */
    /* await newUser.save().then(() => resolve.status(200).json("Пользователь создан")).catch(error => (resolve.status(400).json("Ошибка"))) */



    app.post('/api/newuser/', async (require, resolve) => {
        const newUser = await new users({ name: require.body.name, email: require.body.email, password: require.body.password, regData: new Date().getTime() });
        await newUser.save().then(() => resolve.status(200).json("Пользователь создан")).catch(error => (resolve.status(400).json("Ошибка")))

    })
















    app.get(`*`, function (req, res) {
        res.send('')
    });











    async function start() {
        try {
            /* await mongoose.connect(`mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false`,{
              useUnifiedTopology: true,
              useNewUrlParser: true,
              useFindAndModify: false
            }) */

            await mongoose.connect(`mongodb+srv://${mongodbConfig.login}:${mongodbConfig.password}@cluster0-c17qy.mongodb.net/${mongodbConfig.project}`, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false
            })

            const db = mongoose.connection

            http.listen(8081, function () {
                console.log('Example app listening on port 8081!');
            })
        } catch (error) {
            console.log(error)
        }
    }

    start()