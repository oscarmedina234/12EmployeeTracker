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

    } else if (menuChoice === 'Add employees') {
        
        promptUser();

    } else if (menuChoice === 'Update employee role') {
        console.log('Update employee role');
        promptUser();

    } else if (menuChoice === 'View all roles') {
        console.log('View all roles');
        promptUser();

    } else if (menuChoice === 'Add role') {
        console.log('Add role');
        promptUser();

    } else if (menuChoice === 'View all departments') {
        console.log('View all department');
        promptUser();

    } else {
        console.log('Add department');
        promptUser();
    }
  })
};

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

function getAllEmployees() {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id', (err, results) => {
        if (err) {
            console.log(err);
          } 
          console.table(results);  
          promptUser();
    });
  };

  function addEmployee(firstName, lastName, id) {
    db.query(`INSERT INTO employee (first_name, last_name, role_id)
Values (${firstName},${lastName},${id};`, (err, results) => {
        if (err) {
            console.log(err);
          }
          console.table(results); 
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