import React, {useState} from "react";
import "./Settings.css";

const Settings = () => {
    const [settings, setSettings] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "",
        unitTime: "minutes",
        unitWeight: "lbs",
        difficulty: "medium",
        notifications: true,
        privateProfile: false,

    });

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setSettings({
            ...settings,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Settings saved successfully!");
    };

    return (
        <div className="settings-container">
            <h1>Settings Page</h1>
            <form onSubmit={handleSubmit}>

                {/*Profile Settings*/}
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

                {/*Exercise Preferences*/}
                <section className="settings-section">
                    <h2>Exercise Preferences</h2>
                    <label>
                        Default Unit:
                        <select name="unit" value={settings.unit} onChange={handleChange}>
                        <option value="minutes">Minutes</option>
                        <option value="reps">Reps</option>
                        <option value="sets">Sets</option>
                        <option value="miles">Miles</option>
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

                {/* App Customization */}
                <section className="settings-section">
                    <h2>App Customization</h2>
                    <label>
                        Dark Mode:
                        <input type="checkbox" name="darkMode" checked={settings.darkMode} onChange={handleChange} />
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