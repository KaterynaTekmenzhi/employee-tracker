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

// add a department
const addDepartment = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?'
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
                const departmentRole = await db.promise().query('SELECT * FROM department');
                return departmentRole.map(department => department.name);
            } catch (err) {
                console.log(err);
            }
        }
    }
];

module.exports = {selectOption, addDepartment, addRole};

