const express = require("express");
const {
	ctrlCreateListing,
	ctrlAllListings,
	ctrlDeleteListing,
	ctrlUpdateListing,
} = require("../ListingController");

const listingRouter = express.Router();

listingRouter.post("/listing/create", ctrlCreateListing);
listingRouter.get("/listing/all", ctrlAllListings);
listingRouter.delete("/listing/delete/:id", ctrlDeleteListing);
listingRouter.patch("/listing/update", ctrlUpdateListing);

module.exports = { listingRouter };
