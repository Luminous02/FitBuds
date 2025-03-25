import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";

export const registerUser = async (user) => {
  console.log(user);

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const uDataQuery =
      "INSERT INTO userData (email, fname, bday) VALUES (?,?,?)";
    const uDataValues = [user.email, user.fname, user.bday];
    const acctQuery = "INSERT INTO accounts (username, password) VALUES (?,?)";
    const acctValues = [user.username, user.password];

    await pool.query(acctQuery, acctValues);
    await pool.query(uDataQuery, uDataValues);

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    return {
      success: false,
      message: "Failed to register user, please try again later",
    };
  }
};

export const loginUser = async (credentials) => {
  try {
    // First check if username exists
    const [userRows] = await pool.query(
      "SELECT * FROM accounts WHERE username = ?",
      [credentials.username]
    );

    if (userRows.length === 0) {
      return { success: false, message: "Invalid username or password" };
    }

    const user = userRows[0];

    // Compare passwords (plain text comparison as requested)
    if (credentials.password !== user.password) {
      return { success: false, message: "Invalid username or password" };
    }

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Login failed, please try again later",
    };
  }
};
