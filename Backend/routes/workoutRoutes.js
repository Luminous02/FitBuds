import express from "express";
<<<<<<< HEAD
import { addWorkout, getWorkouts } from "../controller/workoutController.js";
=======
import {
  addWorkout,
  getWorkouts,
  getCalWorkouts,
} from "../controller/workoutController.js";
>>>>>>> 1408a5a43c21ff3d6a87bfddd07948f022a379d0

const router = express.Router();

// POST /api/workouts
<<<<<<< HEAD
router.post("/", addWorkout); // Changed from '/add-workout' to '/'
router.get("/", getWorkouts);
=======
router.post("/", addWorkout);
router.get("/", getWorkouts);
router.get("/date", getCalWorkouts);
>>>>>>> 1408a5a43c21ff3d6a87bfddd07948f022a379d0

export default router;
