const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'company_db'
    },
    console.log('Connected to the company_db database')
);
// this is the original prompt
function promptUser() {
inquirer
  .prompt([
    {
      type: 'list',
      name: 'menuChoice',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'Add employee',
        'Update employee role',
        'View all roles',
        'Add role',
        'View all departments',
        'Add department'
      ],
    },

  ])
  .then((answers) => {
    const {menuChoice} = answers;
    if (menuChoice === 'View all employees') {
       getAllEmployees();

    } else if (menuChoice === 'Add employee') {
        addEmployeesPrompt();

    } else if (menuChoice === 'Update employee role') {
        updateEmployeeRolePrompt();

    } else if (menuChoice === 'View all roles') {
        getAllRoles();

    } else if (menuChoice === 'Add role') {
        addRolePrompt();

    } else if (menuChoice === 'View all departments') {
        allDepartments();

    } else {
        addDepartmentPrompt();
    }
  })
};
// This function is the prompts required for the employee fields
function addEmployeesPrompt() {
    inquirer
    .prompt([
        {
            type: 'input',
            name:'first_name',
            message:'Whats the first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Whats is the last name?'
        },
        {
            type:'input',
            name:'role_id',
            message: 'What is the role id?'
        }
    ]) .then((answers) => {
        let firstName = answers.first_name;
        let lastName = answers.last_name;
        let roleId = answers.role_id;
        addEmployee(firstName, lastName, roleId);
    })
}
//this is the prompt to get all the fields required to update the employee role
function updateEmployeeRolePrompt() {
    inquirer
    .prompt([
        {
            type: 'input',
            name:'role_id',
            message:'What is the new role_id?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Whats is the employees id?'
        },
    ]) .then((answers) => {
        let newRole = answers.role_id;
        let employId = answers.id;
        updateEmployeeRole(newRole, employId);
    })
}
//this is the prompt to add a new role 
function addRolePrompt() {
    inquirer
    .prompt([
        {
            type: 'input',
            name:'title',
            message:'What is the new role title?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Whats is the department id?'
        },
        {
            type:'input',
            name: 'salary',
            message: 'What is the salary for the role?'
        }
    ]) .then((answers) => {
        let title = answers.title;
        let salary = answers.salary;
        let departmentId = answers.id 
        addRole(title, salary, departmentId);
    })
}

//this is the prompt for the ad department function
function addDepartmentPrompt() {
    inquirer
    .prompt([
        {
            type: 'input',
            name:'name',
            message:'What is the new department name?'
        },
    ]) .then((answers) => {
        let name = answers.name;
        addDepartment(name);
    })
}

//this function gets all employees then restarts the original prompt
function getAllEmployees() {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id', (err, results) => {
        if (err) {
            console.log(err);
          } 
          console.table(results);  
          promptUser();
    });
  };

  // this function adds an employee and restarts original prompt
  function addEmployee(firstName, lastName, id) {
    db.query('INSERT INTO employee (first_name, last_name, role_id)Values (?,?,?);',[firstName, lastName, id], (err, results) => {
        if (err) {
            console.log(err);
          }
          console.log(`${firstName} ${lastName} has been added to the database with the role id of ${id}.`)
          promptUser(); 
    })
  };

// this function updates an employees role
function updateEmployeeRole(newRole,employId) {
    db.query('UPDATE employee SET role_id = ? WHERE id = ?;',[newRole, employId], (err, results) => {
        if (err) {
            console.log(err);
          }
          console.log(`The role of the employee with the id of ${employId} has been changed to ${newRole}.`);
          promptUser(); 
    })
  };

  //this function gets all the roles 
  function getAllRoles() {
    db.query('SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id', (err, results) => {
        if (err) {
            console.log(err);
          } 
          console.table(results);  
          promptUser();
    });
  };

  //this function is going to add a new role 
  function addRole(title, salary, departmentId) {
    db.query('INSERT INTO role (title, salary,  department_id)Values (?,?,?);',[title, salary, departmentId], (err, results) => {
        if (err) {
            console.log(err);
          }
          console.log(`${title} role in the ${departmentId} id has been added to the database with the salary of $${salary}.`)
          promptUser(); 
    })
  };

  //this function views all departments
  function allDepartments() {
    db.query('SELECT * FROM department;', (err, results) => {
        if (err) {
            console.log(err);
          } 
          console.table(results);  
          promptUser();
    });
  };

  //this function adds a new department 
  function addDepartment(name) {
    db.query('INSERT INTO department (name)Values (?);',[name], (err, results) => {
        if (err) {
            console.log(err);
          }
          console.log(`The ${name} department has been added to the database.`)
          promptUser(); 
    })
  };
// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  promptUser();