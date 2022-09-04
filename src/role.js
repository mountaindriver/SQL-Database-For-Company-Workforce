
const addRole = function () {
    inquirer
        .prompt([
            {
                name: "title",
                type: 'input',
                message: "What is the job title?"
            },
            {
                name: 'salary',
                type: "input",
                message: 'What is the salary',
            },
            {
                name: 'department_id',
                type: "list",
                message: 'Which department is it in?',
                choices: [
                    {
                        name: 'Sales',
                        value: 1,
                    },
                    {
                        name: 'Engineering',
                        value: 2,
                    },
                    {
                        name: 'Finance',
                        value: 3,
                    },
                    {
                        name: 'Legal',
                        value: 4,
                    },
                ]
            }
        ])
        .then((data) => {
            db.promise().query(`ALTER TABLE role ADD ${data.title} ${data.salary} ${data.department_id}`);
            console.log('New role added');
            console.table();
            employeeTracker();
        })
};

module.exports = {addRole}