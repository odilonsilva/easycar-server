import RideService from "../services/RideService.js";

async function AcceptRide(req, res) {
  try {
    await RideService.AcceptRide(req.params.rideId, req.body.driver_id);
    res.json({ message: "Ride accepted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function GetRide(req, res) {
  try {
    const data = await RideService.GetRide(req.params.rideId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function ListRidesDriver(req, res) {
  try {
    const data = await RideService.ListRidesDriver(req.params.driverId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function ListRides(req, res) {
  try {
    const data = await RideService.ListRides(
      req.query.passenger_user_id,
      req.query.pickup_date,
      req.query.ride_id,
      req.query.driver_user_id,
      req.query.status,
      req.query.status_not
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function CancelRide(req, res) {
  try {
    await RideService.CancelRide(req.params.rideId);
    res.json({ message: "Ride canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function CancelRideDriver(req, res) {
  try {
    await RideService.CancelRideDriver(req.params.rideId);
    res.json({ message: "Ride canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function FinishRide(req, res) {
  try {
    await RideService.FinishRide(req.params.rideId);
    res.json({ message: "Ride finished successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function CreateRide(req, res) {
  try {
    const data = await RideService.CreateRide(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default {
  GetRide,
  AcceptRide,
  CreateRide,
  ListRides,
  CancelRide,
  FinishRide,
  CancelRideDriver,
  ListRidesDriver,
};
