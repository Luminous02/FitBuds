import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginForm from "./LoginForm/LoginForm";
import ExerciseInput from "./ExerciseForm/ExerciseInput";
import ExerciseOutput from "./ExerciseForm/ExerciseOutput";

function App() {
  const [count, setCount] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //track login state

  const addExercise = (newExercise) => {
    setExercises([...exercises, newExercise]);
  };

  return (
    <>
      <LoginForm />
      <div>
        <ExerciseInput onAddExercise={addExercise} />
        <ExerciseOutput exercises={exercises} />
      </div>
    </>
  );
}

export default App;
