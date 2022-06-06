const db = require('../config/connection');

// ask user what they want to do
const selectOption = [
    {
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add an employee',
            'Add a department',
            'Add a role',
            'Update an employee role',
            'Exit'
        ],
        default: 'View all employees'
    }
];

// add an employee 
const addEmployee = [
    {
        type: 'input',
        name: 'firstName',
        message: 'What is the employee\'s first name?'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'What is the employee\'s last name?'
    },
    {
        type: 'list',
        name: 'roleId',
        message: 'What is the employee\'s role?',
        choices: async () => {
            try {
                const results = await db.promise().query('SELECT title as name, id as value FROM roles');
                return results[0];
            } catch (err) {
                throw err;
            } 
        } 
    },
    {
        type: 'list',
        name: 'managerId',
        message: 'Who is the employee\'s manager?',
        choices: async () => {
            try {
                const results = await db.promise().query('SELECT CONCAT(first_name, " ", last_name) as name, id as value FROM employees');
                return results[0];
            } catch (err) {
                throw err;
            } 
        }
    }
];

// add a role
const addRole = [
    {
        type: 'input',
        name: 'roleTitle',
        message: 'What is the title of the role?'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary of the role?'
    },
    {
        type: 'list',
        name: 'roleDepartment',
        message: 'What department does the role belong to?',
        choices: async () => {
            try {
                const results = await db.promise().query('SELECT name as name, id as value FROM departments');
                return results[0];
            } catch (err) { 
                throw err;
            }
        }
    }
];

// add a department
const addDepartment = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?'
    }
];

const updateEmployeeRole = [
    {
        type: 'list',
        name: 'employeeId',
        message: 'Which employee would you like to update?',
        choices: async () => {
            try {
                const results = await db.promise().query('SELECT CONCAT(first_name, " ", last_name) as name, id as value FROM employees');
                return results[0];
            } catch (err) {
                throw err;
            }
        }
    },
    {
        type: 'list',
        name: 'roleId',
        message: 'What is the employee\'s new role?',
        choices: async () => {
            try {
                const results = await db.promise().query('SELECT title as name, id as value FROM roles');
                return results[0];
            } catch (err) {
                console.log(err);
            }
        }
    }
];



module.exports = {selectOption, addEmployee, addRole, addDepartment, updateEmployeeRole};

