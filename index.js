const { Department, Role, Employee } = require("./Models");

const sequelize = require("./connection");

const inquirer = require("inquirer");

sequelize.sync({ force: false }).then(() => {
    options();
});

function options() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to do?",
          choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
          ],
          name: "employeeTracker",
        },
      ])
    .then((answer) => {
        if (answer.employeeTracker === "View All Departments") {
          viewAllDepartments();
        } else if (answer.employeeTracker === "View All Roles") {
          viewAllRoles();
        } else if (answer.employeeTracker === "View All Employees") {
          viewAllEmployees();
        } else if (answer.employeeTracker === "Add Department") {
          addDepartment();
        } else if (answer.employeeTracker === "Add Role") {
          addRole();
        } else if (answer.employeeTracker === "Add Employee") {
          addEmployee();
        } else {
          updateEmployeeRole();
        }
      });
  }

  const viewAllDepartments = () => {
    var departments = Department.findAll({ raw: true }).then((data) => {
      console.table(data);
      options();
    });
  };
  