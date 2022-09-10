const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

const db = require('./connection/connection.js')
const {addDepartment, viewDepartment} = require("./src/department");
const {addEmployee, updateEmployee, viewEmployee} = require("./src/employee");
const {addRole, viewRole} = require('./src/role');


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
                    addEmployee().then((a)=>{
                        console.table(a)
                        employeeTracker()
                    })
                    break;

                case `Update An Employee Role`:
                    updateEmployee().then((a)=>{
                        console.table(a)
                        employeeTracker()
                    })
                    break;

                case `View All Roles`:
                    viewRole().then((a)=>{
                        console.table(a)
                        employeeTracker()
                    })
                    break;

                case `Add A Role`:
                    addRole().then((a)=>{
                        console.table(a)
                        employeeTracker()
                    })
                    break;

                case `View all Departments`:
                    viewDepartment().then((a)=>{
                        console.table(a)
                        employeeTracker()
                    })
                    break;

                case `Add A Department`:
                    addDepartment().then((a)=>{
                        console.table(a)
                        employeeTracker()
                    })
                    break;

                case `Quit`:
                    console.log("Goodbye");
                    return
            }
        })
};


employeeTracker();
                    

