const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
let _db;
const mongoconnect = (callback=>{
         mongoClient.connect("mongodb://localhost:27017/mydb",{ useUnifiedTopology: true })
        .then(client=>{
        console.log('connected');
        _db = client.db();
        callback();
        }).catch(err=>{
            console.log(err);
        })

});

const getdb=()=>{
    if(_db){
        return _db;
    }
    throw 'No db found';
}


exports.mongoconnect = mongoconnect;
exports.getdb = getdb;