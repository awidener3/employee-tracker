const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const figlet = require('figlet');

const PORT = process.env.PORT || 3001;

// Database connection
const db = mysql.createConnection(
    {
    host: 'localhost',
    user:'root',
    password:'rootroot',
    database: 'employees_db'
    },
    console.log('connected to database')
);

menu = async () => {
    const response = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit Application']
        }
    ])

    switch (response.choice) {
        case 'View All Employees':
            console.log('you chose view all employees')
            break;

        case 'Add Employee':
            console.log('you chose Add Employee')
            break;

        case 'Update Employee Role':
            console.log('you chose Update Employee Role')
            break;

        case 'View All Roles':
            console.log('you chose View All Roles')
            break;

        case 'Add Role':
            console.log('you chose Add Role')
            break;

        case 'View All Departments':
            db.query('SELECT id, name FROM department ORDER BY id', (err, results) => {
                if (err) console.log(err);
                console.table(results);
                menu()
            })
            break;

        case 'Add Department':
            console.log('you chose Add Department')
            break;

        case 'Exit Application':
            console.log('Thank you for using Employee Tracker!')
            break;

        default:
            break;
    }
    return;
}

// application 
menu();