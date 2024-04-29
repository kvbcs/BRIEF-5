const express = require("express");
const {
	ctrlCreateRent,
	ctrlAllRents,
	ctrlUpdateRent,
	ctrlDeleteRent,
	ctrlOneRent,
} = require("../RentController");

const rentRouter = express.Router();

rentRouter.get("/all", ctrlAllRents);
rentRouter.get("/:id", ctrlOneRent);
rentRouter.post("/create/:user_id/:equipement_id", ctrlCreateRent);
rentRouter.patch("/update/:equipement_rent_id", ctrlUpdateRent);
rentRouter.delete("/delete/:id", ctrlDeleteRent);

module.exports = { rentRouter };
