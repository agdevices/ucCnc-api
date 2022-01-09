const express = require('express')
const router = express.Router()
const getClient = require('../db/mongodb');


function connect(req, res, next){
    getClient((err, db) => {
        if (err) return res.send(err)
        req.db = db
        next()
    })
};

router.get('/', connect, (req, res, next) => {
        req.db.collection('menu_items').find().toArray((err, result) => {
            if (err) return res.send(err)
            req.datos = result
        })
        req.db.collection('us_stuff').find().toArray((err, result) => {
            if (err) return res.send(err)
            req.datos = req.datos.concat(result)
        })
        req.db.collection('services_items').find().toArray((err, result) => {
            if (err) return res.send(err)
            req.datos = req.datos.concat(result)
        })
        req.db.collection('gallery_items').find().toArray((err, result) => {
            if (err) return res.send(err)
            req.datos = req.datos.concat(result)
        })
        req.db.collection('materials_stuff').find().toArray((err, result) => {
            if (err) return res.send(err)
            req.datos = req.datos.concat(result)
            res.send(req.datos)
        })
})

module.exports = router;