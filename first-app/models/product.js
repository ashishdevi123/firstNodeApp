// const fs = require('fs');
// const path = require('path');

const getdb = require('../util/database').getdb;
var ObjectId = require('mongodb').ObjectId;


// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

const getProductsFromFile = cb => {
  // fs.readFile(p, (err, fileContent) => {
  //   if (err) {
  //     cb([]);
  //   } else {
  //     cb(JSON.parse(fileContent));
  //   }
  // });

  const db = getdb();
 db.collection('Products')
.find()
.toArray()
.then(res=>{
    cb(res);
  }).catch(err=>{
    cb([]);
  });
};

module.exports = class Product {
  constructor(title, price, imgurl, description, id) {
    //this.id = Math.random().toString();
    this.title = title;
    this.price = price;
    this.imgurl = imgurl;
    this.description = description;
    this._id = id;
  }

  save(callback) {
    // getProductsFromFile(products => {
    //   this.id = Math.random().toString();
    //   products.push(this);
    //   fs.writeFile(p, JSON.stringify(products), err => {
    //     console.log(err);
    //   });
    // });
    //console.log(this);
    const db = getdb();
    let me = this;
    db.collection('Products', function (err, collection) {
      let dbOperation;
      if(me._id){
        dbOperation = collection.updateOne({_id: new ObjectId(me._id)}, {$set:me});
      }else{
        dbOperation = collection.insertOne(me)
      }
      dbOperation.then(res=>{
          console.log("res");
          //console.log(res);
          callback();
        }).catch(err=>{
          console.log("err");
          console.log(err);
        });

    });

  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static fetchProductById(id, callback){
    //console.log("in fetch");
    const db = getdb();
    db.collection('Products')
    .find({"_id" : ObjectId(id)})
    .next()
    .then(res=>{
      //console.log(res);
      callback(res);
    })
    .catch(err=>{
      console.log(err);
    })
  }


  static deleteProductById(id,callback){
    const db = getdb();
    db.collection('Products')
    .deleteOne({"_id" : ObjectId(id)})
    .then(res=>{
     // console.log(res);
      callback();
    })
    .catch(err=>{
      console.log(err);
    })
  }
};
