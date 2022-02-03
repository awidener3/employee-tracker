const mysql = require('mysql2');

const db = mysql.createConnection(
    {
    host: 'localhost',
    user:'root',
    password:'rootroot',
    database: 'employees_db'
    },
    console.log('connected to database')
);

class Query {
    constructor() {

    }

    readDepartments() {

    }

    readRoles() {

    }

    readEmployees() {

    }

    createDepartment() {

    }

    createRole() {

    }

    createEmployee() {

    }

    updateEmployee() {

    }
}


module.export = Query