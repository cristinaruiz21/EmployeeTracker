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
            type: "input",
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
    ]).then(function(answer) {
        switch (answer.action) {
        case "Add a new department":
          createDepartment();
          break;
  
        case "Add a new role":
          createRole();
          break;
  
        case "Add a new employee":
          createEmployee;
          break;
  
        case "View a department":
          console.table(department);
          break;

        case "View a role":
          console.table(role);
          break;
    
        case "View an employee":
          console.table(employee);
          break;
    
        case "Update employee roles":
          createEmployee;
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
    ]).then(function(answer){
        connection.query(
            "INSERT INTO department (department_name)",
            {
              department_name: answer.departmentName
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
    ]).then(function(answer){
        connection.query(
            "INSERT INTO role (title, salary, department_id)",
            {
              title: answer.roleTitle,
              salary: answer.salary,
              department_id: answer.departmentId || 0
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
    ]).then(function(answer){
        connection.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id",
            {
              first_name: answer.employeeFirstName,
              last_name: answer.employeeLastName,
              role_id: answer.roleId || 0,
              manager_id: answer.managerId || 0
            },
            function(err) {
              if (err) throw err;
              console.log("Your employee was added successfully!");
              start();
            }
          );
        })
}



