const { Department, Role, Employee } = require("./Models");

const sequelize = require("./connection");

const inquirer = require("inquirer");

sequelize.sync({ force: false }).then(() => {
    options();
});