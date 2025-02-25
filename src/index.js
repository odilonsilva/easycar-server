import express from "express";
import cors from "cors";
import UserController from "./controllers/UserController.js";
import RideController from "./controllers/RideController.js";

const app = express();

app.use(express.json());
app.use(cors());

// users routes
app.post("/users", UserController.CreateUser);
app.post("/users/login", UserController.Login);

//ride routes
app.get("/rides", RideController.ListRides);
app.post("/rides", RideController.CreateRide);
app.get("/rides/:rideId", RideController.GetRide);
app.delete("/rides/:rideId", RideController.CancelRide);
app.put("/rides/:rideId/accept", RideController.AcceptRide);
app.put("/rides/:rideId/finish", RideController.FinishRide);
app.put("/rides/:rideId/cancel", RideController.CancelRideDriver);
app.get("/rides/drivers/:driverId", RideController.ListRidesDriver);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
