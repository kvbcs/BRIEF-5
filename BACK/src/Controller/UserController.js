const bcrypt = require("bcrypt");
const { ObjectId } = require("bson");
const jwt = require("jsonwebtoken");
const { pool } = require("../Services/Connexion");
var validator = require("validator");
require("dotenv").config();

const ctrlAllUsers = async (req, res) => {
	try {
		const [rows, fields] = await pool.query("SELECT * FROM users");
		console.log(rows);
		res.status(200).json(rows);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Error getting all users" });
	}
};

const ctrlRegister = async (req, res) => {
	const first_name = req.body.first_name;
	const last_name = req.body.last_name;
	const phone_number = req.body.phone_number;
	const address = req.body.address;
	const email = req.body.email;
	const password = req.body.password;

	try {
		const [rows, fields] = await pool.query(
			`INSERT INTO users (user_id, first_name, last_name, phone_number, address, email, password, role, created_at, gdpr) VALUES (NULL, "${first_name}", "${last_name}","${phone_number}","${address}","${email}","${password}", "user", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
		);
		console.log(rows);
		res.status(200).json(rows);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Error inserting an user" });
	}
};

const ctrlLogin = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const [rows, fields] = await pool.query(
			`SELECT * FROM users WHERE email = "${email}" AND password= "${password}"`
		);
		console.log(rows);
		res.status(200).json(rows);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Invalid email or password" });
	}
};

module.exports = { ctrlAllUsers, ctrlRegister, ctrlLogin };
