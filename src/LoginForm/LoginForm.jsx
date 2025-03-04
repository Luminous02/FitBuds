import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
//import axios from 'axios';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({username: "", password:""});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); //reset error message

    try {
      const response = await fetch("https://INSERTURLHERE/api/login", { //FIX URL
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if(response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login Successful!");
        window.location.href = "/dashboard"; //redirect to new page (INSERT PROPER NAME)
      }
      else {
        setError(data.message || "Invalid login credentials");
      }
    } catch (err){
      setError("Failed to connect to the server");
    }
  };



  return (
    <div className="wrapper">
      <form action="">
        <h1>Login</h1>

        {error && <p className="error">{error}</p>}

        <div className="input-box">
          <input 
            type="text" 
            name="username"
            placeholder="Username" 
            value={credentials.username}
            onChange={handleChange}
            required />
          <FaUser className="icon" />
        </div>

        <div className="input-box">
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={credentials.password}
            onChange={handleChange}
            required />
          <FaLock className="icon" />
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit">Login</button>

        <div className="register-link">
          <p>
            Don't have an account?<a href="#"> Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
