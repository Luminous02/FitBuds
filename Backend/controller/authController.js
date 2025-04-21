import userModel from "../models/userModel.js";
import { registerUser, loginUser } from "../services/authServices.js";
import { pool } from "../config/db.js"

const generateGroupCode = async () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";
  let code; 
  let unique = false;

  while (!unique) {
    code = "";
    for(let i = 0; i < 3; i++) code += chars[Math.floor(Math.random() * chars.length)];
    for(let i = 0; i < 3; i++) code += nums[Math.floor(Math.random() * nums.length)];
    const [rows] = await pool.query("SELECT 1 FROM userData WHERE groupCode = ?", [code]);
    unique = rows.length === 0;
  }
  return code; //e.g. "ABC123"

};

export const register = async (req, res) => {
  const { email, username, password, fname, bday } = req.body;
  if (!email || !fname || !bday || !username || !password) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  const user = new userModel({ email, username, password, fname, bday });

  try {
    const groupCode = await generateGroupCode();
    const response = await registerUser(user, groupCode);
    if (response.success) {
      return res.status(200).json({
        success: true,
        message: "User registered successfully",
        user: { ...response.user, groupCode },
      });
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    console.error("Registration error:", error.message, error.stack);
    return res.status(500).json({
      success: false,
      message: "Registration failed: " + (error.message || "Unknown error"),
    });
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
      `SELECT u.email, u.fname AS name, u.bday, a.username, u.unitTime, u.unitWeight, u.difficulty, u.notifications, u.privateProfile, u.groupCode, u.groupID,
          l.fname AS groupLeaderName
      FROM userData u 
      JOIN accounts a ON u.userID = a.userID
      LEFT JOIN userData l ON u.groupID = l.userID
      WHERE a.userID = ?`,
      [userID]
    );

    console.log("Query result:", userRows);

    if (userRows.length === 0) {
      console.log("No user found for ID:", userID);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If groupCode is null, generate and assign one
    if (!userRows[0].groupCode) {
      const newGroupCode = await generateGroupCode();
      await pool.query(
        `UPDATE userData 
         SET groupCode = ?, groupID = COALESCE(groupID, ?)
         WHERE userID = ?`,
        [newGroupCode, userID, userID]
      );
      userRows[0].groupCode = newGroupCode;
      userRows[0].groupID = userRows[0].groupID || userID;
      userRows[0].groupLeaderName = userRows[0].name; // Leader is self
      console.log(`Assigned groupCode ${newGroupCode} and groupID ${userID} to userID ${userID}`);
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
  const { unitTime, unitWeight, difficulty, notifications, privateProfile, password, groupCode } = req.body;

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

//join a group if groupCode is provided
  if (groupCode) {
    console.log(`Attempting to join group with code: ${groupCode} for userID: ${userID}`);
    const [groupRows] = await pool.query(
      `SELECT userID FROM userData WHERE groupCode = ? AND groupID = userID`,
      [groupCode]
    );

    if (groupRows.length === 0) {        
      console.log(`Invalid group code: ${groupCode}`);
      return res.status(400).json({ success: false, message: "Invalid group code"});
    }

    const parentID = groupRows[0].userID;
    console.log(`Joining group with parentID: ${parentID}`);
    await pool.query(
      `UPDATE userData
      SET groupID = ?
      WHERE userID = ?`,
      [parentID, userID]
    );
  }
    return res.status(200).json({ success: true, message: "Settings updated successfully" });
  } catch (error) {
    console.error("Error updating settings:", error);
    return res.status(500).json({ success: false, message: "Failed to update settings" });
  }
};

export const deleteUser = async (req, res) => {
  const userID = req.params.id;

  if (!userID) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  try {
    // Check if user exists
    const [userRows] = await pool.query("SELECT 1 FROM accounts WHERE userID = ?", [userID]);
    if (userRows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Handle group members if user is a group leader
    await pool.query(
      `UPDATE userData 
       SET groupID = NULL 
       WHERE groupID = ? AND userID != ?`,
      [userID, userID]
    );

    // Delete from userData
    const [userDataResult] = await pool.query(
      "DELETE FROM userData WHERE userID = ?",
      [userID]
    );

    // Delete from accounts
    const [accountsResult] = await pool.query(
      "DELETE FROM accounts WHERE userID = ?",
      [userID]
    );

    if (userDataResult.affectedRows === 0 && accountsResult.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error.message, error.stack);
    return res.status(500).json({
      success: false,
      message: "Failed to delete user: " + (error.message || "Unknown error"),
    });
  }
};


export const assignGroupCodes = async (req, res) => {
  try {
    // Fetch users with null or empty groupCode
    const [users] = await pool.query(
      `SELECT userID FROM userData WHERE groupCode IS NULL OR groupCode = ''`
    );

    if (users.length === 0) {
      return res.status(200).json({ success: true, message: "No users need group codes" });
    }

    // Assign a groupCode to each user
    for (const user of users) {
      const newGroupCode = await generateGroupCode();
      await pool.query(
        `UPDATE userData 
         SET groupCode = ?, groupID = COALESCE(groupID, ?)
         WHERE userID = ?`,
        [newGroupCode, user.userID, user.userID]
      );
      console.log(`Assigned groupCode ${newGroupCode} and groupID ${user.userID} to userID ${user.userID}`);
    }

    return res.status(200).json({
      success: true,
      message: `Assigned group codes to ${users.length} users`,
    });
  } catch (error) {
    console.error("Error assigning group codes:", error.message, error.stack);
    return res.status(500).json({
      success: false,
      message: "Failed to assign group codes: " + (error.message || "Unknown error"),
    });
  }
};

export const leaveGroup = async (req, res) => {
  const userID = req.params.id;
  console.log("User attempting to leave group:", userID);

  if (!userID) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  try {
    // Check if user exists and get their groupID
    const [userRows] = await pool.query(
      `SELECT groupID FROM userData WHERE userID = ?`,
      [userID]
    );

    if (userRows.length === 0) {
      console.log("No user found for ID:", userID);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { groupID } = userRows[0];

    // If user is already a group leader, no need to leave
    if (groupID === parseInt(userID)) {
      console.log("User is already a group leader:", userID);
      return res.status(400).json({ success: false, message: "You are already the group leader" });
    }

    // Reset groupID to userID
    await pool.query(
      `UPDATE userData 
       SET groupID = ?
       WHERE userID = ?`,
      [userID, userID]
    );

    console.log(`User ${userID} left group, groupID reset to ${userID}`);
    return res.status(200).json({ success: true, message: "Successfully left the group" });
  } catch (error) {
    console.error("Error leaving group:", error.message, error.stack);
    return res.status(500).json({ success: false, message: "Failed to leave group" });
  }
};