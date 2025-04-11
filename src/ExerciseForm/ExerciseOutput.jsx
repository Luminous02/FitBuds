import React, { useState, useEffect } from "react";
import "./ExerciseApp.css";
import { Link } from "react-router-dom";
import axios from "axios";

const ExerciseOutput = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const userID = localStorage.getItem("userID");
        if (!userID) {
          throw new Error("User not authenticated");
        }

        const response = await axios.get(
          `http://localhost:3000/api/workouts?userID=${userID}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          setWorkouts(response.data.workouts);
        } else {
          setError(response.data.message || "Failed to fetch workouts");
        }
      } catch (err) {
        console.error("Error fetching workouts:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load workouts"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="exercise-input-wrapper">
        <h1>Exercise Log</h1>
        <p>Loading your workouts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="exercise-input-wrapper">
        <h1>Exercise Log</h1>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="exercise-input-wrapper">
<<<<<<< HEAD
      <h1>Workout Log</h1>
=======
      <h1>Recent Workouts</h1>
>>>>>>> 1408a5a43c21ff3d6a87bfddd07948f022a379d0
      {workouts.length === 0 ? (
        <div className="no-workouts">
          <p>No workouts logged yet.</p>
        </div>
      ) : (
        <div className="workout-list">
          {workouts.map((workout) => (
            <div key={workout.workoutID} className="workout-card">
              <div className="workout-header">
                <h3>{workout.type}</h3>
                <span className="workout-date">
<<<<<<< HEAD
                  {new Date(workout.workout_date).toLocaleDateString()}
=======
                  {formatWorkoutDate(workout.date)}
>>>>>>> 1408a5a43c21ff3d6a87bfddd07948f022a379d0
                </span>
              </div>

              <div className="workout-details">
                {workout.distance && (
                  <p>
                    <strong>Distance:</strong> {workout.distance}{" "}
                    {workout.workout_type === "Swimming" ? "yards" : "miles"}
                  </p>
                )}
                {workout.time && (
                  <p>
                    <strong>Time:</strong> {formatTimeDisplay(workout.time)}
                  </p>
                )}
                {workout.pace && (
                  <p>
                    <strong>Pace:</strong> {workout.pace} min/
                    {workout.workout_type === "Swimming" ? "100yd" : "mile"}
                  </p>
                )}
                {workout.reps && (
                  <p>
                    <strong>Reps:</strong> {workout.reps}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

<<<<<<< HEAD
=======
const formatWorkoutDate = (dateString) => {
  try {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Date not available";
  }
};

>>>>>>> 1408a5a43c21ff3d6a87bfddd07948f022a379d0
// Helper function to format time from HH:MM:SS to minutes
function formatTimeDisplay(timeString) {
  if (!timeString) return "N/A";

  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + seconds / 60;

  // Return as decimal minutes (e.g., "45.5 minutes")
  return `${totalMinutes.toFixed(1)} minutes`;
}

export default ExerciseOutput;
