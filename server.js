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
                departmentData();
                break;
            case 'Add a role':
                roleData();
                break;
            case 'Update an employee role':
                updateEmployeeRoleData();
                break;
            case 'Exit':
                db.end();
                break;
        }
    }
    );
};

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
    })
};

// function to add an employee
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

// function to add a department
const departmentData = () => {
    inquirer.prompt(addDepartment)
    .then((answers) => {
        db.query('INSERT INTO departments (departments_name) VALUES (?)', [answers.departmentName], (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log(`${answers.departmentName} was added to the database`);
            start();
        }) 
    });
};

// function to add a role
const roleData = () => {
    inquirer.prompt(addRole)
    .then((answers) => {
        db.query('INSERT INTO roles (title, salary, departments_id) VALUES (?,?,?)', [answers.roleTitle, answers.roleSalary, answers.roleDepartment], (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log(`${answers.roleTitle} was added to the database`);
            start();
        }) 
    });
}

// function to update an employee role
const updateEmployeeRoleData = () => {
    inquirer.prompt(updateEmployeeRole)
    .then((answers) => {
        db.query('UPDATE employees SET role_id = ? WHERE id = ?', [answers.roleId, answers.employeeId], (err, res) => {
            if (err) {
                console.log(err);
            }
            console.log(`${answers.employeeId}'s role was updated to ${answers.roleId}`);
            start();
        })
    });
};




