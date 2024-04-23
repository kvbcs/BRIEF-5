const mysql = require("mysql2/promise");

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "",
	password: "",
	waitForConnections: true,
	multipleStatements: true,
});

module.exports = { pool };
