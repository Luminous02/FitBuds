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

export const getWorkoutsFromDB = async (userID) => {
  try {
    const [workouts] = await pool.query(
      "SELECT * FROM workouts WHERE userID = ? ORDER BY date DESC",
      [userID]
    );

    return workouts;
  } catch (error) {
    console.error("Database error in getWorkoutsFromDB:", error);
    throw error;
  }
};

export const getWorkoutsByDateFromDB = async (userID, date) => {
  try {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error("Invalid date format. Expected YYYY-MM-DD");
    }

    const [workouts] = await pool.query(
      "SELECT * FROM workouts WHERE userID = ? AND DATE(date) = ? ORDER BY date DESC",
      [userID, date]
    );
    return workouts;
  } catch (error) {
    console.error("Database error in getWorkoutsByDateFromDB:", error);
    throw error;
  }
};

export const getWorkoutsByMonthFromDB = async (userID, year, month) => {
  try {
    const startDate = `${year}-${month.toString().padStart(2, "0")}-01`;
    const endDate = new Date(year, month, 0).toISOString().split("T")[0];

    const [workouts] = await pool.query(
      "SELECT * FROM workouts WHERE userID = ? AND date BETWEEN ? AND ? ORDER BY date DESC",
      [userID, startDate, endDate]
    );
    return workouts;
  } catch (error) {
    console.error("Database error in getWorkoutsByMonthFromDB:", error);
    throw error;
  }
};
