import userModel from "../models/userModel.js";
import { registerUser, loginUser } from "../services/authServices.js";
import { pool } from "../config/db.js"

export const register = async (req, res) => {
  const { email, username, password, fname, bday } = req.body;
  if (!email || !fname || !bday || !username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields required" });
  }

  const user = new userModel({ email, username, password, fname, bday });

  try {
    const response = await registerUser(user);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return {
      success: false,
      message: "Registration failed, please try again later",
    };
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  try {
    const response = await loginUser({ username, password });

    if (!response) {
      console.error("No response received from loginUser");
      return res.status(500).json({
        success: false,
        message: "Internal server error - no response from service",
      });
    }

    if (response.success) {
      return res.status(200).json({ success: true, user: response.user });
    } else {
      return res.status(401).json(response);
    }
  } catch (error) {
    console.error("Login controller error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed, please try again later",
    });
  }
};

export const getUser = async (req, res) => {
  const userID = req.params.id;
  console.log("Fetching user with ID:", userID);

  if(!userID) {
    return res.status(400).json({ success: false, message: "User ID is required"});
  }

  try {
    console.log("Fetching user with ID:", userID); 
    const [userRows] = await pool.query(
      `SELECT u.email, u.fname AS name, u.bday, a.username, u.unitTime, u.unitWeight, u.difficulty, u.notifications, u.privateProfile 
      FROM userData u 
      JOIN accounts a ON u.userID = a.userID
      WHERE a.userID = ?`,
      [userID]
    );

    console.log("Query result:", userRows);

    if (userRows.length === 0) {
      console.log("No user found for ID:", userID);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("User data found:", userRows[0]);
    return res.status(200).json({ success: true, user: userRows[0] });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch user data" });
    
  }
};

export const updateUserSettings = async (req, res) => {
  const userID = req.params.id;
<<<<<<< HEAD
  const { unitTime, unitWeight, difficulty, notifications, privateProfile, password } = req.body;
=======
  const { unitTime, unitWeight, difficulty, notifications, privateProfile } = req.body;
>>>>>>> 1408a5a43c21ff3d6a87bfddd07948f022a379d0

  if (!userID) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  try {
    const [result] = await pool.query(
      `UPDATE userData 
       SET unitTime = ?, unitWeight = ?, difficulty = ?, notifications = ?, privateProfile = ?
       WHERE userID = ?`,
      [unitTime, unitWeight, difficulty, notifications, privateProfile, userID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

<<<<<<< HEAD
    if (password) {
      const [passwordResult] = await pool.query(
        `UPDATE accounts
        SET password = ?
        WHERE userID = ?`,
        [password, userID]
      );

      if (passwordResult.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "User not found in accounts" });
      }
    }

=======
>>>>>>> 1408a5a43c21ff3d6a87bfddd07948f022a379d0
    return res.status(200).json({ success: true, message: "Settings updated successfully" });
  } catch (error) {
    console.error("Error updating settings:", error);
    return res.status(500).json({ success: false, message: "Failed to update settings" });
  }
};