const Department = require("./department.js")
const Role = require("./role.js");
const Employee = require("./employee.js");

// This file creates relationships between specific tables so that they can be joined in the index.js file in the root directory

Role.belongsTo(Department, {
  foreignKey: "department_id",
  onDelete: "CASCADE",
});

Department.hasMany(Role, {
  foreignKey: "department_id",
  onDelete: "CASCADE",
});

Employee.belongsTo(Role, {
  foreignKey: "role_id",
  onDelete: "CASCADE",
});

Role.hasOne(Employee, {
  foreignKey: "role_id",
  onDelete: "CASCADE",
});

Employee.hasOne(Employee, {
  foreignKey: "manager_id",
  onDelete: "CASCADE",
});

module.exports = { Department, Role, Employee }