const express = require("express");
const { ctrlCreateRent, ctrlAllRents } = require("../RentController");

const rentRouter = express.Router();

rentRouter.get("/all", ctrlAllRents);
rentRouter.post("/create/:user_id/:equipement_id", ctrlCreateRent);

module.exports = { rentRouter };
