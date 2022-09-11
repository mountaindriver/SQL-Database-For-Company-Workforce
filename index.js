// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

// Connection to SQL(database)
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: `MbU<2xumqL`,
        database: 'company_db'
    },
);

db.connect(function (err) {
    if (err) throw err;
    employeeTracker();
});


// main function that shows list of options to client
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
                    viewEmployee();
                    break;

                case `Add An Employee`:
                    addEmployee();
                    break;

                case `Update An Employee Role`:
                    updateEmployee();
                    break;

                case `View All Roles`:
                    viewRole();
                    break;

                case `Add A Role`:
                    addRole();
                    break;

                case `View all Departments`:
                    viewDepartment();
                    break;

                case `Add A Department`:
                    addDepartment();
                    break;

                case `Quit`:
                    console.log("Goodbye");
                    process.exit();
            }
        })
};

// List of function used in employee tracker, listed in the same order as displayed in app
const addEmployee = () => {
    // arrays the options are stored into
    let employeeARR = [];
    let roleARR = [];

    // gets list of employees and put it into employeeARR
    db.query(`SELECT * FROM employee`, (err, res) => {
        if (err) {
            console.error(err);
        }


        for (let i = 0; i < res.length; i++) {
            let employee = res[i];
            let employeeId = employee.id;
            let employeeName = employee.first_name + " " + employee.last_name;

            let obj = {
                name: employeeName, value: employeeId
            };

            employeeARR.push(obj);

        }

        // gets list of roles and put it into roleeARR
        db.query(`SELECT * FROM role`, (err, res) => {
            if (err) {
                console.error(err);
            }

            for (let i = 0; i < res.length; i++) {
                let role = res[i];
                let roleId = role.id;
                let roleTitle = role.title;

                let obj = {
                    name: roleTitle, value: roleId
                };

                roleARR.push(obj);

            }
        })
        // asks question to client and gathers data
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
                choices: roleARR,
            },
            {
                name: 'manager_id',
                type: 'list',
                message: 'Who is their manager?',
                choices: employeeARR,
            },
        ])

            // Takes data and insert it into the database
            .then((data) => {
                db.query(`INSERT INTO employee SET ?`, data, (err, res) => {
                    if (err) {
                        console.error(err);
                    }
                    console.log(`Added employee`)
                    employeeTracker();
                });
            })
    })
}

const updateEmployee = () => {
    db.query(`select CONCAT(first_name," ",last_name) AS name, id as value from employee`, (err, res) => {

        let roleARR = [];
        let employeeARR = [];

        db.query(`SELECT * FROM employee`, (err, res) => {
            if (err) {
                console.error(err);
            }


            for (let i = 0; i < res.length; i++) {
                let employee = res[i];
                let employeeId = employee.id;
                let employeeName = employee.first_name + " " + employee.last_name;

                let obj = {
                    name: employeeName, value: employeeId
                };

                employeeARR.push(obj);
            }
        })

        db.query(`SELECT * FROM role`, (err, res) => {
            if (err) {
                console.error(err);
            }

            for (let i = 0; i < res.length; i++) {
                let role = res[i];
                let roleId = role.id;
                let roleTitle = role.title;

                let obj = {
                    name: roleTitle, value: roleId
                };

                roleARR.push(obj);

            }
        })

        inquirer
            .prompt([

                {
                    name: 'employee_id',
                    type: 'list',
                    message: 'Who are you updating?',
                    choices: employeeARR,
                },
                {
                    name: "role_id",
                    type: "list",
                    message: "What is thier role?",
                    choices: roleARR,
                },
            ])
            .then((data) => {
                db.query(`UPDATE employee SET role_id=? where id=?`, [data.role_id, data.employee_id], (err, res) => {
                    if (err) {
                        throw err;
                    }
                    console.log(`Updated employee!`)
                })
                employeeTracker();
            })
})
};

const viewEmployee = () => {
    db.query(`SELECT employee.first_name, employee.last_name, role.salary, departments.title, manager.first_name AS manager
     FROM employee 
     LEFT JOIN employee manager ON employee.manager_id=manager.id
     LEFT JOIN role ON employee.role_id=role.id
     LEFT JOIN departments ON role.department_id=departments.id;`, (err, res) => {
        console.table(res);
        employeeTracker();
    })
};

const addRole = () => {

    db.query(`SELECT * FROM departments`, (err, res) => {
        if (err) {
            console.error(err);
        };

        let departmentARR = [];

        for (let i = 0; i < res.length; i++) {
            let department = res[i];
            let departmentId = department.id;
            let departmentTitle = department.title;

            let obj = {
                name: departmentTitle, value: departmentId
            };

            departmentARR.push(obj);
        };

        inquirer.prompt([
            {
                name: 'role_title',
                type: "input",
                message: "What is the new Role?",
            },
            {
                name: 'role_salary',
                type: 'input',
                message: "What is the salary of the role?"
            },
            {
                name: 'role_department',
                type: 'list',
                message: "Which department is it in?",
                choices: departmentARR,
            }
        ])
            .then((data) => {
                console.log(data)
                db.query(`INSERT INTO role SET ?`, data, (err, res) => {
                    if (err) {
                        console.error(err);
                    }
                    console.log(`Added Role`)
                    employeeTracker();
                });
            })
    })
};

const viewRole = () => {
    db.query(`SELECT 
    role.title, role.salary, departments.title 
    AS Department 
    FROM role
    JOIN departments ON role.department_id=departments.id;`, (err, res) => {
        if (err) {
            console.error(err);
        }
        console.table(res);
        employeeTracker();
    });
};

const addDepartment = () => {

    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: 'What is the name of the new department?'
            },
        ])
        .then((data) => {
            db.promise().query(`INSERT INTO departments SET ?`, data, (err, res) => {
                if (err) {
                    console.error(err);
                }
            })
            console.log('New department added');
            employeeTracker();
        })
};

const viewDepartment = () => {
    db.query(`SELECT * FROM departments`, (err, res) => {
        console.table(res);
        employeeTracker();
    });
};