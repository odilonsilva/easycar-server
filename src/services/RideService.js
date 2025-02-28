import RideRepository from "../repositories/RideRepository.js";

async function ListRides(
  passenger_user_id,
  pickup_date,
  ride_id,
  driver_user_id,
  status,
  status_not
) {
  try {
    return await RideRepository.ListRides(
      passenger_user_id,
      pickup_date,
      ride_id,
      driver_user_id,
      status,
      status_not
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

async function ListRidesDriver(driverId) {
  try {
    return await RideRepository.ListRidesDriver(driverId);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function GetRide(rideId) {
  try {
    const ride = await RideRepository.ListRides(
      null,
      null,
      rideId,
      null,
      null,
      null
    );
    return ride[0];
  } catch (error) {
    throw new Error(error.message);
  }
}

async function CreateRide(ride) {
  try {
    const pickup_date = new Date().toISOString().split("T")[0];

    const rideOld = await RideRepository.ListRides(
      ride.passenger_user_id,
      pickup_date,
      null,
      null,
      null,
      "F"
    );
    if (rideOld.length) throw new Error("You already have a ride for today.");

    return await RideRepository.CreateRide(ride);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function AcceptRide(rideId, driverId) {
  try {
    const pickup_date = new Date().toISOString().split("T")[0];
    const ride = await RideRepository.ListRides(
      null,
      pickup_date,
      null,
      driverId,
      "A",
      null
    );
    if (ride.length > 0) throw new Error("Driver already accepted a ride");

    await RideRepository.AcceptRide(rideId, driverId);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function CancelRide(rideId) {
  try {
    //insere regra de aceite apenas se nao houver outra aceita por esse driver
    await RideRepository.CancelRide(rideId);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function CancelRideDriver(rideId) {
  try {
    //insere regra de aceite apenas se nao houver outra aceita por esse driver
    await RideRepository.CancelRideDriver(rideId);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function FinishRide(rideId) {
  try {
    //insere regra de aceite apenas se nao houver outra aceita por esse driver
    await RideRepository.FinishRide(rideId);
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}
export default {
  GetRide,
  ListRides,
  CreateRide,
  AcceptRide,
  CancelRide,
  FinishRide,
  CancelRideDriver,
  ListRidesDriver,
};
