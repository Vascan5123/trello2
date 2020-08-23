var express = require('express');
const router = express.Router();
const mongodbConfig = require("../mongoDb/configDb.js");
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const session = require('express-session')
const passport = require('passport')
const jwt = require('jsonwebtoken');
const { table } = require('console');


router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


router.post('/api/createtable/', async (require, resolve) => {


    await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, async function (err, result) {

        var tables1 = result.tables

        var lengthTables = tables1.length

        var tableEnable = false

        for (var i = 0; i < lengthTables; i++) {
            if (tables1[i].name == require.body.name) {
                tableEnable = true
                break
            }
        }

        if (!tableEnable) {
            await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) },
                { $push: { tables: { name: require.body.name, description: "", fon: require.body.fon, zoom: 100, lists: [] } } })

            resolve.status(200).json({
                succes: true
            })

        } else {
            resolve.status(404).json({
                succes: false,
                msg: "Уже есть доска с таким именем!"
            })
        }

    })

})


router.post('/api/alltables/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, function (err, result) {
            resolve.status(200).json({
                succes: true,
                tables: result.tables,
                length: result.tables.length
            })
        })
    } catch (error) {
        resolve.status(404).json({
            succes: false
        })
    }
})


router.post('/api/getInfoTable/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, function (err, result) {

            var tables1 = result.tables

            var tables2 = []

            var lengthTables = tables1.length

            for (var i = 0; i < lengthTables; i++) {
                if (tables1[i].name == require.body.name) {
                    tables2 = tables1[i]
                    break
                }
            }


            resolve.status(200).json({
                succes: true,
                table: tables2,
            })
        })
    } catch (error) {
        resolve.status(404)
    }
})


router.post('/api/droptable/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, async function (err, result) {

            var tables1 = result.tables

            var tables2 = []

            var lengthTables = tables1.length

            for (var i = 0; i < lengthTables; i++) {
                if (tables1[i].name != require.body.name) {
                    tables2.push(tables1[i])
                }
            }

            await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) },
                { $set: { tables: tables2 } })

            resolve.status(200).json({
                succes: true,
            })
        })
    } catch (error) {
        resolve.status(404)
    }
})


router.post('/api/setdescription/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, async function (err, result) {

            var tables1 = result.tables

            var lengthTables = tables1.length

            for (var i = 0; i < lengthTables; i++) {
                if (tables1[i].name == require.body.name) {
                    tables1[i].description = require.body.description
                    break
                }
            }

            await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) },
                { $set: { tables: tables1 } })

            resolve.status(200).json({
                succes: true,
            })
        })
    } catch (error) {
        resolve.status(404)
    }
})


router.post('/api/SetNewFon/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, async function (err, result) {

            var tables1 = result.tables

            var lengthTables = tables1.length

            for (var i = 0; i < lengthTables; i++) {
                if (tables1[i].name == require.body.name) {
                    tables1[i].fon = require.body.fon
                    break
                }
            }

            await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) },
                { $set: { tables: tables1 } })

            resolve.status(200).json({
                succes: true,
            })
        })
    } catch (error) {
        resolve.status(404)
    }
})


router.post('/api/NewList/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, async function (err, result) {

            var tables1 = result.tables

            var lengthTables = tables1.length

            var random = Math.random().toString(36).substr(2, 9) + require.body.title

            for (var i = 0; i < lengthTables; i++) {
                if (tables1[i].name == require.body.name) {
                    tables1[i].lists.push({ 'id': random, 'title': require.body.title, 'fon': "1", 'cards': [] })
                    break
                }
            }

            await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) },
                { $set: { tables: tables1 } })

            resolve.status(200).json({
                succes: true,
                newTable: { 'id': random, 'title': require.body.title, 'fon': "grey lighten-4", 'cards': [] }
            })
        })
    } catch (error) {
        resolve.status(404)
    }
})


router.post('/api/NewTitleTable/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, async function (err, result) {

            var tables1 = result.tables

            var lengthTables = tables1.length

            var tableEnableNumber = false

            for (var i = 0; i < lengthTables; i++) {
                if (tables1[i].name == require.body.title) {
                    tableEnableNumber = true
                }
            }

            if (tableEnableNumber == false) {

                for (var i = 0; i < lengthTables; i++) {
                    if (tables1[i].name == require.body.name) {
                        tables1[i].name = require.body.title
                    }
                }

                await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) },
                    { $set: { tables: tables1 } })

                resolve.status(200).json({
                    succes: true
                })

            } else {
                resolve.status(404).json({
                    succes: false,
                    msg: "Уже есть доска с таким именем!"
                })
            }

        })
    } catch (error) {
        resolve.status(404)
    }
})


router.post('/api/setfonlist/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, async function (err, result) {

            var tables1 = result.tables

            var lengthTables = tables1.length

            var Number = null

            for (var i = 0; i < lengthTables; i++) {
                if (tables1[i].name == require.body.name) {

                    var lengthLists = tables1[i].lists.length


                    for (var j = 0; j < lengthLists; j++) {
                        if (tables1[i].lists[j].id == require.body.idList) {
                            tables1[i].lists[j].fon = require.body.color
                            Number = j

                        }
                    }

                }
            }

            await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) },
                { $set: { tables: tables1 } })

            resolve.status(200).json({
                succes: true,
                number: Number
            })

        })
    } catch (error) {
        resolve.status(404)
    }
})


router.post('/api/newzoom/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, async function (err, result) {

            var tables1 = result.tables

            var lengthTables = tables1.length

            for (var i = 0; i < lengthTables; i++) {
                if (tables1[i].name == require.body.name) {
                    tables1[i].zoom = require.body.zoom
                    break
                }
            }

            await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) },
                { $set: { tables: tables1 } })

            resolve.status(200).json({
                succes: true
            })
        })
    } catch (error) {
        resolve.status(404)
    }
})


router.post('/api/newcard/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, async function (err, result) {

            var tables1 = result.tables

            var lengthTables = tables1.length

            var random = Math.random().toString(36).substr(2, 9) + require.body.titleCard

            for (var i = 0; i < lengthTables; i++) {
                if (tables1[i].name == require.body.name) {

                    var lengthLists = tables1[i].lists.length

                    for (var j = 0; j < lengthLists; j++) {
                        if (tables1[i].lists[j].id == require.body.idList) {
                            tables1[i].lists[j].cards.push({ 'id': random, 'title': require.body.titleCard, 'description': "", 'fon': "white" })
                        }
                    }
                }
            }

            await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) },
                { $set: { tables: tables1 } })

            resolve.status(200).json({
                succes: true,
                newCard: { 'id': random, 'title': require.body.titleCard, 'description': "", 'fon': "white" }
            })
        })
    } catch (error) {
        resolve.status(404)
    }
})


router.post('/api/editcard/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, async function (err, result) {

            var tables1 = result.tables

            var lengthTables = tables1.length

            var infoCard = {}

            for (var i = 0; i < lengthTables; i++) {
                if (tables1[i].name == require.body.name) {

                    infoCard = tables1[i].lists[require.body.list].cards[require.body.card];

                    break
                }
            }

            resolve.status(200).json({
                succes: true,
                infoCard: infoCard
            })
        })
    } catch (error) {
        resolve.status(404)
    }
})


router.post('/api/setfoncard/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, async function (err, result) {

            var tables1 = result.tables

            var lengthTables = tables1.length

            for (var i = 0; i < lengthTables; i++) {
                if (tables1[i].name == require.body.name) {

                    tables1[i].lists[require.body.list].cards[require.body.card].fon
                        = require.body.fon

                }
            }

            await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) },
                { $set: { tables: tables1 } })

            resolve.status(200).json({
                succes: true
            })

        })
    } catch (error) {
        resolve.status(404)
    }
})


router.post('/api/delitecard/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, async function (err, result) {

            var tables1 = result.tables

            var lengthTables = tables1.length

            var card1 = []

            for (var i = 0; i < lengthTables; i++) {
                if (tables1[i].name == require.body.name) {

                    var lengthLists = tables1[i].lists[require.body.list].cards.length

                    for (var j = 0; j < lengthLists; j++) {
                        if (j != require.body.card) {

                            card1.push(tables1[i].lists[require.body.list].cards[j])

                        }
                    }
                    tables1[i].lists[require.body.list].cards = card1
                }
            }

            await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) },
                { $set: { tables: tables1 } })

            resolve.status(200).json({
                succes: true,
                card: card1
            })

        })
    } catch (error) {
        resolve.status(404)
    }
})


router.post('/api/newtitlecard/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, async function (err, result) {

            var tables1 = result.tables

            var lengthTables = tables1.length

            for (var i = 0; i < lengthTables; i++) {
                if (tables1[i].name == require.body.name) {
                    tables1[i].lists[require.body.list].cards[require.body.card].title = require.body.title
                }
            }

                await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) },
                    { $set: { tables: tables1 } })

                resolve.status(200).json({
                    succes: true
                })

        })
    } catch (error) {
        resolve.status(404)
    }
})


router.post('/api/newdescriptioncard/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, async function (err, result) {

            var tables1 = result.tables

            var lengthTables = tables1.length

            for (var i = 0; i < lengthTables; i++) {
                if (tables1[i].name == require.body.name) {
                    tables1[i].lists[require.body.list].cards[require.body.card].description = require.body.description
                }
            }

                await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) },
                    { $set: { tables: tables1 } })

                resolve.status(200).json({
                    succes: true
                })

        })
    } catch (error) {
        resolve.status(404)
    }
})


router.post('/api/delitelist/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, async function (err, result) {

            var tables1 = result.tables

            var lengthTables = tables1.length

            var lists1 = []

            for (var i = 0; i < lengthTables; i++) {
                if (tables1[i].name == require.body.name) {

                    var lengthLists = tables1[i].lists.length

                    for (var j = 0; j < lengthLists; j++) {
                        if (tables1[i].lists[j].id != require.body.listid) {

                            lists1.push(tables1[i].lists[j])

                        }
                    }
                    tables1[i].lists = lists1
                }
            }

            await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) },
                { $set: { tables: tables1 } })

            resolve.status(200).json({
                succes: true,
                lists1: lists1
            })

        })
    } catch (error) {
        resolve.status(404)
    }
})











module.exports = router