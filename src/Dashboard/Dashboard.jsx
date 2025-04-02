import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Outlet, Navigate, replace } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clears user session data
        localStorage.removeItem("user");

        // Redirects to the Login page
        navigate("/");
    };

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkmode") === "active"
    );
    const [sidebarActive, setSidebarActive] = useState(false);
    
    useEffect(() => {
        if(darkMode) {
            document.body.classList.add("darkmode");
            localStorage.setItem("darkMode", "active");
        } else {
            document.body.classList.remove("darkmode");
            localStorage.setItem("darkMode", "inactive");
        }
    }, [darkMode]);

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    return (
        <div className="dashboard-container">
            <header>
                <div className="searchbar">
                    <input type="text" placeholder="Search" />
                    <div className="searchbtn">
                        <i className="bx bx-search-alt-2"></i>
                    </div>
                </div>
                <div className="help">
                    <div className="circle">
                        <i className="bx bx-help-circle"></i>
                    </div>
                </div>
            </header>

            <div className={`sidebar ${sidebarActive ? "active" : ""}`}>
                <div className="top">
                    <div className="logo">
                        <i className="bx bxl-foursquare"></i>
                        <span>FitBuds</span>
                    </div>
                    <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
                </div>
                <div className="user">
                    <img src="user-circle-regular-24.png" alt="User" className="user-img" />
                    <div>
                        <p className="bold">Guest</p>
                        <p>Parent</p>
                    </div>
                </div>
                <ul>
                    <li>
                        <Link to="home">
                            <i className="bx bx-home"></i>
                            <span className="nav-item">Home</span>
                        </Link>
                        <span className="tooltip">Home</span>
                    </li>
                    <li>
                        <Link to="calendar">
                            <i className="bx bx-calendar"></i>
                            <span className="nav-item">Calendar</span>
                        </Link>
                        <span className="tooltip">Calendar</span>
                    </li>
                    <li>
                        <Link to="exercises">
                            <i className="bx bx-dumbbell"></i>
                            <span className="nav-item">Exercises</span>
                        </Link>
                        <span className="tooltip">Exercises</span>
                    </li>
                    <li>
                        <Link to="progress">
                            <i className="bx bx-trending-up"></i>
                            <span className="nav-item">Progress</span>
                        </Link>
                        <span className="tooltip">Progress</span>
                    </li>
                    <li>
                        <Link to="settings">
                            <i className="bx bx-cog"></i>
                            <span className="nav-item">Settings</span>
                        </Link>
                        <span className="tooltip">Settings</span>
                    </li>
                    <li>
                        <button onClick={handleLogout}>
                            <i className="bx bx-log-out"></i>
                            <span className="nav-item">Logout</span>
                        </button>
                        <span className="tooltip">Logout</span>
                    </li>
                    <li id="theme-switch" onClick={() => setDarkMode(!darkMode)}>
                        <button>
                            <i className={darkMode ? "bx bx-sun" : "bx bxs-moon"}></i>
                            <span className="nav-itm" id="theme-text">{darkMode ? "Light Mode" : "Dark Mode"}</span>
                        </button>
                        <span className="tooltip" id="theme-tooltip">{darkMode ? "Light Mode" : "Dark Mode"}</span>
                    </li>
                </ul>
            </div>

            <div className="main-content">
                <Outlet/> {/* This renders the nested page content */}
            </div>
        </div>
        
    );
};
export default Dashboard;