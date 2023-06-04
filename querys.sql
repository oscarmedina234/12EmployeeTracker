--get all employess--
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary
FROM employee 
JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id

--add employee--
INSERT INTO employee (first_name, last_name, role_id)
Values ();

--update employee role--
UPDATE employee
SET role_id = ?
WHERE id = ?

--view all roles--
SELECT role.id, role.title, role.salary, department.name
FROM role
JOIN department ON role.department_id = department.id

--add role--
INSERT INTO role (title, salary,  department_id)
VALUES ();

--view all departments--
SELECT * FROM departments;

--add department--

INSERT INTO department (name)
VALUES ();