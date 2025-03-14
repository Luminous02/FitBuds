import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Splash from "./SplashPage/SplashPage";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import Dashboard from "./Dashboard/Dashboard";
import Home from "./Home/Home";
import Calendar from "./Calendar/Calendar";
import ExerciseInput from "./ExerciseForm/ExerciseInput";
import ExerciseOutput from "./ExerciseForm/ExerciseOutput";
import ProgressPage from "./ExerciseForm/ProgressPage";
import Settings from "./Settings/Settings";
import NotFound from "./NotFound/NotFound";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const isAuthenticated = localStorage.getItem("token");
  const [exercises, setExercises] = useState([]);

  const addExercise = (newExercise) => {
    console.log("Adding exercise:", newExercise);
    setExercises([...exercises, newExercise]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="exercise-input" element={<ExerciseInput onAddExercise={addExercise} />} />
          <Route path="exercise-output" element={<ExerciseOutput exercises={exercises}/>} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
