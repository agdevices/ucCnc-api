const { ObjectId } = require('mongodb');
const express = require('express')
const router = express.Router()
const getClient = require('../db/mongodb');


router.get('/menu', (req, res) => {
    getClient((err, db) => {
        if (err) return res.send(err)
        db.collection('menu_items').find().toArray((err, result) => {
            if (err) return res.send(err)
            console.log(result)
            return res.send(result)
            
        })
    })
})

router.post('/menu', (req, res) => {
    // console.log(req.body)
    const ar = []
    ar.push(req.body);
    // req.body.created = new Date()

    getClient((err, db) => {
        if (err) return res.send(err)
        db.collection('menu_items').insertMany(ar, (err, result) => {
            if (err) return res.send(err)
            return res.send(result)
        })
    })
})

router.patch('/menu/:id', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    getClient((err, db) => {
        if(err) return res.status(500).send(err);
        // updateOne({1}, {2}, cb)
        // {1} => A quién quiero actualizar
        // {2} => Qué quiero modificar
        // cb => Callback
        db.collection('menu_items').updateOne(
            { _id: new ObjectId(id)}, 
            { $set: { content } },
            (err, result) => {
                if(err) return res.status(500).send(err);
                return res.send(result);
            }
        );
    });
});

router.delete('/menu/:id', (req, res) => {
    // Me conecto
    const id = req.params;
    getClient((err, db) => {
        if (err) return res.status(500).send(err);
        db.collection('menu_items').deleteOne({
            _id: new ObjectId(id)
        }, (err, result) =>{
            if(err) return res.status(500).send(err);
            return res.send(result);
        });
    });
});



module.exports = router;
