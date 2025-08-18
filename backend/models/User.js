// models/User.js
import { pool } from '../config/db.js';

export const createUser = async ({ username, email, password }) => {
  const result = await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, password]
  );
  return result.rows[0];
};

export const findUserByUsernameOrEmail = async (value) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE username = $1 OR email = $1',
    [value]
  );
  return result.rows[0];
};
