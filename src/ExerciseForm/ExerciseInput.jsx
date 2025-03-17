
import React, {useState} from "react";
import "./ExerciseApp.css";
import {Link, useNavigate} from "react-router-dom";

const ExerciseInput = ({ onAddExercise }) => {
    const navigate = useNavigate();
    const [exercise, setExercise] = useState({name: "", duration: "", calories: ""});
    
    console.log("ExerciseInput component rendered");


  const handleChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (exercise.name && exercise.duration && exercise.calories) {
            onAddExercise(exercise);
            setExercise({name: "", duration: "", calories: ""});
            navigate("/dashboard/exercise-output");
        }
    };

    const handleViewExercises = () => {
        navigate("/dashboard/exercise-output");
    };

    const submitButtonStyle = {
        background: "#187b60",
        color: "white",
        width: "100%",
        height: "45px",
        border: "none",
        outline: "none",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "700",
        marginTop: "10px"
    };
    
    
    

    return (
        
        <div className="exercise-input-wrapper">
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

                <button type="submit" style={submitButtonStyle}>Add Exercise</button>
            </form>

            <button onClick={handleViewExercises} style={submitButtonStyle}>
                View Exercises
            </button>
            {/*<Link to="/exercise-output">View Exercises</Link>*/}
        </div>
    );
};

export default ExerciseInput;
