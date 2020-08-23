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
                { $push: { tables: { name: require.body.name, description: "", fon: require.body.fon, lists: [] } } })

            resolve.status(200).json({
                succes: true
            })

        } else {
            resolve.status(404).json({
                succes: false,
                msg: "Уже есть доска с таким именем!"})
        }

    })

})


router.post('/api/alltables/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, function (err, result) {
            resolve.status(200).json({
                succes: true,
                tables: result.tables
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


router.post('/api/alltables/', async (require, resolve) => {
    try {
        await mongoose.connection.collection("users").findOne({ _id: mongoose.Types.ObjectId(require.body.id) }, function (err, result) {
            resolve.status(200).json({
                succes: true,
                tables: result.tables
            })
        })
    } catch (error) {
        resolve.status(404).json({
            succes: false
        })
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

            for (var i = 0; i < lengthTables; i++) {
                if (tables1[i].name == require.body.name) {
                    tables1[i].lists.push({ 'id': Math.random().toString(36).substr(2, 9) + require.body.title, 'title': require.body.title, 'fon': "1", 'rows': [] })
                    newTable = { 'id': Math.random().toString(36).substr(2, 9) + require.body.title, 'title': require.body.title, 'fon': "grey lighten-4", 'rows': [] }
                    break
                }
            }

            await mongoose.connection.collection("users").updateOne({ _id: mongoose.Types.ObjectId(require.body.id) },
                { $set: { tables: tables1 } })

            resolve.status(200).json({
                succes: true,
                newTable: newTable,
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
                    msg: "Уже есть доска с таким именем!"})
            }

        })
    } catch (error) {
        resolve.status(404)
    }
})















module.exports = router