var mysql = require('mysql');

var con = mysql.createConnection({
  host: "mongodb+srv://rebel:rebel123@cluster0.gxw5v.mongodb.net/",
  user: "rebel",
  password: "rebel123"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});