const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer))

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.SQLPASS,
        database: 'company_db'
    },
    console.log(`Connected to the books_db database.`)
);


const employeeTracker = function () {

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
                    db.promise().query('SELECT * FROM employee;')

                    break;

                case `Add An Employee`:
                    inquirer.prompt([
                        {
                            name: 'first_name',
                            type: 'input',
                            message: 'What is thier first name?',
                        },
                        {
                            name: 'last_name',
                            type: 'input',
                            message: 'What is thier last name?',
                        },
                        {
                            name: 'role_id',
                            type: 'list',
                            message: 'What is thier role?',
                            choices: [
                                {
                                    name: "Sales lead",
                                    value: 1,
                                },
                                {
                                    name: 'Salesperson',
                                    value: 2,
                                },
                            ]
                        },
                        {
                            name: 'manager_id',
                            type: 'input',
                            message: 'What is thier first name?',
                        },
                    ])
                        .then((data) => {
                            db.promise().query(`ALTER TABLE employee ADD ${data.first_name} ${data.last_name} ${data.role_id} ${data.manager_id}`)
                            console.log('New employee added')
                            console.table();
                            employeeTracker();
                        })
                    break;

                case `Update An Employee Role`:
                    db.promise().query("ALTER TABLE employee ${first_name} ${last_name} ${role_id} ${manager_id}")

                    break;

                case `View All Roles`:
                    db.promise().query('SELECT * FROM role JOIN departments ON role.department_id=departments.title;')
                    break;

                case `Add A Role`:
                    db.promise().query(`ALTERN TABLE role ${title} ${salary} ${department_id}`)
                    break;

                case `View all Departments`:
                    db.promise().query('SELECT * FROM departments;')
                    break;

                case `Add A Department`:
                    db.promise().query(`ALTER TABLE departments ADD ${title}`)
                    break;

                case `Quit`:
                    return
            }
        })
};

employeeTracker();