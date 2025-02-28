import express from "express";
import RideController from "../controllers/RideController.js";
import RideValidator from "../validators/RideValidator.js";

const RideRoutes = express.Router();

RideRoutes.get("/", RideController.ListRides);
RideRoutes.post(
  "/",
  RideValidator.CreateRideValidator,
  RideController.CreateRide
);
RideRoutes.get("/:rideId", RideController.GetRide);
RideRoutes.delete(
  "/:rideId",
  RideValidator.cancelValidator,
  RideController.CancelRide
);
RideRoutes.put(
  "/:rideId/accept",
  RideValidator.acceptValidator,
  RideController.AcceptRide
);
RideRoutes.put(
  "/:rideId/finish",
  RideValidator.cancelValidator,
  RideController.FinishRide
);
RideRoutes.put(
  "/:rideId/cancel",
  RideValidator.cancelValidator,
  RideController.CancelRideDriver
);
RideRoutes.get("/drivers/:driverId", RideController.ListRidesDriver);

export default RideRoutes;
