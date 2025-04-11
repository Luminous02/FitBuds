import React, { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import "./SplashPage.css";
import { useNavigate } from "react-router-dom";
import { FaL } from "react-icons/fa6";

const Splash = () => {
  const navigate = useNavigate();
  localStorage.removeItem("user");
  localStorage.removeItem("userID");

  const navigateLogin = () => {
    navigate("/login");
  };

  const navigateSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="splashwrapper active">
      <div className="logoHeader">
        <h2>
          FitBuds <img src="/fitBudsLogo.svg" id="splashLogo"></img>
        </h2>
      </div>

      <h1>Your family's new fitness companion</h1>

      <p>
        FitBuds is a personalized fitness platform designed for families and
        small groups to encourage friendly competition and improved wellness.
        Log workouts, set goals, cheer each other on, and more! Get started for
        free using the buttons below.
      </p>

      <div className="buttonGroup">
        <button onClick={navigateLogin} id="loginButton">
          Log In
        </button>
        <button onClick={navigateSignUp} id="signupButton">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Splash;
