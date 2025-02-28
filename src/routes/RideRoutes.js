import express from "express";
import RideController from "../controllers/RideController.js";
import RideValidator from "../validators/RideValidator.js";
import authenticateToken from "../middlewares/AuthMiddleware.js";
const RideRoutes = express.Router();

RideRoutes.get("/", authenticateToken, RideController.ListRides);
RideRoutes.post(
  "/",
  [authenticateToken, RideValidator.CreateRideValidator],
  RideController.CreateRide
);
RideRoutes.get("/:rideId", authenticateToken, RideController.GetRide);
RideRoutes.delete(
  "/:rideId",
  [authenticateToken, RideValidator.cancelValidator],
  RideController.CancelRide
);
RideRoutes.put(
  "/:rideId/accept",
  [authenticateToken, RideValidator.acceptValidator],
  RideController.AcceptRide
);
RideRoutes.put(
  "/:rideId/finish",
  [authenticateToken, RideValidator.cancelValidator],
  RideController.FinishRide
);
RideRoutes.put(
  "/:rideId/cancel",
  [authenticateToken, RideValidator.cancelValidator],
  RideController.CancelRideDriver
);
RideRoutes.get(
  "/drivers/:driverId",
  authenticateToken,
  RideController.ListRidesDriver
);

export default RideRoutes;
