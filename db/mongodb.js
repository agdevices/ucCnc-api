const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

// const url = 'mongodb://localhost:27017'

const url = `mongodb+srv://agdevices:Orion4923@cluster0.gohnb.mongodb.net/ucutcnc?retryWrites=true&w=majority`


function getDBClient (callback){
    MongoClient.connect(url, (err, client) => {
        if(err) callback(err, undefined)
        console.log('Conectado a la DB')
        const db = client.db('ucutcnc')
        return callback(undefined, db)
    })
}

module.exports = getDBClient;