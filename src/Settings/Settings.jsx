import React, {useState} from "react";
import "./Settings.css";

const Settings = () => {
    // Load saved settings or use default values
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem("exerciseAppSettings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          name: "",
          email: "",
          password: "",
          unitTime: "minutes",
          unitWeight: "lbs",
          difficulty: "medium",
          notifications: true,
          privateProfile: false,
        };
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save settings to localStorage when updated
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("exerciseAppSettings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>

        {/* Profile Settings */}
        <section className="settings-section">
          <h2>Profile Settings</h2>
          <label>
            Name:
            <input type="text" name="name" value={settings.name} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={settings.email} onChange={handleChange} />
          </label>
          <label>
            New Password:
            <input type="password" name="password" value={settings.password} onChange={handleChange} />
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