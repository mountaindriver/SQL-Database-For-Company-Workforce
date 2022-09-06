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
            db.promise().query(`ALTER TABLE department ADD ${data.title}`).then((res)=> console.table(res))

            db.promise().query(`ALTER TABLE department ADD ${data.title}`);
            console.log('New department added');
            console.table();
            employeeTracker();
        })
};

module.export = {addDepartment}