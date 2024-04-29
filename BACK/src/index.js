const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./Controller/Routes/users");
const { listingRouter } = require("./Controller/Routes/listings");
const { rentRouter } = require("./Controller/Routes/rent");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/listing", listingRouter);
app.use("/rent", rentRouter);

app.listen(4000);
console.log("Server is running on PORT 4000");
