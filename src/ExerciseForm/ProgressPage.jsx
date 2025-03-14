import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Progress.css";

const ProgressPage = () => {
    const navigate = useNavigate();

    return (
        <div className="progress-container">
            <h1>Exercise Progress</h1>
            <div className='progress-buttons'>
                <button className="add-exercise-btn" onClick={() => navigate("/dashboard/exercise-input")}>
                    Add New Exercise
                </button>
                <button className="view-exercise-btn" onClick={() => navigate("/dashboard/exercise-output")}>
                    View Exercise Logs
                </button>
            </div>
        </div>
    );
};

export default ProgressPage;
