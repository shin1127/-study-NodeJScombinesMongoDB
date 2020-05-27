var MongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/";

MongoClient.connect(url, (error, client) => {
  var db = client.db("sample");
  db.collection("products", (error, collection) => {
    collection.find({ name: { $regex: /e/g } }).toArray((error, docs) => {
      for (let doc of docs) {
        console.log(doc.name);
      }
      client.close();
    });
  });
});

// $regex: /e/g は正規表現　eを含むもの
