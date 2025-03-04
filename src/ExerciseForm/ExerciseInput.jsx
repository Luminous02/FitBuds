import React, {useState} from "react";
import "./ExerciseApp.css";
import {Link} from "react-router-dom";

const ExerciseInput = ({onAddExercise}) => {
    const [exercise, setExercise] = useState({name: "", duration: "", calories: ""});

    const handleChange = (e) => {
        setExercise({...exercise, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (exercise.name && exercise.duration && exercise.calories) {
            onAddExercise(exercise);
            setExercise({name: "", duration: "", calories: ""});
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Log Exercise</h1>

                <div className="input-box">
                    <input
                        type="text"
                        name="name"
                        placeholder="Exercise Name"
                        value={exercise.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-box">
                    <input
                        type="number"
                        name="duration"
                        placeholder="Duration (minutes)"
                        value={exercise.duration}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-box">
                    <input
                        type="number"
                        name="calories"
                        placeholder="Calories Burned"
                        value={exercise.calories}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Add Exercise</button>
            </form>

            <Link to="/exercise-output">View Exercises</Link>
        </div>
    );
};

export default ExerciseInput;