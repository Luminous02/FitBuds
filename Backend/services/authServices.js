import { pool } from "../config/db.js";

export const registerUser = async (user) => {
  console.log(user);

  try {
    const acctQuery = "INSERT INTO accounts (username, password) VALUES (?,?)";
    const acctValues = [user.username, user.password];
    const [acctResult] = await pool.query(acctQuery, acctValues);
    const userID = acctResult.insertId; // Get the auto-incremented userID

    const uDataQuery = "INSERT INTO userData (userID, email, fname, bday) VALUES (?,?,?,?)";
    const uDataValues = [userID, user.email, user.fname, user.bday];
    await pool.query(uDataQuery, uDataValues);

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "Failed to register user, please try again later",
    };
  }
};



export const loginUser = async (credentials) => {
  try {
    console.log("Login attempt with username:", credentials.username);
    // First check if username exists
    const [userRows] = await pool.query(
      "SELECT * FROM accounts WHERE username = ?",
      [credentials.username]
    );

    if (userRows.length === 0) {
      return { success: false, message: "Invalid username or password" };
    }

    const user = userRows[0];
    console.log("User found:", { userID: user.userID, username: user.username });


    if (credentials.password !== user.password) { // Plain text comparison
      console.log("Password mismatch:", credentials.password, "vs", user.password);
      return { success: false, message: "Invalid username or password" };
    }

    return {
      success: true,
      user: {
        id: user.userID,
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

