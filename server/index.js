var express = require('express');
var app = express()
var http = require('http').createServer(app);
var path = require('path')




/* app.use('/static', express.static(path.resolve("src"))) */

let contacts =
    [
        {
            id: 1,
            name: "Имя",
            lastname: "Фамилия"
        },
        {
            id: 2,
            name: "Имя2",
            lastname: "Фамилия2"
        }
    ]


app.get('/api/contacts/', (require, resolve) => {
    resolve.status(200).json(contacts)
})




app.get(`*`, function (req, res) {
    res.send('')
});



async function start() {
    try {
        /* await mongoose.connect(`mongodb+srv://${mongodbConfig.login}:${mongodbConfig.password}@cluster0-c17qy.mongodb.net/${mongodbConfig.project}`, {
          useNewUrlParser: true,
          useFindAndModify: false
        }) */

        http.listen(8081, function () {
            console.log('Example app listening on port 8081!');
        })
    } catch (error) {
        console.log(error)
    }
}

start()