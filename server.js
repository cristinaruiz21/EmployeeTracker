var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "cristina21",
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
              "Update employee roles",
              "Delete department",
              "Delete role",
              "Delete employee"
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
          updateEmployee();
          break;
        
        case "Delete department":
          deleteDepartment();
          break;
        
        case "Delete role":
          deleteRole();
          break;

        case "Delete employee":
          deleteEmployee();
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
            "INSERT INTO department SET ?",
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
            "INSERT INTO role SET ?",
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
            "INSERT INTO employee SET ?",
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

function updateEmployee(){
  connection.query("SELECT * FROM employee", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].first_name);
            }
            return choiceArray;
          },
          message: "Which employee would you like to update?"
        },
        {
          name: "id",
          type: "input",
          message: "What would you like the new role id to be?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].first_name === answer.choice) {
            chosenItem = results[i];
          }
        }
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                role_id: answer.id
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Employee role id updated successfully!");
              start();
            }
          );
        })
      }
  )}
  
function deleteDepartment(){
  connection.query("SELECT * FROM department", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].department_name);
            }
            return choiceArray;
          },
          message: "Which department would you like to delete?"
        }
      ]).then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].department_name === answer.choice) {
            chosenItem = results[i];
          }
        }
          connection.query(
            "DELETE FROM department WHERE id = ?",
              {
                id: chosenItem.id
              },
              function(err, res) {
                if (err) throw err;
                console.log("Department successfully deleted!");
                start();
              }
          );
        })
      }
  )}

  function deleteRole(){
    connection.query("SELECT * FROM role", function(err, results) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "choice",
            type: "list",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].title);
              }
              return choiceArray;
            },
            message: "Which role would you like to delete?"
          }
        ]).then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].title === answer.choice) {
              chosenItem = results[i];
            }
          }
            connection.query(
              "DELETE FROM role WHERE id = ?",
                {
                  id: chosenItem.id
                },
                function(err, res) {
                  if (err) throw err;
                  console.log("Role successfully deleted!");
                  start();
                }
            );
          })
        }
    )}

    function deleteEmployee(){
      connection.query("SELECT * FROM employee", function(err, results) {
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: "choice",
              type: "list",
              choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].first_name);
                }
                return choiceArray;
              },
              message: "Which employee would you like to delete?"
            }
          ]).then(function(answer) {
            // get the information of the chosen item
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
              if (results[i].first_name === answer.choice) {
                chosenItem = results[i];
              }
            }
              connection.query(
                "DELETE FROM employee WHERE id = ?",
                  {
                    id: chosenItem.id
                  },
                  function(err, res) {
                    if (err) throw err;
                    console.log("Employee successfully deleted!");
                    start();
                  }
              );
            })
          }
      )}
        
      