// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsernameOrEmail } from '../models/User.js';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await findUserByUsernameOrEmail(username);
  if (existingUser) return res.status(400).json({ message: 'Username or email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ username, email, password: hashedPassword });

  res.status(201).json({ message: 'User created successfully', user });
};

export const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  const user = await findUserByUsernameOrEmail(usernameOrEmail);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user });
};
