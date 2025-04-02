import React, { useState, useEffect } from "react";
import "./ExerciseApp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExerciseInput = ({ currentUser }) => {
  const navigate = useNavigate();
  const [workout, setWorkout] = useState({
    date: new Date().toISOString().split("T")[0], // Default to today's date
    type: "",
    distance: "",
    time: "",
    pace: "",
    reps: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate pace whenever time or distance changes
  useEffect(() => {
    if (workout.time && workout.distance) {
      const timeInMinutes = parseFloat(workout.time);
      const distance = parseFloat(workout.distance);
      if (timeInMinutes > 0 && distance > 0) {
        const calculatedPace = (timeInMinutes / distance).toFixed(2);
        setWorkout((prev) => ({ ...prev, pace: calculatedPace }));
      }
    } else {
      setWorkout((prev) => ({ ...prev, pace: "" }));
    }
  }, [workout.time, workout.distance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Basic validation
    if (!workout.type) {
      setError("Please select a workout type");
      setIsSubmitting(false);
      return;
    }

    // Additional validation for cardio workouts
    if (["Running", "Cycling", "Swimming"].includes(workout.type)) {
      if (!workout.distance || !workout.time) {
        setError("Distance and time are required for this workout type");
        setIsSubmitting(false);
        return;
      }
    }

    // Additional validation for strength workouts
    if (["Weight Training", "HIIT"].includes(workout.type)) {
      if (!workout.reps) {
        setError("Reps are required for this workout type");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/workouts",
        {
          userID: currentUser?.id || null,
          date: workout.date,
          type: workout.type,
          distance: workout.distance || null,
          time: workout.time || null,
          pace: workout.pace || null,
          reps: workout.reps || null,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Reset form on success
        setWorkout({
          date: new Date().toISOString().split("T")[0],
          type: "",
          distance: "",
          time: "",
          pace: "",
          reps: "",
        });
        navigate("/dashboard/progress");
      } else {
        setError(response.data.message || "Failed to save workout");
      }
    } catch (error) {
      console.error("Error saving workout:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while saving your workout. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="exercise-input-container">
      <h1>Log Your Workout</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Workout Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={workout.date}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]} // Can't select future dates
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Workout Type</label>
          <select
            id="type"
            name="type"
            value={workout.type}
            onChange={handleChange}
            required
          >
            <option value="">Select a workout type</option>
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Swimming">Swimming</option>
            <option value="Weight Training">Weight Training</option>
            <option value="HIIT">HIIT</option>
          </select>
        </div>

        {["Running", "Cycling", "Swimming"].includes(workout.type) && (
          <>
            <div className="form-group">
              <label htmlFor="distance">
                Distance ({workout.type === "Swimming" ? "yards" : "miles"})
              </label>
              <input
                type="number"
                id="distance"
                name="distance"
                value={workout.distance}
                onChange={handleChange}
                min="0.1"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time (minutes)</label>
              <input
                type="number"
                id="time"
                name="time"
                value={workout.time}
                onChange={handleChange}
                min="1"
                step="1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="pace">
                Pace (min/{workout.type === "Swimming" ? "100yd" : "mile"})
              </label>
              <input
                type="text"
                id="pace"
                name="pace"
                value={workout.pace || ""}
                readOnly
                className="read-only"
              />
            </div>
          </>
        )}

        {["Weight Training", "HIIT"].includes(workout.type) && (
          <div className="form-group">
            <label htmlFor="reps">Total Reps</label>
            <input
              type="number"
              id="reps"
              name="reps"
              value={workout.reps}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        )}

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Workout"}
        </button>
      </form>
    </div>
  );
};

export default ExerciseInput;