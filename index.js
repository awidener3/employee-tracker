const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/query.js');

// menu for selecting application actions
menu = () => {
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'choice',
				message: 'What would you like to do?',
				choices: [
					'View All Employees',
					'Add Employee',
					'Update Employee Role',
					'View All Roles',
					'Add Role',
					'View All Departments',
					'Add Department',
					'Exit Application',
				],
			},
		])
		.then((response) => handleMenu(response))
		.catch((error) => console.log(error));
};

// handles response from menu and delivers questions based on response
handleMenu = (response) => {
	switch (response.choice) {
		// * READ employees
		case 'View All Employees':
			db.readEmployees()
				.then(([rows]) => {
					console.table(rows);
				})
				.then(() => {
					menu();
				});

			break;

		// * CREATE employee
		case 'Add Employee':
			db.readRoles()
				.then(([rows]) => {
					const roleChoices = rows.map(({ id, title }) => ({
						name: title,
						value: id,
					}));

					return roleChoices;
				})
				.then((roleChoices) => {
					db.readEmployees()
						.then(([rows]) => {
							const employeeChoices = rows.map(
								({ id, first_name, last_name }) => ({
									name: first_name + ' ' + last_name,
									value: id,
								})
							);
							return { roleChoices, employeeChoices };
						})
						.then(({ roleChoices, employeeChoices }) => {
							inquirer
								.prompt([
									{
										type: 'input',
										name: 'firstName',
										message:
											"What is the employee's first name?",
									},
									{
										type: 'input',
										name: 'lastName',
										message:
											"What is the employee's last name?",
									},
									{
										type: 'list',
										name: 'role',
										message: "What is the employee's role?",
										choices: roleChoices,
									},
									{
										type: 'list',
										name: 'manager',
										message:
											"Who is the employee's manager?",
										choices: employeeChoices,
									},
								])
								.then((response) => {
									db.createEmployee(
										response.firstName,
										response.lastName,
										response.role,
										response.manager
									);
									console.log(
										`successfully added ${response.firstName} ${response.lastName}`
									);
								})
								.then(() => menu());
						});
				});

			break;

		// * UPDATE employee role
		case 'Update Employee Role':
			db.readRoles()
				.then(([rows]) => {
					const roleChoices = rows.map(({ id, title }) => ({
						name: title,
						value: id,
					}));

					return roleChoices;
				})
				.then((roleChoices) => {
					db.readEmployees()
						.then(([rows]) => {
							const employeeChoices = rows.map(
								({ id, first_name, last_name }) => ({
									name: first_name + ' ' + last_name,
									value: id,
								})
							);
							return { roleChoices, employeeChoices };
						})
						.then(({ roleChoices, employeeChoices }) => {
							inquirer
								.prompt([
									{
										type: 'list',
										name: 'employee',
										message: 'Select an employee to update',
										choices: employeeChoices,
									},
									{
										type: 'list',
										name: 'role',
										message: 'Select a role',
										choices: roleChoices,
									},
								])
								.then((response) => {
									db.updateEmployee(
										response.role,
										response.employee
									);
									console.log(`successfully updated role!`);
								})
								.then(() => menu());
						});
				});
			break;

		// * READ roles
		case 'View All Roles':
			db.readRoles()
				.then(([rows]) => {
					console.table(rows);
				})
				.then(() => {
					menu();
				});

			break;

		// * CREATE role
		case 'Add Role':
			db.readDepartments()
				.then(([rows]) => {
					const departmentChoices = rows.map(({ id, name }) => ({
						name: name,
						value: id,
					}));

					return departmentChoices;
				})
				.then((departmentChoices) => {
					inquirer
						.prompt([
							{
								type: 'input',
								name: 'role',
								message: 'What is the name of the role?',
								validate: (role) => {
									return role === ''
										? 'Please enter a valid name'
										: true;
								},
							},
							{
								type: 'number',
								name: 'salary',
								message: 'What is the salary of this role?',
							},
							{
								type: 'list',
								name: 'department',
								message:
									'What department does the role belong to?',
								choices: departmentChoices,
							},
						])
						.then((response) => {
							db.createRole(
								response.role,
								response.salary,
								response.department
							);
							console.log(`successfully added ${response.role}`);
						})
						.then(() => menu());
				});

			break;

		// * READ departments
		case 'View All Departments':
			db.readDepartments()
				.then(([rows]) => {
					console.table(rows);
				})
				.then(() => {
					menu();
				});

			break;

		// * CREATE department
		case 'Add Department':
			inquirer
				.prompt({
					type: 'input',
					name: 'name',
					message: 'What is the name of the department?',
					validate: (name) => {
						return name === '' ? 'Please enter a name' : true;
					},
				})
				.then((response) => {
					db.createDepartment(response.name);
					console.log(`${response.name} successfully added!`);
				})
				.then(() => menu());

			break;

		// * exit app
		case 'Exit Application':
			console.log('Thank you for using Employee Tracker!');
			process.exit(0);

		default:
			console.log('error!');
			break;
	}
};

menu();
