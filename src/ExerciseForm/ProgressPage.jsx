import React from "react";
import { useNavigate } from "react-router-dom";
import ExerciseInput from "./ExerciseInput";
import ExerciseOutput from "./ExerciseOutput";
import "./Progress.css";

const ProgressPage = () => {
  const navigate = useNavigate();

  return (
    <div className="progress-container">
      <ExerciseInput></ExerciseInput>
      <ExerciseOutput></ExerciseOutput>
    </div>
  );
};

export default ProgressPage;
