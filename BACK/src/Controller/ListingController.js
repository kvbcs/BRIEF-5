const bcrypt = require("bcrypt");
const { ObjectId } = require("bson");
const jwt = require("jsonwebtoken");
const { pool } = require("../Services/Connexion");
var validator = require("validator");
require("dotenv").config();

const ctrlCreateListing = async (req, res) => {
	if (
		!req.body.name ||
		!req.body.image ||
		!req.body.description ||
		!req.body.category ||
		!req.body.stock
	) {
		res.status(400).json({ error: "Some fields are missing" });
	}
	const name = req.body.name;
	const image = req.body.image;
	const description = req.body.description;
	const category = req.body.category;
	const stock = req.body.stock;

	try {
		const values = [name, image, description, category, stock];
		const sql = `INSERT INTO equipement VALUES (NULL, ?, ?, ?, ?, ?)`;
		const [rows] = await pool.execute(sql, values);
		console.log(rows);
		res.status(200).json(rows);
	} catch (error) {
		console.log(error.stack);
		res.status(400).json({ Error: "Error creating a listing" });
	}
};

const ctrlAllListings = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM equipement");
		console.log(rows);
		res.status(200).json(rows);
	} catch (error) {
		console.log(error.stack);
		res.status(400).json({ Error: "Error getting all equipements" });
	}
};

const ctrlOneListing = async (req, res) => {
	const id = req.params.id;
	try {
		const sql = `SELECT * FROM equipement WHERE equipement_id=?`;
		const values = [id];
		const [rows] = await pool.execute(sql, values);
		console.log(rows);
		res.status(200).json(rows);
	} catch (error) {
		console.log(error.stack);
		res.status(400).json({ Error: "Error getting one listing" });
	}
};

const ctrlDeleteListing = async (req, res) => {
	const id = req.params.id;
	console.log(id);
	try {
		const values = [id];
		const sql = `DELETE FROM equipement WHERE equipement_id = ?`;
		const [rows] = await pool.execute(sql, values);
		if (rows.affectedRows === 0) {
			res.status(400).json({ Error: "This equipement does not exist" });
			return;
		}
		console.log(rows);
		res.status(200).json({ Success: "Deleted listing successfull !" });
	} catch (error) {
		console.log(error.stack);
		res.status(400).json({ Error: "Error deleting a listing" });
	}
};

const ctrlUpdateListing = async (req, res) => {
	const id = req.params.id;
	const { name, description, image, category, stock} = req.body;
	let data = [];
	const values = [];

	try {
		if (name) {
			data.push("name=?");
			values.push(name);
		}
		if (description) {
			data.push("description=?");
			values.push(description);
		}
		if (image) {
			data.push("image=?");
			values.push(image);
		}
		if (category) {
			data.push("category=?");
			values.push(category);
		}
		if (stock) {
			data.push("stock=?");
			values.push(stock);
		}
		if (values.length > 0) {
			values.push(id);
			data = data.join(",");
			console.log(data, values, req.body);
			const sql = `UPDATE equipement SET ${data} WHERE equipement_id = ?`;
			const [rows] = await pool.execute(sql, values);
			res.status(200).json(rows);
		}
	} catch (error) {
		console.log(error.stack);
		res.status(400).json({ Error: "Error updating an equipement" });
	}
};

module.exports = {
	ctrlCreateListing,
	ctrlAllListings,
	ctrlDeleteListing,
	ctrlUpdateListing,
	ctrlOneListing,
};
