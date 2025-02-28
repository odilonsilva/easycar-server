import express from "express";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes.js";
import RideRoutes from "./routes/RideRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

// users routes
app.use("/users", UserRoutes);

//ride routes
app.use("/rides", RideRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
