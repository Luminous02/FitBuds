import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Settings.css";
import { useNavigate } from "react-router-dom";

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
    groupCode: "", //user's own groupCode (read only)
    joinGroupCode: "", //input for joining another group
    groupLeaderName: "", //Name of group leader
  });

  const [error, setError] = useState("");
  const [isGroupLeader, setIsGroupLeader] = useState(true); // Track if user is group leader


  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();
  console.log("userID from localStorage:", userID);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/user/${userID}`);
        const { name, email, unitTime, unitWeight, difficulty, notifications, privateProfile, groupCode, groupID, groupLeaderName } = response.data.user;

        // Check if user is group leader (groupID === userID)
        const isLeader = groupID === parseInt(userID);

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
          joinGroupCode: "",
          groupLeaderName: groupLeaderName || "",
        }));
        setIsGroupLeader(isLeader);
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
    setError("");
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

      if (settings.joinGroupCode) {
        updatedSettings.groupCode = settings.joinGroupCode;
      }

      const response = await axios.put(`http://localhost:3000/api/auth/user/${userID}/settings`, updatedSettings);
      if (response.data.success) {
        // If joining a new group, update isGroupLeader
        if (settings.joinGroupCode) {
          const groupResponse = await axios.get(`http://localhost:3000/api/auth/user/${userID}`);
          setIsGroupLeader(groupResponse.data.user.groupID === parseInt(userID));
          setSettings((prevSettings) => ({
            ...prevSettings,
            groupLeaderName: groupResponse.data.user.groupLeaderName || "",
          }));
        }
        setSettings((prevSettings) => ({ ...prevSettings, password: "", joinGroupCode: "" }));
        alert("Settings saved successfully!");
      } else {
        setError(response.data.message || "Failed to save settings");
      }
    } catch (error) {
      console.error("Failed to save settings:", error.response?.data || error.message);
      alert("Failed to save settings. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3000/api/auth/user/${userID}`);
      if (response.data.success) {
        localStorage.removeItem("userID");
        localStorage.removeItem("user");
        alert("Account deleted successfully!");
        navigate("/login");
      } else {
        setError(response.data.message || "Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error.response || error.message);
      setError(
        error.response?.data?.message || "Cannot connect to server. Please try again."
      );
    }
  };


  return (
    <div className="settings-container">
      <h1>Settings</h1>

      {error && <div className="error-message">{error}</div>}

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

    {/*join family*/}
        <section className="settings-section">
        <h2>Family Group</h2>
          {isGroupLeader && settings.groupCode && (
            <div className="group-code-display">
              <p><strong>Your Group Code:</strong> {settings.groupCode}</p>
              <p>Share this code with others to let them join your family group.</p>
            </div>
          )}         
          {!isGroupLeader && settings.groupLeaderName && (
            <div className="group-leader-display">
              <p>You are in <strong>{settings.groupLeaderName}</strong>'s family group.</p>
            </div>
          )}
           <label>
            Join a Family:
            <input
              type="text"
              name="joinGroupCode"
              value={settings.joinGroupCode}
              onChange={handleChange}
              placeholder="Enter another person's group code"
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
      <section className="settings-section">
        <h2>Account Management</h2>
        <button
          className="delete-account-btn"
          onClick={handleDeleteAccount}
          style={{ backgroundColor: "#ff4d4d", color: "white", marginTop: "10px" }}
        >
          Delete Account
        </button>
      </section>

    </div>
  );
};

export default Settings;