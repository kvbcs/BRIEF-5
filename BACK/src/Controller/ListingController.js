const bcrypt = require("bcrypt");
const { ObjectId } = require("bson");
const jwt = require("jsonwebtoken");
const { pool } = require("../Services/Connexion");
var validator = require("validator");
require("dotenv").config();

const ctrlCreateListing = async (req, res) => {
	if (
		!req.body.name ||
		!req.body.description ||
		!req.body.image ||
		!req.body.category ||
		!req.body.stock
	) {
		res.status(400).json({ error: "Some fields are missing" });
	}
	const name = req.body.name;
	const description = req.body.description;
	const image = req.body.image;
	const category = req.body.category;
	const stock = req.body.stock;
	try {
		const [rows, fileds] = await pool.query(
			`INSERT INTO equipement VALUES (NULL, "${name}", "${image}", "${description}", "${category}", "${stock}")`
		);
		console.log(rows);
		res.status(200).json(rows);
	} catch (error) {
		console.log(error.stack);
		res.status(400).json({ msg: "Error creating a listing" });
	}
};

const ctrlAllListings = async (req, res) => {
	try {
		const [rows, fields] = await pool.query(
			"SELECT name, description, category, stock FROM equipement"
		);
		console.log(rows);
		res.status(200).json(rows);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Error getting all equipements" });
	}
};

//TODO: fixe equipement id mais sinon ca marche quoi
const ctrlDeleteListing = async (req, res) => {
	if (!req.body.name) {
		res.status(400).json({ error: "Name field is missing" });
	}
	const name = req.body.name;
	const equipement_id = req.params.equipement_id;
	try {
		const [rows, fields] = await pool.query(
			`DELETE FROM equipement WHERE name = "${name}"`
		);
		console.log(rows);
		res.status(200).json(rows);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Error deleting an equipement" });
	}
};

//TODO: fixe update ca marche mais ca transforme en 0
const ctrlUpdateListing = async (req, res) => {
	if (!req.body.equipement_id) {
		res.status(400).json({ error: "Equipement ID is missing" });
	}
	const equipement_id = req.body.equipement_id;
	const name = req.body.name;
	const description = req.body.description;
	const image = req.body.image;
	const category = req.body.category;
	const stock = req.body.stock;
	try {
		const [rows, fields] = await pool.query(
			`UPDATE equipement SET name = "${name}" OR image = "${image}" OR description = "${description}" OR category = "${category}" OR stock = "${stock}" WHERE equipement_id = "${equipement_id}"`
		);
		console.log(rows);
		res.status(200).json(rows);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: "Error updating an equipement" });
	}
};

module.exports = {
	ctrlCreateListing,
	ctrlAllListings,
	ctrlDeleteListing,
	ctrlUpdateListing,
};
