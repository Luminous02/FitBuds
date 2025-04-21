import React, { useState } from "react";
import "./RegisterForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    username: "",
    password: "",
    fname: "",
    bday: "",
  });

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
    console.log(formValues);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register-user",
        formValues
      );
      console.log(response);

      navDashboard();
    } catch (error) {
      console.error(
        "Error during submission:",
        error.response || error.message
      );
    }
  };

  return (
    <div className="registerWrapper active">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>

        <div className="input-box">
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            required
          />
          <FaUser className="icon" />
        </div>
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
        <div className="input-box">
          <input
            type="text"
            placeholder="First Name"
            name="fname"
            value={formValues.fname}
            onChange={handleInputChange}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="date"
            name="bday"
            value={formValues.bday}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" id="loginSubmit">
          Register
        </button>
        <a href="#" id="forgotPass">
          Forgot password?
        </a>
      </form>
    </div>
  );
};

export default RegisterForm;
