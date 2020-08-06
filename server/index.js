var express = require('express');
var app = express()
var http = require('http').createServer(app);
var path = require('path')
const mongodbConfig = require("./mongoDb/configDb.js");
const mongoose = require('mongoose');
var users = require('./mongoDB/schemaUsers.js')
var bodyParser = require('body-parser');
const session = require('express-session')
const passport = require('passport')
const account = require('./routes/account.js')
const jwt = require('jsonwebtoken')
app.use(account)



/* app.use('/static', express.static(path.resolve("src"))) */

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())

app.use(
    session({
        secret: mongodbConfig.secret,
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        },
        resave: false,
        saveUninitialized: false
    })
)

require('./passport/passport-config.js')(passport)



app.get('/api/autologin/', passport.authenticate('jwt', {session: false}), async (require, resolve) => {
    resolve.status(200).json({
        succes: true,
    })
})



app.post('/api/signin/', async (require, resolve) => {



    await mongoose.connection.collection("users").findOne({ email: require.body.email, password: require.body.password }, function (err, result) {

        if (result != null) {
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
        } else if (result == null) {
            resolve.status(400).json({
                succes: false,
                msg: "Ошибка"
            })
        }

    });
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