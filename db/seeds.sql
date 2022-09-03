INSERT INTO dempartments (name)
VALUES  ("Sales"),
        ("Accounting"),
        ("Wed Development");

INSERT INTO role (title, salary, department_id)
VALUES  ("Saleman", "$80000", 1),
        ("Accountant", "$100000", 2),
        ("Full Stack Developer", "$120000", 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ("Griffin", "The best boy", 1, 1),
        ("Maisy", "The Intense Girl", 2, 2),
        ("Lucas", "Freigenberg", 3, 3);