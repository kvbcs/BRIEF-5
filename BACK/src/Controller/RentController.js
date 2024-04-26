const bcrypt = require("bcrypt");
const { ObjectId } = require("bson");
const jwt = require("jsonwebtoken");
const { pool } = require("../Services/Connexion");
var validator = require("validator");
require("dotenv").config();

// const ctrlCreateRent = async (req, res) => {
// 	if (!req.body.rent_start || !req.body.rent_end || !req.body.price) {
// 		res.status(400).json({ error: "Some fields are missing" });
// 	}
// 	const rent_start = req.body.rent_start;
// 	const rent_end = req.body.rent_end;
// 	const price = req.body.price;
// 	try {
// 		const [rows, fileds] = await pool.query(
// 			`INSERT INTO equipement VALUES (NULL, "${name}", "${image}", "${description}", "${category}", "${stock}")`
// 		);
// 		console.log(rows);
// 		res.status(200).json(rows);
// 	} catch (error) {
// 		console.log(error.stack);
// 		res.status(400).json({ Error: "Error creating a listing" });
// 	}
// };

// module.exports = { ctrlCreateRent };
