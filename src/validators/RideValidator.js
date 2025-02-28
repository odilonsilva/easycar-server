import { body, param } from "express-validator";

const acceptValidator = [
  body("driver_id").isNumeric().withMessage("driver_id must be a Number."),
  param("rideId").isNumeric().withMessage("rideId must be a Number."),
];

const cancelValidator = [
  param("rideId").isNumeric().withMessage("rideId must be a Number."),
];

const CreateRideValidator = [
  body("passenger_user_id")
    .isNumeric()
    .withMessage("passenger_user_id must be a Number."),

  body("pickup_address")
    .isLength({ min: 3, max: 100 })
    .withMessage("pickup_address must be between 3 to 100 characters."),

  body("dropoff_address")
    .isLength({ min: 3, max: 100 })
    .withMessage("dropoff_address must be between 3 to 100 characters."),

  body("pickup_latitude")
    .isNumeric()
    .withMessage("passenger_user_id must be a Number."),

  body("pickup_longitude")
    .isNumeric()
    .withMessage("passenger_user_id must be a Number."),
];

export default { acceptValidator, cancelValidator, CreateRideValidator };
