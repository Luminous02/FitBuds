import express from "express";
import {
  addWorkout,
  getWorkouts,
  getCalWorkouts,
  getMonthWorkouts,
  getGroupPoints,
  getRecentGroupWorkouts,
} from "../controller/workoutController.js";

const router = express.Router();

// POST /api/workouts
router.post("/", addWorkout);
router.get("/", getWorkouts);
router.get("/date", getCalWorkouts);
router.get("/month", getMonthWorkouts);
router.get("/group-points", getGroupPoints);
router.get("/recent-group", getRecentGroupWorkouts);

export default router;