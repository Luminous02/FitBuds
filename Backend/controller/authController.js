import userModel from "../models/userModel.js";
import { registerUser, loginUser } from "../services/authServices.js";

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
    const [userRows] = await pool.query(
      `SELECT u.email, u.fname AS name, u.bday, a.username 
      FROM userData u 
      JOIN accounts a ON u.email = a.username
      WHERE a.userID = ?`,
      [userID]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user: userRows[0] });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch user data" });
    
  }
};