const express = require("express");
const {
	ctrlCreateListing,
	ctrlAllListings,
	ctrlDeleteListing,
	ctrlUpdateListing,
	ctrlOneListing,
} = require("../ListingController");

const listingRouter = express.Router();

listingRouter.post("/create", ctrlCreateListing);
listingRouter.get("/all", ctrlAllListings);
listingRouter.get("/:id", ctrlOneListing);
listingRouter.delete("/delete", ctrlDeleteListing);
listingRouter.patch("/update/:id", ctrlUpdateListing);

module.exports = { listingRouter };
