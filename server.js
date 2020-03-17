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
  database: "employees_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  prompts();
});

//==========================================
//prompts
//==========================================

function prompts(){
    inquirer
        .prompt([
            {
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices:  [
                    "View All Employees", 
                    "View All Employees by Department",
                    "View All Employees by Manager",
                    "Add Employee",
                    "Remove Employees",
                    "Update Employee Manager",
                    "Update Employee Role", 
                    "Exit"
                ]
            }
        ])
        .then (function(response){
            //console.log(response);
            switch(response.action){
                case "View All Employees":
                    // viewAllEmployees(response.Action)
                    viewAllEmployees();
                    break;
                case "View All Employees by Department":
                    // function to come
                    break;
                case "View All Employees by Manager":
                    // function to come
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Remove Employees":
                    // function to come 
                    break;
                case "Update Employee Manager":
                    // function to come
                    break;
                case "Update Employee Role":
                    //function to come
                    break;
                case "Exit":
                    console.log("All Done!")
                    //function??
                    return "All Done!";
            }
        })
}

function  viewAllEmployees(){
    console.log("in View All Employees")
    connection.query(
        //"SELECT id, first_name, last_name FROM employee",
        "SELECT first_name, last_name, title, salary, department_id FROM employee CROSS JOIN _role",
        function(err,res){
        if(err) throw err;
        console.log(JSON.stringify(res, null, 2));
        //var values = (JSON.stringify(res))
        //console.table(values);
    });
}

function addEmployee(){
    console.log ("Create New employee")
     var newEmployee = inquirer
    .prompt([{
        name: "employee_firstname",
        type: "input",
        message: "Employee first name" 
    },
    {
        name: "employee_lastname",
        type: "input",
        message: "Employee last name"
    },
    {
        name:"employee role", 
        type: "list",
        choices:"[sales manager, sales lead, Human resources, accountant]", // pull from pre-esisting choices
        message:"What is the employees role"
    },
    {
        name: "Employee manager",
        type: "list",
        choices: "[sara, john, kelly]",/// how to pull from manager list?? 
        message: "Which manager? "
    }
    ])
    query();
    //console.log(res);
      function query (){ connection.query(
        "INSERT INTO employee SET ?", JSON.parse(newEmployee), 
        function(err,res){
            if(err) throw err;
            console.log()
          });
        }
    }



// Start our server so that it can begin listening to client requests.
// app.listen(PORT, function() {
//     // Log (server-side) when our server has started
//     console.log("Server listening on: http://localhost:" + PORT);
//   });
// prompts();