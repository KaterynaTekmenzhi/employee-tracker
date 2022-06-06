// globals for the server
const inquirer = require('inquirer');
const db = require('./config/connection');
require('console.table');

// import questions from utils/questions.js
const { selectOption, addEmployee, addRole, addDepartment, updateEmployeeRole } = require('./utils/questions');

// connect to the database
db.connect((err) => {
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
                employeeData();
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
// function to view all employees
const viewEmployees = () => {
    console.log('Viewing all employees');
    db.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

// function to view all departments
const viewDepartments = () => {
    db.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
};

// function to view all roles
const viewRoles = () => {
    db.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    }
    ).catch(err => {
        console.log(err);
    }
    );
}

// function to add an employee
// const addEmployee = () => {
//     inquirer.prompt([addEmployee)
//         .then((answers) => {
//             db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', answers, (err, res) => {

const employeeData = () => {
    inquirer.prompt(addEmployee)
    .then((answers) => {
        db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [answers.firstName, answers.lastName, answers.roleId, answers.managerId], (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log(`${answers.firstName} ${answers.lastName} was added to the database`);
            start();
        }) 
    });
};



