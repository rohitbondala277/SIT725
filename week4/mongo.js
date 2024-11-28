var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://rebel:rebel123@cluster0.gxw5v.mongodb.net/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});