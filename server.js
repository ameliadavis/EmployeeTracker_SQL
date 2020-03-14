var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
const inquirer = require("inquirer");

var app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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

//==========================================
//prompts
//==========================================

function prompts(){
    inquirer
        .prompt([
            {
                type: "List",
                message: " What would you like to do?",
                choices: ["Add departments, roles, employees", "View departments, roles, employees","Update employee roles", "Exit"],
                name: "What"
            }
        ])
        .then (function(response){
            console.log(response);
            switch(response.what){
                case "Add departments, roles, employees":
                    addDepartments(response.what)
                    break;
                case "View departments, roles, employees":
                    // function to come
                    break;
                case "Update employee roles":
                    // function to come
                    break;
                case "Exit":
                    console.log("All Done!")
                    //function??
                    return "All Done!";
            }
        })
}

function addDepartments(){
    connection.query("SELECT * FROM ?" ,[req.params.id], function(err, data){
        if(err) throw err;
        console.table([
            {
                // information from table to print to console
            }
        ])
    });
}




// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });