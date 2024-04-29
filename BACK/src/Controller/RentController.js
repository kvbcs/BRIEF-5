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
module.exports = { ctrlCreateRent, ctrlAllRents };
