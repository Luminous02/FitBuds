import express from "express";
import {
  addWorkout,
  getWorkouts,
  getCalWorkouts,
  getMonthWorkouts,
} from "../controller/workoutController.js";

const router = express.Router();

// POST /api/workouts
router.post("/", addWorkout);
router.get("/", getWorkouts);
router.get("/date", getCalWorkouts);
router.get("/month", getMonthWorkouts);

export default router;
