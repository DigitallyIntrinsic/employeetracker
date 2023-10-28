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

//   View all departments
  const viewAllDepartments = () => {
    var departments = Department.findAll({ raw: true }).then((data) => {
      console.table(data);
      options();
    });
  };

//   View all roles
const viewAllRoles = () => {
    var roles = Role.findAll({
      raw: true,
      include: [{ model: Department }],
    }).then((data) => {
      console.table(
        data.map((role) => {
          return {
            id: role.id,
            title: role.title,
            salary: role.salary,
            department: role["Department.name"],
          };
        })
      );
      options();
    });
  };

  // View all employees
const viewAllEmployees = () => {
    var employees = Employee.findAll({
      raw: true,
      include: [{ model: Role, include: [{ model: Department }] }],
    }).then((data) => {
      const employeeLookup = {};
      for (var i = 0; i < data.length; i++) {
        const employee = data[i];
        employeeLookup[employee.id] =
          employee.first_name + " " + employee.last_name;
      }
      console.table(
        data.map((employee) => {
          return {
            id: employee.id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            title: employee["Role.title"],
            department: employee["Role.Department.name"],
            salary: employee["Role.salary"],
            manager: employeeLookup[employee.manager_id],
          };
        })
      );
      options();
    });
  };

  // Add department
const addDepartment = () => {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What would you like to name the department?",
          name: "addDepartment",
        },
      ])
      .then((answer) => {
        Department.create({ name: answer.addDepartment }).then((data) => {
          options();
        });
      });
  };

  // Add role
const addRole = async () => {
    let departments = await Department.findAll({
      attributes: [
        ["id", "value"],
        ["name", "name"],
      ],
    });
    departments = departments.map((department) =>
      department.get({ plain: true })
    )
    