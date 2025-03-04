import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginForm from "./LoginForm/LoginForm";
import ExerciseInput from "./ExerciseForm/ExerciseInput";
import ExerciseOutput from "./ExerciseForm/ExerciseOutput";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";


function App() {
  const isAuthenticated = localStorage.getItem("token");
  const [count, setCount] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //track login state

  const addExercise = (newExercise) => {
    setExercises([...exercises, newExercise]);
  };

  return (
    <>
      <Router>
        <Routes>
          {/*redirect to exercise input if logged in*/}
          <Route path="/" element={isAuthenticated ? <Navigate to="/exercise-input"/> : <LoginForm />} />
          <Route path="exercise-input" element={<ExerciseInput />} />
          <Route path="exercise-output" element={<ExerciseOutput />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
