<<<<<<< HEAD
import React from "react";
import { useNavigate } from "react-router-dom";
=======
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
>>>>>>> 1408a5a43c21ff3d6a87bfddd07948f022a379d0
import ExerciseInput from "./ExerciseInput";
import ExerciseOutput from "./ExerciseOutput";
import "./Progress.css";
import axios from "axios";

const ProgressPage = () => {
<<<<<<< HEAD
    const navigate = useNavigate();

  return (
    <div className="progress-container">
      <ExerciseInput></ExerciseInput>
      <ExerciseOutput></ExerciseOutput>
=======
  const navigate = useNavigate();
  const location = useLocation();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const userID = localStorage.getItem("userID");
        if (!userID) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/api/workouts?userID=${userID}`
        );

        if (response.data.success) {
          setWorkouts(response.data.workouts);
        } else {
          setError(response.data.message || "Failed to fetch workouts");
        }
      } catch (error) {
        setError(error.response?.data?.message || "Error loading workouts");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [navigate, location.state?.refresh]); // Re-fetch when refresh state changes

  return (
    <div className="progress-container">
      <ExerciseInput
        onWorkoutAdded={() =>
          navigate(".", { state: { refresh: true }, replace: true })
        }
      />
      {loading ? (
        <div className="loading-message">Loading workouts...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <ExerciseOutput workouts={workouts} />
      )}
>>>>>>> 1408a5a43c21ff3d6a87bfddd07948f022a379d0
    </div>
  );
};

export default ProgressPage;
