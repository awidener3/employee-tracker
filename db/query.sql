-- READ all departments

SELECT id, name FROM department
ORDER BY id

-- READ all roles

SELECT role.id, role.title, department.name, role.salary
FROM role
INNER JOIN department 
ON role.department_id=department.id
ORDER BY role.id

-- READ all employees
SELECT 
		employee.id, 
		employee.first_name, 
		employee.last_name, 
		role.title, 
		department.name,
		employee.manager_id 
FROM 	employee
JOIN 	role
ON 		employee.role_id=role.id
JOIN	department
ON 		department.id=role.department_id

-- CREATE department
-- prompt to enter name of department, department added to db
INSERT INTO department(name)
VALUES
	('text')

-- CREATE role
-- prompt enter name, salary and department for role, role added to db
INSERT INTO role(title, salary, department_id)
VALUES
	('text', 1, 1)

-- CREATE employee
-- prompt enter first name, last name, role, manager, employee added to db
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
	('first', 'last', 1, NULL)

-- UPDATE employee
-- prompt select employeee to update and their new role, info updated in db
UPDATE employee SET role_id=1 WHERE id=1
