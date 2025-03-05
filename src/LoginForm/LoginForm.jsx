import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

  const [user, setUser] = useState({ username: '', password: '' })
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(user.username === "guest" && user.password === "password"){
      alert("Valid user");
      navigate("/Dashboard");
    } else{
      alert("Invalid user");
    }
  }

  return (
    <div className="wrapper active">
      <form action="">
        <h1>Login</h1>

        {error && <p className="error">{error}</p>}

        <div className="input-box">
          <input type="text" placeholder="Username" required 
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}/>
          <FaUser className="icon" />
        </div>

        <div className="input-box">
          <input type="password" placeholder="Password" required 
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}/>
          <FaLock className="icon" />
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" onClick={(e) => handleLogin(e)}>Login</button>

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
