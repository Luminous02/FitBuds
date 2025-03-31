import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const navDashboard = () => {
    navigate("/Dashboard");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login-user",
        formValues
      );

      if (response.data.success) {
        navDashboard();
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.response || error.message);
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="loginWrapper active">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
            required
          />
          <FaUser className="icon" />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            required
          />
          <FaLock className="icon" />
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <Link to="/forgot-password" id="forgotPass">
            Forgot password?
          </Link>
        </div>

        <button type="submit" id="loginSubmit">
          Login
        </button>

        <div className="register-link">
          <p>Don't have an account?</p>
        </div>
        <Link to="/register" id="registerA">
          Register
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
