import { pool } from "../config/db.js";

// Get all quiz questions
export const getQuizQuestions = async () => {
  const result = await pool.query("SELECT * FROM quizzes");
  return result.rows;
};

// Get user answers by userId
export const getUserAnswers = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM user_answers WHERE user_id = $1",
    [userId]
  );
  return result.rows;
};
