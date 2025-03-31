import express from "express";
import { addWorkout } from "../controller/workoutController.js";

const router = express.Router();

// POST /api/workouts
router.post("/", addWorkout); // Changed from '/add-workout' to '/'

export default router;
