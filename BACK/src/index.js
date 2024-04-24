const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./Controller/Routes/users");
const { listingRouter } = require("./Controller/Routes/listings");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", userRouter);
app.use("/", listingRouter);

app.listen(4000);
console.log("Server is running on PORT 4000");
