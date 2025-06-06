import express from "express";
import { checkConnection } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import cors from "cors";

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Allow only this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  credentials: true, // If you need to send cookies or authentication headers
}));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);

app.listen(3000, async () => {
  console.log("Server running on port 3000");
  try {
    await checkConnection();
  } catch (error) {
    console.log("Failed to initialize the database", error);
  }
});