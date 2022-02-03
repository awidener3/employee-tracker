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
            db.query(
                'SELECT a.id, a.first_name, a.last_name, role.title, department.name, CONCAT(b.first_name, \' \', b.last_name) AS manager FROM employee a JOIN role ON a.role_id=role.id JOIN department ON department.id=role.department_id LEFT JOIN employee b ON a.manager_id = b.id', 
                (err, results) => {
                    if (err) console.log(err);
                    console.table(results);
                    menu()
                })
            break;

        case 'Add Employee':
            console.log('you chose Add Employee')
            break;

        case 'Update Employee Role':
            console.log('you chose Update Employee Role')
            break;

        case 'View All Roles':
            db.query(
                'SELECT role.id, role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id=department.id ORDER BY role.id', 
                (err, results) => {
                    if (err) console.log(err);
                    console.table(results);
                    menu()
                })
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
            const data = await inquirer.prompt(
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is the name of the department?',
                    validate: (name) => {}
                }
            )
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