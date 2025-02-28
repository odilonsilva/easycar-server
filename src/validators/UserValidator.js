import { body } from "express-validator";

const loginValidator = [
  body("password")
    .isLength({ min: 3, max: 30 })
    .withMessage("Password must be between 3 to 30 characters"),
  body("email").isEmail().withMessage("Email must be valid"),
];

const createUserValidator = [
  body("name")
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "Username must be alphanumeric and between 3 to 30 characters"
    ),
  body("phone")
    .isLength({ min: 8, max: 12 })
    .withMessage("Phone must be numeric and between 8 to 12 characters"),
  body("password")
    .isLength({ min: 3, max: 30 })
    .withMessage("Password must be between 3 to 30 characters"),
  body("email").isEmail().withMessage("Email must be valid"),
];

export default { createUserValidator, loginValidator };
