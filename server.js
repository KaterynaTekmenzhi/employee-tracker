// globals for the server
const inquirer = require('inquirer');
require('console.table');
const db = require('./config/connection');

// import questions from utils/questions.js
const { selectOption } = require('./utils/questions');

// connect to the database
db.connect(err => {
    if (err) throw err;
    console.log('Connected to the database');
    start();
}
); 

// start the program
// function to start the program
const start = () => {
    inquirer.prompt(selectOption).then(answers => {
        switch (answers.mainMenu) {
            case 'View all employees':
                viewEmployees();
                break;
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                db.end();
                break;
        }
    }
    );
}

// function to view all tables
const viewEmployees = () => {
    db.promise().query('SELECT * FROM employee').then(employees => {
        console.table(employees);
        start();
    }).catch(err => {
        console.log(err);
    }); 
};
const viewDepartments = () => {
    db.promise().query('SELECT * FROM department').then(departments => {
        console.table(departments);
        start();
    }).catch(err => {
        console.log(err);
    }
    );
}
const viewRoles = () => {
    db.promise().query('SELECT * FROM role').then(roles => {
        console.table(roles);
        start();
    }
    ).catch(err => {
        console.log(err);
    }  // end of viewRoles
    );
}

// function to add an employee
// const addEmployee = () => {
//     inquirer.prompt([addEmployee)
//         .then((answers) => {
//             db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', answers, (err, res) => {

// const addEmployee = () => {
//     inquirer.prompt(addEmployee)
//         .then((answers) => {
//             db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [answers.first_name, answers], (err, res) => {


