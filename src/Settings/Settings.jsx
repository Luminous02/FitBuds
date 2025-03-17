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


    return (
        <h1>Settings Page</h1>
    );
};

export default Settings;