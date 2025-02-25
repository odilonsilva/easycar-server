import { execute } from "../database/sqlite.js";

async function CreateRide(ride) {
  try {
    const pickup_date = new Date().toISOString().split("T")[0];

    return await execute(
      `INSERT INTO rides (
      passenger_user_id,
      pickup_latitude,
      pickup_longitude,
      pickup_address,
      dropoff_address,
      pickup_date,
      status) 
      VALUES (?, ?, ?, ?, ?, ?, 'P') returning *`,
      [
        ride.passenger_user_id,
        ride.pickup_latitude,
        ride.pickup_longitude,
        ride.pickup_address,
        ride.dropoff_address,
        pickup_date,
      ],
      "get"
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

async function AcceptRide(rideId, driverId) {
  try {
    await execute(
      `UPDATE rides SET driver_user_id = ?, status = 'A' WHERE ride_id = ?`,
      [driverId, rideId]
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

async function CancelRideDriver(rideId) {
  try {
    await execute(
      `UPDATE rides SET driver_user_id = NULL, status = 'P' WHERE ride_id = ?`,
      [rideId]
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

async function FinishRide(rideId) {
  try {
    await execute(`UPDATE rides SET status = 'F' WHERE ride_id = ?`, [rideId]);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function CancelRide(rideId) {
  try {
    await execute(`DELETE FROM rides WHERE ride_id = ?`, [rideId]);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function ListRides(
  passenger_user_id,
  pickup_date,
  ride_id,
  driver_user_id,
  status,
  status_not
) {
  try {
    let query = `SELECT r.*, 
                u.name as passenger_name, 
                u.phone as passenger_phone, 
                d.user_id as driver_id,
                d.name as driver_name,
                d.phone as driver_phone
                FROM rides r
                JOIN users u ON r.passenger_user_id = u.user_id
                LEFT JOIN users d ON r.driver_user_id = d.user_id
                WHERE r.ride_id > 0`;
    const filters = [];

    if (passenger_user_id) {
      query += " AND passenger_user_id = ? ";
      filters.push(passenger_user_id);
    }

    if (pickup_date) {
      query += " AND pickup_date = ? ";
      filters.push(pickup_date);
    }

    if (ride_id) {
      query += " AND ride_id = ? ";
      filters.push(ride_id);
    }

    if (driver_user_id) {
      query += " AND driver_user_id = ? ";
      filters.push(driver_user_id);
    }

    if (status) {
      query += " AND status = ? ";
      filters.push(status.toUpperCase());
    }

    if (status_not) {
      query += " AND status <> ? ";
      filters.push(status_not.toUpperCase());
    }

    return await execute(query, filters);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function ListRidesDriver(driverId) {
  try {
    const query = `SELECT r.*, 
                u.name as passenger_name
                FROM rides r
                JOIN users u ON r.passenger_user_id = u.user_id
                WHERE r.driver_user_id = ? 
                AND r.pickup_date = ?
                AND r.status <> 'F'
                
                UNION

                SELECT r.*, 
                u.name as passenger_name
                FROM rides r
                JOIN users u ON r.passenger_user_id = u.user_id
                WHERE r.pickup_date = ? AND r.driver_user_id IS NULL
                AND u.user_id <> ? 
                AND r.status <> 'F'
                `;

    const pickup_date = new Date().toISOString().split("T")[0];

    return await execute(query, [driverId, pickup_date, pickup_date, driverId]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export default {
  ListRides,
  CreateRide,
  AcceptRide,
  CancelRide,
  FinishRide,
  CancelRideDriver,
  ListRidesDriver,
};
