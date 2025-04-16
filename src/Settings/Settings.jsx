import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Settings.css";

const Settings = () => {
    // Load saved settings or use default values
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    password: "",
    unitTime: "minutes",
    unitWeight: "lbs",
    difficulty: "medium",
    notifications: true,
    privateProfile: false,
    groupCode: "",
  });

  const userID = localStorage.getItem("userID");
  console.log("userID from localStorage:", userID);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/user/${userID}`);
        const { name, email, unitTime, unitWeight, difficulty, notifications, privateProfile, groupCode } = response.data.user;

        setSettings((prevSettings) => ({
          ...prevSettings,
          name: name,
          email,
          unitTime: unitTime || "minutes",
          unitWeight: unitWeight || "lbs",
          difficulty: difficulty || "medium",
          notifications: notifications !== undefined ? notifications : true,
          privateProfile: privateProfile !== undefined ? privateProfile : false,
          groupCode: groupCode || "",
        }));
      } catch (error) {
        console.error("Failed to fetch user data:", error.response?.data || error.message);
      }
    };

    if (userID) {
      fetchUserData();
    }
  }, [userID]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save settings to localStorage when updated
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedSettings = {
        unitTime: settings.unitTime,
        unitWeight: settings.unitWeight,
        difficulty: settings.difficulty,
        notifications: settings.notifications,
        privateProfile: settings.privateProfile,
      };

      if(settings.password) {
        updatedSettings.password = settings.password;
      }
      if (settings.groupCode) {
        updatedSettings.groupCode = settings.groupCode;
      }

      await axios.put(`http://localhost:3000/api/auth/user/${userID}/settings`, updatedSettings);
      setSettings((prevSettings) => ({ ...prevSettings, password: "", groupCode: "" }));
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error.response?.data || error.message);
      alert("Failed to save settings. Please try again.");
    }
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      {/* Profile Information (Read-only) */}
      <section className="settings-section">
        <h2>User Information</h2>
        <div className="user-info">
          <p><strong>Name:</strong> {settings.name}</p>
          <p><strong>Email:</strong> {settings.email}</p>
        </div>
      </section>

      {/* Form for Editable Settings */}
      <form onSubmit={handleSubmit}>
        {/* Password Change */}
        <section className="settings-section">
          <h2>Change Password</h2>
          <label>
            New Password:
            <input 
              type="password" 
              name="password" 
              value={settings.password} 
              onChange={handleChange} 
            />
          </label>
        </section>

        {/* Exercise Preferences */}
        <section className="settings-section">
          <h2>Exercise Preferences</h2>
          <label>
            Time Unit:
            <select name="unitTime" value={settings.unitTime} onChange={handleChange}>
              <option value="minutes">Minutes</option>
              <option value="seconds">Seconds</option>
            </select>
          </label>
          <label>
            Weight Unit:
            <select name="unitWeight" value={settings.unitWeight} onChange={handleChange}>
              <option value="lbs">Lbs</option>
              <option value="kg">Kg</option>
            </select>
          </label>
          <label>
            Difficulty Level:
            <select name="difficulty" value={settings.difficulty} onChange={handleChange}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
        </section>

        {/* Notifications */}
        <section className="settings-section">
          <h2>Notifications</h2>
          <label>
            Enable Notifications:
            <input type="checkbox" name="notifications" checked={settings.notifications} onChange={handleChange} />
          </label>
        </section>

        {/* Privacy & Security */}
        <section className="settings-section">
          <h2>Privacy & Security</h2>
          <label>
            Private Profile:
            <input type="checkbox" name="privateProfile" checked={settings.privateProfile} onChange={handleChange} />
          </label>
        </section>

        <button type="submit" className="save-btn">Save Settings</button>
      </form>
    </div>
  );
};

export default Settings;