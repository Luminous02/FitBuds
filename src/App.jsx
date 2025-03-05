import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import LoginForm from "./LoginForm/LoginForm";
import ExerciseInput from "./ExerciseForm/ExerciseInput";
import ExerciseOutput from "./ExerciseForm/ExerciseOutput";
import Dashboard from "./Dashboard/Dashboard";
import { useEffect } from "react";

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
          <Route path="/exercise-input" element={<ExerciseInput />} />
          <Route path="/exercise-output" element={<ExerciseOutput />} />
          <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
