const inquirer = require('inquirer');
inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer))


inquirer
    .prompt(
        {
            type: 'list',
            message: 'Hello, what would you like to do?',
            name: 'type',
            choices: [`View All Employees`, `Add An Employee`, `Update An Employee Role`, `View All Roles`, `Add A Role`, `View all Departments`, `Add A Department`, `Quit`],
        },
    )
    .then((data)=>{

    })