const mysql = require('mysql2');

const db = mysql.createConnection(
	{
		host: 'localhost',
		user: 'root',
		password: 'rootroot',
		database: 'employees_db',
	},
	console.log('connected to database')
);

db.connect((err) => {
	if (err) throw err;
});

module.exports = db;
