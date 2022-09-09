const db = require('../connection/connection')


const addEmployee = () => {
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
                }, {
                    name: "Sales lead",
                    value: 1,
                },
                {
                    name: 'Lead Engineer',
                    value: 3,
                }, {
                    name: "Software Engineer",
                    value: 4,
                },
                {
                    name: 'Account Manager',
                    value: 5,
                }, {
                    name: "Accountant",
                    value: 6,
                },
                {
                    name: 'Legal Team Lead',
                    value: 7,
                },
                {
                    name: 'Lawyer',
                    value: 8,
                },
            ]
        },
        {
            name: 'manager_id',
            type: 'input',
            message: 'Who is their manager?',
            choices: [
                {
                    name: "No one",
                    value: null,
                },
                {
                    name: "John Doe",
                    value: 1,
                },
                {
                    name: "Asheley Rodriguez",
                    value: 3,
                },
                {
                    name: "Kunal Singh",
                    value: 5,
                },
                {
                    name: "Sarah Lourd",
                    value: 7,
                },
            ]
        },
    ])
        .then((data) => {
            db.query(`ALTER TABLE employee ADD ${data.first_name} ${data.last_name} ${data.role_id} ${data.manager_id}`);
            console.log('New employee added');
            console.table();
            employeeTracker();
        })
}

const updateEmployee = () => {
    inquirer
        .promt(
            {
                name: "employee.id",
                type: "input",
                message: "What is thier employee id?"
            },
            {
                name: "first_name",
                type: "input",
                message: "What is thier first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is thier last name?"
            },
            {
                name: "role_id",
                type: "input",
                message: "What is thier role?",
                choices: [
                    {
                        name: "Sales lead",
                        value: 1,
                    },
                    {
                        name: 'Salesperson',
                        value: 2,
                    },
                    {
                        name: "Sales lead",
                        value: 1,
                    },
                    {
                        name: 'Lead Engineer',
                        value: 3,
                    },
                    {
                        name: "Software Engineer",
                        value: 4,
                    },
                    {
                        name: 'Account Manager',
                        value: 5,
                    },
                    {
                        name: "Accountant",
                        value: 6,
                    },
                    {
                        name: 'Legal Team Lead',
                        value: 7,
                    },
                    {
                        name: 'Lawyer',
                        value: 8,
                    },
                ],
            }, {
            name: 'manager_id',
            type: 'input',
            message: 'Who is their manager?',
            choices: [
                {
                    name: "No one",
                    value: null,
                },
                {
                    name: "Sales lead",
                    value: 1,
                },
                {
                    name: "Lead Engineer",
                    value: 3,
                },
                {
                    name: "Account Manager",
                    value: 5,
                },
                {
                    name: "Legal Team Lead",
                    value: 7,
                },
            ]
        },

        )
        .then((data) => {
            db.promise().query("ALTER TABLE employee ${first_name} ${last_name} ${role_id} ${manager_id}");
            console.log('Employee updated!');
            console.table();
            employeeTracker();
        })
};


const viewEmployee = ()=>{
   return db.promise().query('SELECT * FROM employee;');
}

module.exports = { addEmployee, updateEmployee, viewEmployee }