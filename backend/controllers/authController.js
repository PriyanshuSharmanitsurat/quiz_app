import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, findUserByUsernameOrEmail } from '../models/User.js';

const SECRET_KEY = "shivam_secret"; // ⚠️ move to .env in production

// Signup (hash password before saving)
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const existingUser = await findUserByUsernameOrEmail(username) 
                      || await findUserByUsernameOrEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 2);

    // Create user with hashed password
    const user = await createUser({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login with JWT
export const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await findUserByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
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
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
