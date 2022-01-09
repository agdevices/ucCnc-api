const { ObjectId } = require('mongodb');
const express = require('express')
const router = express.Router()
const getClient = require('../db/mongodb')

router.get('/us', (req, res) => {
    getClient((err, db) => {
        if (err) return res.send(err)
        db.collection('us_stuff').find().toArray((err, result) => {
            if (err) return res.send(err)
            return res.send(result)
        })
    })
})

router.post('/us', (req, res) => {
    // console.log(req.body)
    const ar = []
    ar.push(req.body);
    // req.body.created = new Date()

    getClient((err, db) => {
        if (err) return res.send(err)
        db.collection('us_stuff').insertMany(ar, (err, result) => {
            if (err) return res.send(err)
            return res.send(result)
        })
    })
})

router.patch('/us/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    getClient((err, db) => {
        if(err) return res.status(500).send(err);
        // updateOne({1}, {2}, cb)
        // {1} => A quién quiero actualizar
        // {2} => Qué quiero modificar
        // cb => Callback
        db.collection('us_stuff').updateOne(
            { _id: new ObjectId(id)}, 
            { $set: { name } },
            (err, result) => {
                if(err) return res.status(500).send(err);
                return res.send(result);
            }
        );
    });
});

router.delete('/us/:id', (req, res) => {
    // Me conecto
    const id = req.params;
    getClient((err, db) => {
        if (err) return res.status(500).send(err);
        db.collection('us_stuff').deleteOne({
            _id: new ObjectId(id)
        }, (err, result) =>{
            if(err) return res.status(500).send(err);
            return res.send(result);
        });
    });
});

module.exports = router
