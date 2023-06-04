const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

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
        console.log('View all employess');

    } else if (menuChoice === 'Add employees') {
        console.log('Add employee');

    } else if (menuChoice === 'Update employee role') {
        console.log('Update employee role');

    } else if (menuChoice === 'View all roles') {
        console.log('View all roles');

    } else if (menuChoice === 'Add role') {
        console,log('Add role');

    } else if (menuChoice === 'View all departments') {
        console,log('View all department');

    } else {
        console,log('Add department');
    }
  };
   
  );
};

  function getAllEmployees() {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id', (err, results) => {
        if (err) {
            console.log(err);
          } else {
            return console.table(results);  
          }
    });
  };

  function addEmployee(addEmployeeQuery) {
    db.query(addEmployeeQuery, (err, results) => {
        if (err) {
            console.log(err);
          }
          console.table(results);  
    })
  };

  promptUser();