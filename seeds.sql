USE company_db;

INSERT INTO department (name)
VALUES ('Sales'),
        ('Marketing'),
        ('Human Resources'),
        ('Finance'),
        ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 80000, 1),
('Salesperson', 50000, 1),
('Marketing Researcher', 80000, 2),
('Marketing Manager', 100000, 2),
('HR Consultant', 65000, 3),
('HR Manager', 100000, 3),
('Account Manager', 80000, 4),
('Accountant', 65000, 4),
('Legal Team Lead', 75000, 5),
('Lawyer', 100000, 5);

INSERT INTO employee (first_name, last_name, role_id)
Values ('Finn', 'The Human',5),
('Marceline', 'The Vampire Queen',4),
('Princess', 'Bubblegum',6),
('Jake', 'The Dog',3),
('B', 'Mo', 9),
('Ice', 'King', 10),
('Lumpy', 'Space Princess', 1),
('Lady', 'Rainicorn',2),
('Flame', 'Princess', 7),
('Earl', 'Of Lemongrab', 8);


