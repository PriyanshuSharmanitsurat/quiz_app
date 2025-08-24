import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, findUserByUsernameOrEmail } from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

// ✅ Signup (hash password before saving)
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const existingUser =
      (await findUserByUsernameOrEmail(username)) ||
      (await findUserByUsernameOrEmail(email));

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // ✅ Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await createUser({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Login with JWT
export const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await findUserByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
