const express = require("express");
const { ctrlAllUsers, ctrlRegister, ctrlLogin } = require("../UserController");

const userRouter = express.Router();

userRouter.get("/users/all", ctrlAllUsers);
userRouter.post("/register", ctrlRegister);
userRouter.post("/login", ctrlLogin);

module.exports = userRouter;
