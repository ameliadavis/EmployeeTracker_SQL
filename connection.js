var mysql = require("mysql");

//implement
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "LoveCalvin22!!!",
    database: ""
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

module.exports = connection;