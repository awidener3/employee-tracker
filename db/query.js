const db = require('./connection.js');

class Query {
	constructor(db) {
		this.db = db;
	}

	readDepartments() {
		return this.db
			.promise()
			.query('SELECT id, name FROM department ORDER BY id');
	}

	readRoles() {
		return this.db
			.promise()
			.query(
				'SELECT role.id, role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id=department.id ORDER BY role.id'
			);
	}

	readEmployees() {
		return this.db
			.promise()
			.query(
				"SELECT a.id, a.first_name, a.last_name, role.title, department.name, CONCAT(b.first_name, ' ', b.last_name) AS manager FROM employee a JOIN role ON a.role_id=role.id JOIN department ON department.id=role.department_id LEFT JOIN employee b ON a.manager_id = b.id"
			);
	}

	createDepartment(department) {
		this.db
			.promise()
			.query('INSERT INTO department(name) VALUES (?)', department)
			.catch((err) => console.log(err));
	}

	createRole(role, salary, department) {
		this.db
			.promise()
			.query(
				'INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)',
				[role, salary, department]
			)
			.catch((err) => console.log(err));
	}

	createEmployee(firstName, lastName, roleId, ManagerId) {
		this.db
			.promise()
			.query(
				'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
				[firstName, lastName, roleId, ManagerId]
			)
			.catch((err) => console.log(err));
	}

	// TODO: roleId and id need to find matching name
	updateEmployee(roleId, id) {
		db.query(
			'UPDATE employee SET role_id=? WHERE id=?',
			[roleId, id],
			(err, result) => {
				if (err) console.log(err);
				console.log(results);
			}
		);
	}
}

module.exports = new Query(db);
