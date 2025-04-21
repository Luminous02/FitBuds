import { pool } from "../config/db.js";

export const addWorkoutToDB = async (workout) => {
  try {
    // Format the date and time for MySQL
    const workoutDate = workout.date
      ? new Date(workout.date).toISOString().split("T")[0]
      : null;
    const workoutTime = workout.time ? formatTimeForMySQL(workout.time) : null;

    let points = 0;
    if (["Running", "Cycling", "Swimming"].includes(workout.type)) {
      points = workout.distance
        ? Math.round(parseFloat(workout.distance) * 100)
        : 0;
    } else if (["Weight Training", "HIIT"].includes(workout.type)) {
      points = workout.reps ? parseInt(workout.reps) * 10 : 0;
    }

    const query = `
      INSERT INTO workouts 
      (userID, date, type, distance, time, pace, reps, points) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      workout.userID || null,
      workoutDate,
      workout.type,
      workout.distance || null,
      workoutTime || null,
      workout.pace || null,
      workout.reps || null,
      points,
    ];

    const [result] = await pool.query(query, values);
    return {
      workoutID: result.insertId,
      ...workout,
      points,
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

export const getGroupPointsFromDB = async (groupID, period) => {
  try {
    let dateCondition = "";
    const params = [groupID];

    if (period === "today") {
      dateCondition = "AND DATE(w.date) = CURDATE()";
    } else if (period === "week") {
      dateCondition =
        "AND w.date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND w.date <= CURDATE()";
    } else if (period === "month") {
      dateCondition =
        "AND w.date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND w.date <= CURDATE()";
    }

    const query = `
      SELECT u.userID, u.fname AS name, COALESCE(SUM(w.points), 0) AS totalPoints, u.profilePicture
      FROM userData u
      LEFT JOIN workouts w ON u.userID = w.userID ${dateCondition}
      WHERE u.groupID = ?
      GROUP BY u.userID, u.fname, u.profilePicture
      ORDER BY totalPoints DESC
    `;

    const [results] = await pool.query(query, params);
    return results;
  } catch (error) {
    console.error("Database error in getGroupPointsFromDB:", error);
    throw error;
  }
};

export const getRecentGroupWorkoutsFromDB = async (groupID, limit = 5) => {
  try {
    const query = `
      SELECT w.workoutID, w.userID, w.type, w.time, w.points, u.fname AS name, a.username, u.profilePicture
      FROM workouts w
      JOIN userData u ON w.userID = u.userID
      JOIN accounts a ON u.userID = a.userID
      WHERE u.groupID = ?
      ORDER BY w.date DESC
      LIMIT ?
    `;
    const [workouts] = await pool.query(query, [groupID, limit]);
    return workouts;
  } catch (error) {
    console.error("Database error in getRecentGroupWorkoutsFromDB:", error);
    throw error;
  }
};
