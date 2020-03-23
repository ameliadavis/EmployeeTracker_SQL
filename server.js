var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

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
                    allEmployeeData();
                    //viewAllEmployees();
                    break;
                case "View All Employees by Department":
                    viewDepartment();
                    break;
                case "View All Employees by Manager":
                    employeesByManager();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Remove Employees":
                    removeEmployee();
                    break;
                case "Update Employee Manager":
                    // function to come
                    break;
                case "Update Employee Role":
                    addRoleEmployee();
                    break;
                case "Exit":
                    console.log("All Done!")
                    connection.end();
            }
        })
}

function viewDepartment(){
    console.log("View Department")
    connection.query(
        "SELECT department_name, id FROM department",
        function(err,res){
            if(err) throw err;
            var departments = res
             var departmentsMap = departments.map(({department_name, id})=>({name: department_name, value: id})) 
            //var departments = JSON.stringify(res, null, 2);
            console.log("departments "+ departments);
            console.log("departmentsMap "+ departmentsMap);
            employeeDepartment(departmentsMap)
        }
    )
}


function employeeDepartment(departments){
   // var departments = JSON.parse(departments).map();
    console.log(departments)
    inquirer.prompt({
        name: "employee_department_filter",
        type: "list",
        message: "Which Department would you like to see?", 
        choices: departments
    }).then(function (res, err){
        var query = res.employee_department_filter
        console.log(query)
            connection.query(
                //"SELECT employee.role_id, first_name, last_name, _role.title, _role.salary, department_name  FROM employee  LEFT JOIN _role ON employee.role_id = _role.id LEFT JOIN department ON _role.department_id = ? ORDER BY department_name",
                "SELECT employee.role_id, first_name, last_name, _role.title, _role.salary, department_name FROM employee  LEFT JOIN _role ON employee.role_id = _role.id LEFT JOIN department ON _role.department_id = department.id WHERE _role.department_id = ? ORDER BY department_name",
                query,
                function(err,res){
                    if(err) throw err;
                   console.log(res);
                   prompts();
                }
            )}
        )
    }

function employeesByManager(){
    console.log("employees by manager")
    connection.query(
        "SELECT manager_id FROM employee",
        function(err,res){
            if(err) throw err; 
            var managerID = JSON.stringify(res, null, 2);
            console.log("manager ID" + managerID );
            sortEmployeesByManagers(managerID)
        }
    )
}

function sortEmployeesByManagers(managerID){
    consosle.log("sortEmployees by manager")
        var managerID = JSON.stringify(managerID);
        inquirer.prompt({
            name: "employee_manager_filter",
            type: "list",
            message: "Which Manger would you like to sort by?", 
            choices: managerID
        }).then(function (res, err){
            var query = res
                connection.query(
                    "SELECT employee.role_id, first_name, last_name, _role.title, _role.salary, department_name  FROM employee  LEFT JOIN _role ON employee.role_id = _role.id LEFT JOIN department ON _role.department_id = ", query, "ORDER BY department_name",
                    // change this select to a filter function for manager based on employee only
                    function(err,res){
                        if(err) throw err;
                       console.log(res);
                    }
                )}
        )}


 function allEmployeeData(){
    connection.query(
        "SELECT employee.role_id, first_name, last_name, _role.title, _role.salary, department_name  FROM employee  LEFT JOIN _role ON employee.role_id = _role.id LEFT JOIN department ON _role.department_id = department.id ORDER BY first_name",
        function(err,res){
            if(err) throw err;
           //console.log(res);
           var values = [res]
           console.table(values[0], values.slice(1));
           prompts()
        }
    )
 }

function addEmployee(){
    var roleChoices= [];
    var managerChoices= [];
    connection.query(
        "SELECT id, title FROM _role",
        function(err,res){
            if(err)throw err;
            roleChoices =  res.map(({id, title})=>({name: title, value:id}))
            console.log("role Choices res" + roleChoices);
                connection.query(
                    "SELECT employee.id, first_name, last_name FROM employees_db.employee LEFT JOIN _role ON employee.role_id = _role.id WHERE employee.id IN (SELECT EMP.manager_id FROM employee AS EMP)", 
                    function(err,res){
                        if(err)throw err;
                        managerChoices =  res.map(({id, first_name, last_name})=>({name: `${first_name} ${last_name}`, value:id}))
                        console.log("managerchoices res" + res);
                        inquirer
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
                                name:"role_id", 
                                type: "list",
                                choices: roleChoices,
                                message:"What is the employees role"
                            },
                            {
                                name: "manager_id",
                                type: "list",
                                choices: managerChoices,
                                message: "Which manager? "
                            }
                                ]).then(function(response, err){
                                    console.log(response);
                                    if(err) throw err; 
                                    connection.query(
                                        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                                        [response.employee_firstname,
                                        response.employee_lastname,
                                        response.role_id, 
                                        response.manager_id],
                                        function(err,res){
                                            if(err) throw err;
                                            //console.log(res.affectedRows + " successfully added!\n")
                                            prompt();
                                        }) 
                                    }) 
                    }
                )
        }
    )
    
    console.log("roleChoices" + roleChoices)
    console.log("managerChoices"+ managerChoices)
    console.log ("Create New employee")
    // var newEmployee = inquirer
    
    }

function removeEmployee (){
    console.log("remove employee")
    connection.query(
        "SELECT id, first_name, last_name FROM employee",
        function(err,res){
            if(err) throw err; 
            var employeeslist = res.map(({id, first_name, last_name})=>({name: `${first_name} ${last_name}`, value:id}))
            console.log("list of employees by name" + employeeslist );
            removeEmployeActual(employeeslist)
        }
    )
}

function removeEmployeActual (employeeslist){
    console.log("remove employee" + employeeslist)
    inquirer.prompt({
        name: "employee_Remove",
        type: "list",
        message: "Which employee would you like to remove?", 
        choices: employeeslist
   }).then(function (res, err){
        var query = res.employee_Remove;
            connection.query(
                "DELETE FROM employee WHERE id = ?",  
                query, 
                // change this select to a filter function for manager based on employee only
                function(err,res){
                    if(err) throw err;
                   console.log(res);
                   prompts();
                }
            )}
   )}


 function addRoleEmployee() {
    var roleChoices= [];
    var employeeChoices= [];
    connection.query(
        "SELECT id, title FROM _role",
        function(err,res){
            if(err)throw err;
            roleChoices =  res.map(({id, title})=>({name: title, value:id}))
            console.log("role Choices res" + roleChoices);
                connection.query(
                    "SELECT employee.id, first_name, last_name FROM employees_db.employee", 
                    function(err,res){
                        if(err)throw err;
                        employeeChoices =  res.map(({id, first_name, last_name})=>({name: `${first_name} ${last_name}`, value:id}))
                        console.log("employeechoices res" + res);
                        inquirer
                            .prompt([
                            {
                                name:"Employee_id", 
                                type: "list",
                                choices: employeeChoices,
                                message:"Which employee do you want to update"
                            },
                            {
                                name: "role_id",
                                type: "list",
                                choices: roleChoices,
                                message: "Which role do you want to use? "
                            }
                                ]).then(function(response, err){
                                    console.log(response);
                                    if(err) throw err; 
                                    connection.query(
                                        "UPDATE employee SET role_id = ? WHERE id = ?",
                                        [response.role_id, 
                                        response.Employee_id],
                                        function(err,res){
                                            if(err) throw err;
                                            //console.log(res.affectedRows + " successfully added!\n")
                                        }) 
                                    }) 
                    }
                )
        }
    )
    prompts();
}

// function searchManager(){

// }

