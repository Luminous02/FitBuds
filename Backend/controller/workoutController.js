import {
  addWorkoutToDB,
  getWorkoutsFromDB,
  getWorkoutsByDateFromDB,
  getGroupPointsFromDB,
  getRecentGroupWorkoutsFromDB,
} from "../services/workoutService.js";

export const addWorkout = async (req, res) => {
  const { userID, type, distance, time, pace, reps, date } = req.body;

  if (!type) {
    return res.status(400).json({
      success: false,
      message: "User ID and workout type are required",
    });
  }

  // Validate date format if provided
  if (date && isNaN(new Date(date).getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid date format",
    });
  }

  // Validate time is a positive number if provided
  if (time && (isNaN(time) || time <= 0)) {
    return res.status(400).json({
      success: false,
      message: "Time must be a positive number",
    });
  }

  try {
    const result = await addWorkoutToDB({
      userID,
      type,
      distance,
      time,
      pace,
      reps,
      date: date || new Date(), // Use current date if not provided
    });
    return res.status(200).json({
      success: true,
      message: "Workout added successfully",
      workout: result,
    });
  } catch (error) {
    console.error("Error adding workout:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add workout",
      error: error.message,
    });
  }
};

export const getWorkouts = async (req, res) => {
  try {
    const { userID } = req.query;

    if (!userID) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const workouts = await getWorkoutsFromDB(userID);

    return res.status(200).json({
      success: true,
      workouts,
    });
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch workouts",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getCalWorkouts = async (req, res) => {
  try {
    const { userID, date } = req.query;

    if (!userID) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    // Use the service function
    const workouts = await getWorkoutsByDateFromDB(userID, date);

    return res.status(200).json({
      success: true,
      workouts,
    });
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch workouts",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getMonthWorkouts = async (req, res) => {
  try {
    const { userID, year, month } = req.query;

    if (!userID || !year || !month) {
      return res.status(400).json({
        success: false,
        message: "User ID, year and month are required",
      });
    }

    const workouts = await getWorkoutsByMonthFromDB(userID, year, month);
    return res.status(200).json({
      success: true,
      workouts,
    });
  } catch (error) {
    console.error("Error fetching monthly workouts:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch monthly workouts",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getGroupPoints = async (req, res) => {
  const { groupID, period } = req.query;

  if (!groupID) {
    return res.status(400).json({ success: false, message: "Group ID is required" });
  }

  if (!["today", "week", "month"].includes(period)) {
    return res.status(400).json({ success: false, message: "Invalid period. Use 'today', 'week', or 'month'" });
  }

  try {
    const groupPoints = await getGroupPointsFromDB(groupID, period);
    return res.status(200).json({
      success: true,
      groupPoints,
    });
  } catch (error) {
    console.error("Error fetching group points:", error.message, error.stack);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch group points: " + (error.message || "Unknown error"),
    });
  }
};

export const getRecentGroupWorkouts = async (req, res) => {
  const { groupID, limit } = req.query;

  if (!groupID) {
    return res.status(400).json({ success: false, message: "Group ID is required" });
  }

  try {
    const workouts = await getRecentGroupWorkoutsFromDB(groupID, parseInt(limit) || 5);
    return res.status(200).json({
      success: true,
      workouts,
    });
  } catch (error) {
    console.error("Error fetching recent group workouts:", error.message, error.stack);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch recent group workouts: " + (error.message || "Unknown error"),
    });
  }
};

