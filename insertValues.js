var MongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/";

MongoClient.connect(url, (error, client) => {
  var db = client.db("sample");
  db.collection("products", (error, collection) => {
    collection.insertMany(
      [
        { name: "pen", price: 120 },
        { name: "note", price: 100 },
      ],
      (error, result) => {
        client.close();
      }
    );
  });
});
