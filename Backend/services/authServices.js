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
