const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

const db = require('./connection/connection.js')
const {addDepartment} = require("./src/department");
const {addEmployee, updateEmployee, viewEmployee} = require("./src/employee");
const {addRole} = require('./src/role');


const employeeTracker = () => {

    inquirer
        .prompt(
            {
                name: 'action',
                type: 'list',
                message: 'Hello, what would you like to do?',
                choices: [
                    `View All Employees`,
                    `Add An Employee`,
                    `Update An Employee Role`,
                    `View All Roles`,
                    `Add A Role`,
                    `View all Departments`,
                    `Add A Department`,
                    `Quit`],
            }
        )
        .then((data) => {
            switch (data.action) {
                case `View All Employees`:
                    viewEmployee().then(([a])=>{
                        console.table(a)
                        employeeTracker()
                    })
                    break;

                case `Add An Employee`:
                    addEmployee();
                    break;

                case `Update An Employee Role`:
                    updateEmployee();
                    break;

                case `View All Roles`:
                    db.promise().query('SELECT * FROM role JOIN departments ON role.department_id=departments.title;');
                    break;

                case `Add A Role`:
                    addRole();
                    break;

                case `View all Departments`:
                    db.promise().query('SELECT * FROM departments;');
                    break;

                case `Add A Department`:
                    addDepartment();
                    break;

                case `Quit`:
                    console.log("Goodbye");
                    return
            }
        })
};


employeeTracker();
                    

