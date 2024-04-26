const express = require("express");
const {
	ctrlCreateListing,
	ctrlAllListings,
	ctrlDeleteListing,
	ctrlUpdateListing,
	ctrlOneListing,
} = require("../ListingController");
const { verifyListing } = require("../../Middlewares/middlewares");

const listingRouter = express.Router();

listingRouter.post("/create", verifyListing, ctrlCreateListing);
listingRouter.get("/all", ctrlAllListings);
listingRouter.get("/:id", ctrlOneListing);
listingRouter.delete("/delete", ctrlDeleteListing);
listingRouter.patch("/update/:id", ctrlUpdateListing);

module.exports = { listingRouter };
