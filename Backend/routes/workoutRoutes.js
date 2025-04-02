import express from "express";
import { addWorkout, getWorkouts } from "../controller/workoutController.js";

const router = express.Router();

// POST /api/workouts
router.post("/", addWorkout); // Changed from '/add-workout' to '/'
router.get("/", getWorkouts);

export default router;
