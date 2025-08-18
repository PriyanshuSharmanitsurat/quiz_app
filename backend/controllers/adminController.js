import {pool} from "../config/db.js";
import jwt from "jsonwebtoken";

const ADMIN_USERNAME = "admin123";
const ADMIN_PASSWORD = "secure@admin";

export const adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, { expiresIn: "2h" });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, username, email, notification FROM users");
    res.status(200).json({ users: result.rows });
  } catch (error) {
    console.error("Error fetching users from DB:", error); // ✅ This is key
    res.status(500).json({ error: "Failed to fetch users" });
  }
};


export const sendNotification = async (req, res) => {
  const { userId, message } = req.body;

  try {
    await pool.query("UPDATE users SET notification = $1 WHERE id = $2", [message, userId]);
    res.status(200).json({ message: "Notification sent" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send notification" });
  }
};
