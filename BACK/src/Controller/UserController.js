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
		console.log(error.stack);
		res.status(400).json({ Error: "Error getting all users" });
	}
};

const ctrlOneUser = async (req, res) => {
	const id = req.params.id;
	try {
		const sql = `SELECT * FROM users WHERE user_id=?`;
		const values = [id];
		const [rows] = await pool.execute(sql, values);
		console.log(rows);
		res.status(200).json(rows);
	} catch (error) {
		console.log(error.stack);
		res.status(400).json({ Error: "Error getting one user" });
	}
};

const ctrlRegister = async (req, res) => {
	if (
		!req.body.first_name ||
		!req.body.last_name ||
		!req.body.phone_number ||
		!req.body.address ||
		!req.body.email ||
		!req.body.password
	) {
		res.status(400).json({ error: "Missing fields" });
		return;
	}

	const first_name = req.body.first_name;
	const last_name = req.body.last_name;
	const phone_number = req.body.phone_number;
	const address = req.body.address;
	const email = req.body.email;
	const password = req.body.password;

	const values = [phone_number];
	const sql = `SELECT phone_number FROM users WHERE phone_number = ?`;
	const [result] = await pool.execute(sql, values);
	if (result.length !== 0) {
		res.status(400).json({ Error: "Phone number already exists" });
		return;
	}
	try {
		const values = [email];
		const sql = `SELECT email FROM users WHERE email = ?`;
		const [result] = await pool.execute(sql, values);
		if (result.length !== 0) {
			res.status(400).json({ Error: "Email already exists" });
			return;
		} else {
			const hashedPassword = await bcrypt.hash(password, 10);
			const sqlInsertRequest = `INSERT INTO users VALUES (NULL, ?, ?, ?, ?, ?, ?, "user", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
			const insertValues = [
				first_name,
				last_name,
				phone_number,
				address,
				email,
				hashedPassword,
			];
			const [rows] = await pool.execute(sqlInsertRequest, insertValues);
			if (rows.affectedRows > 0) {
				console.log(rows);
				res.status(200).json({ Success: "Register successfull !" });
				return;
			} else {
				res.status(400).json({ Error: "Register failed" });
			}
		}
	} catch (error) {
		console.log(error.stack);
		res.status(500).json({ Error: "Server error" });
		return;
	}
};

const ctrlLogin = async (req, res) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).json({ Error: "Missing Fields" });
		return;
	}
	const email = req.body.email;
	const password = req.body.password;

	try {
		const values = [email];
		const sql = `SELECT * FROM users WHERE email = ?`;
		const [rows] = await pool.execute(sql, values);

		console.log(rows);

		if (rows.length === 0) {
			res.status(400).json({ Error: "Invalid email" });
			return;
		} else {
			const isValidPassword = await bcrypt.compare(
				req.body.password,
				rows[0].password
			);
			console.log(isValidPassword);
			if (!isValidPassword) {
				res.status(400).json({ Error: "Invalid password" });
				return;
			} else {
				const token = jwt.sign(
					{
						user_id: rows[0].user_id,
						email: rows[0].email,
					},
					process.env.MYSQL_SECRET_KEY,
					{
						expiresIn: "1d",
					}
				);
				console.log(rows);
				res.status(200).json({ jwt: token, role: rows[0].role });
				return;
			}
		}
	} catch (error) {
		console.log(error.stack);
		res.status(500).json({ Error: "Servor error" });
	}
};

const ctrlDeleteUser = async (req, res) => {
	let id = req.params.id;

	try {
		const values = [id];
		const sql = `DELETE FROM users WHERE user_id = ?`;
		const [rows] = await pool.execute(sql, values);

		console.log(rows);
		res.status(200).json({ Success: "Deleted user successfull !" });
	} catch (error) {
		console.log(error.stack);
		res.status(400).json({ Error: "Error deleting an user" });
	}
};

module.exports = {
	ctrlAllUsers,
	ctrlOneUser,
	ctrlRegister,
	ctrlLogin,
	ctrlDeleteUser,
};
