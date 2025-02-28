import express from "express";
import userController from "../controllers/UserController.js";
import userValidator from "../validators/UserValidator.js";

const UserRoutes = express.Router();

UserRoutes.post(
  "/",
  userValidator.createUserValidator,
  userController.CreateUser
);
UserRoutes.post("/login", userValidator.loginValidator, userController.Login);

export default UserRoutes;
