import express from "express";
import {
  addWorkout,
  getWorkouts,
  //getCalWorkouts,
} from "../controller/workoutController.js";

const router = express.Router();

// POST /api/workouts
router.post("/", addWorkout);
router.get("/", getWorkouts);
//router.get("/date", getCalWorkouts);

export default router;
