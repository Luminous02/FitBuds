import express from "express";
import {
  addWorkout,
  getGroupPoints,
  getWorkouts,
  getGroupPoints,
  //getCalWorkouts,
} from "../controller/workoutController.js";

const router = express.Router();

// POST /api/workouts
router.post("/", addWorkout);
router.get("/", getWorkouts);
router.get("/group-points", getGroupPoints);
//router.get("/date", getCalWorkouts);

export default router;
