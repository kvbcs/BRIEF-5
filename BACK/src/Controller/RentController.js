const bcrypt = require("bcrypt");
const { ObjectId } = require("bson");
const jwt = require("jsonwebtoken");
const { pool } = require("../Services/Connexion");
var validator = require("validator");
require("dotenv").config();

const ctrlCreateRent = async (req, res) => {
	if (!req.body.rent_start || !req.body.rent_end || !req.body.price) {
		res.status(400).json({ error: "Some fields are missing" });
	}
	const rent_start = req.body.rent_start;
	const rent_end = req.body.rent_end;
	const price = req.body.price;
	const user_id = req.params.user_id;
	const equipement_id = req.params.equipement_id;

	try {
		const [rows, fileds] = await pool.query(
			`INSERT INTO equipement_rent VALUES (NULL, "${user_id}", "${equipement_id}", "${rent_start}", "${rent_end}", "${price}")
        `
		);
		console.log(rows);
		res.status(200).json(rows);
	} catch (error) {
		console.log(error.stack);
		res.status(400).json({ Error: "Error creating a rent" });
	}
};

const ctrlAllRents = async (req, res) => {
	try {
		const [rows, fields] =
			await pool.query(`SELECT * FROM equipement_rent JOIN users ON equipement_rent.user_id = users.user_id JOIN equipement ON equipement_rent.equipement_id = equipement.equipement_id
        `);
		console.log(rows);
		res.status(200).json(rows);
	} catch (error) {
		console.log(error.stack);
		res.status(400).json({ Error: "Error getting all rents" });
	}
};

const ctrlOneRent = async (req, res) => {
	const id = req.params.id;
	try {
		const sql = `SELECT * FROM equipement_rent WHERE equipement_rent_id=?`;
		const values = [id];
		const [rows] = await pool.execute(sql, values);
		console.log(rows);
		res.status(200).json(rows);
	} catch (error) {
		console.log(error.stack);
		res.status(400).json({ Error: "Error getting one rent" });
	}
};

const ctrlUpdateRent = async (req, res) => {
	const equipement_rent_id = req.params.equipement_rent_id;
	const { rent_start, rent_end, price } = req.body;
	let data = [];
	const values = [];

	try {
		if (rent_start) {
			data.push("rent_start=?");
			values.push(rent_start);
		}
		if (rent_end) {
			data.push("rent_end=?");
			values.push(rent_end);
		}
		if (price) {
			data.push("price=?");
			values.push(price);
		}

		if (values.length > 0) {
			values.push(equipement_rent_id);
			data = data.join(",");
			console.log(data, values);
			const sql = `UPDATE equipement_rent SET ${data} WHERE equipement_rent_id = ?`;
			const [rows] = await pool.execute(sql, values);
			res.status(200).json(rows);
		}
	} catch (error) {
		console.log(error.stack);
		res.status(400).json({ Error: "Error updating a rent" });
	}
};

const ctrlDeleteRent = async (req, res) => {
	const id = req.params.id;

	try {
		const [rows, fields] = await pool.query(
			`DELETE FROM equipement_rent WHERE equipement_rent_id = "${id}"`
		);
		if (rows.affectedRows === 0) {
			res.status(400).json({ Error: "This rent does not exist" });
			return;
		}
		console.log(rows);
		res.status(200).json({ Success: "Deleted rent successfull !" });
	} catch (error) {
		console.log(error.stack);
		res.status(400).json({ Error: "Error deleting a rent" });
	}
};

module.exports = {
	ctrlCreateRent,
	ctrlAllRents,
	ctrlUpdateRent,
	ctrlDeleteRent,
	ctrlOneRent,
};
