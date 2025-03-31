import { pool } from "../config/db.js";

export const addWorkoutToDB = async (workout) => {
  try {
    // Format the date and time for MySQL
    const workoutDate = workout.date
      ? new Date(workout.date).toISOString().split("T")[0]
      : null;
    const workoutTime = workout.time ? formatTimeForMySQL(workout.time) : null;

    const query = `
      INSERT INTO workouts 
      (userID, date, type, distance, time, pace, reps) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      workout.userID || null,
      workoutDate,
      workout.type,
      workout.distance || null,
      workoutTime || null,
      workout.pace || null,
      workout.reps || null,
    ];

    const [result] = await pool.query(query, values);
    return {
      workoutID: result.insertId,
      ...workout,
    };
  } catch (error) {
    console.error("Database error in addWorkoutToDB:", error);
    throw error;
  }
};

// Helper function to convert minutes to HH:MM:SS format
function formatTimeForMySQL(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  const secs = Math.floor((minutes * 60) % 60);
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
