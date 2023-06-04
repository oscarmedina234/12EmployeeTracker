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
('Layer', 100000, 5);

INSERT INTO employee (first_name, last_name,role_id, manager_id)
Values ('Finn', 'The Human'5,6),
('Marceline', 'The Vampire Queen',4, null),
('Princess', 'Bubblegum',6,null),
('Jake', 'The Dog',3 ,4 ),
('B', 'Mo', 9, null),
('Ice', 'King', 10, 9 ),
('Lumpy', 'Space Princess', 1,2 ),
('Lady', 'Rainicorn',2 , null ),
('Flame', 'Princess', 7, null ),
('Earl', 'Of Lemongrab', 8, 7 );
