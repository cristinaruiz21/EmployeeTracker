var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Timmy12",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start(){
    inquirer.prompt([
        {
            type: "list",
            name: "startChoices",
            message: "What would you like to do?",
            choices: [
              "Add a new department",
              "Add a new role",
              "Add a new employee",
              "View a department",
              "View a role",
              "View an employee",
              "Update employee roles"
            ]
        }
    ]).then(response => {
        switch (response.startChoices) {
        case "Add a new department":
          createDepartment();
          break;
  
        case "Add a new role":
          createRole();
          break;
  
        case "Add a new employee":
          createEmployee();
          break;
  
        case "View a department":
          viewDepartment();
          break;

        case "View a role":
          viewRole();
          break;
    
        case "View an employee":
          viewEmployee();
          break;
    
        case "Update employee roles":
          createEmployee();
          break;
  
        case "exit":
          connection.end();
          break;
        }
      });
}

function createDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What is the department name?"
        },
    ]).then(function(response){
        connection.query(
            "INSERT INTO department (department_name) VALUES (?)",
            {
              department_name: response.departmentName
            },
            function(err) {
              if (err) throw err;
              console.log("Your department was added successfully!");
              start();
            }
          );
        })
}

function createRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "What is the title of the role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary?"
        },
        {
            type: "input",
            name: "departmentId",
            message: "What is the department id?"
        },
    ]).then(function(response){
        connection.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?)",
            {
              title: response.roleTitle,
              salary: response.salary,
              department_id: response.departmentId || 0
            },
            function(err) {
              if (err) throw err;
              console.log("Your role was added successfully!");
              start();
            }
          );
        })
}


function createEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeFirstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "employeeLastName",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "roleId",
            message: "What is the employee's role id?"
        },
        {
            type: "input",
            name: "managerId",
            message: "What is the manager's id?"
        },
    ]).then(function(response){
        connection.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)",
            {
              first_name: response.employeeFirstName,
              last_name: response.employeeLastName,
              role_id: response.roleId || 0,
              manager_id: response.managerId || 0
            },
            function(err) {
              if (err) throw err;
              console.log("Your employee was added successfully!");
              start();
            }
          );
        })
}

function viewDepartment(){
  connection.query(
    "SELECT * FROM department",
    function(err,res) {
      if (err) throw err;
      console.table(res);
      start();
});
}

function viewRole(){
  connection.query(
    "SELECT * FROM role",
    function(err,res) {
      if (err) throw err;
      console.table(res);
      start();
});
}

function viewEmployee(){
  connection.query(
    "SELECT * FROM employee",
    function(err,res) {
      if (err) throw err;
      console.table(res);
      start();
});
}
