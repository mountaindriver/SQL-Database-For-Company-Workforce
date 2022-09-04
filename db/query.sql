-- show roles
SELECT 
role.title, role.salary, departments.title 
AS Department 
FROM role
JOIN departments ON role.department_id=departments.id;

-- show employee
SELECT employee.first_name, employee.last_name, role.salary, departments.title, manager.first_name AS manager
FROM employee 
LEFT JOIN employee manager ON employee.manager_id=manager.id
LEFT JOIN role ON employee.role_id=role.id
LEFT JOIN departments ON role.department_id=departments.id;
