const express = require("express");
const {
	ctrlAllUsers,
	ctrlRegister,
	ctrlLogin,
	ctrlDeleteUser,
	ctrlOneUser,
} = require("../UserController");
const { verifyUser } = require("../../Middlewares/middlewares");

const userRouter = express.Router();

userRouter.get("/all", ctrlAllUsers);
userRouter.get("/:id", ctrlOneUser);
userRouter.post("/register", verifyUser, ctrlRegister);
userRouter.post("/login", ctrlLogin);
userRouter.delete("/delete/:id", ctrlDeleteUser);

module.exports = userRouter;
