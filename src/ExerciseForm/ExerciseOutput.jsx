import React from "react";
import "./ExerciseApp.css";
import { Link } from "react-router-dom";

const ExerciseOutput = ({exercises}) => {
    return(
        <div className="exercise-input-wrapper">
            <h1>Exercise Log</h1>
            {exercises.length === 0 ? (
                <p>No exercises logged yet.</p>
            ) : (
                <ul className="exercise-list">
                    {exercises.map((exercise, index) => (
                        <li key={index} className="exercise-item">
                            <h3>{exercise.name}</h3>
                            <p>Duration: {exercise.duration} minutes</p>
                            <p>Calories Burned: {exercise.calories}</p>
                        </li>
                    ))}
                </ul>
            )}

            <Link to="/exercise-input">Add Moree Exerecises</Link>
        </div>
    );
};

export default ExerciseOutput;