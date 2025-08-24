import { generateMCQs } from "../utils/geminiClient.js";
import { pool } from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

// ✅ Start a new quiz
export const startQuiz = async (req, res) => {
  const { topic, level, numQuestions } = req.body;
  const userId = req.user.id; // comes from auth middleware

  try {
    // Generate questions using Gemini
    const questions = await generateMCQs(topic, level, numQuestions);

    // Save quiz in DB
    const result = await pool.query(
      "INSERT INTO quizzes (user_id, topic, level, num_questions, questions) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, topic, level, numQuestions, JSON.stringify(questions)]
    );

    res.status(201).json({ quizId: result.rows[0].id, questions });
  } catch (error) {
    console.error("Error starting quiz:", error);
    res.status(500).json({ error: "Failed to start quiz" });
  }
};

// ✅ Submit quiz answers
export const submitQuiz = async (req, res) => {
  const { quizId, userAnswers } = req.body;
  const userId = req.user.id;

  try {
    // Fetch quiz belonging to this user
    const quizResult = await pool.query(
      "SELECT * FROM quizzes WHERE id = $1 AND user_id = $2",
      [quizId, userId]
    );

    if (quizResult.rows.length === 0) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const quiz = quizResult.rows[0];

    // Parse questions
    const questions =
      typeof quiz.questions === "string"
        ? JSON.parse(quiz.questions)
        : quiz.questions;

    const correctAnswers = questions.map((q) => q.answer);

    // Calculate score
    let score = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) score++;
    });

    const percentage = (score / questions.length) * 100;

    // Save user answers + score
    await pool.query(
      "UPDATE quizzes SET user_answers = $1, score = $2 WHERE id = $3",
      [JSON.stringify(userAnswers), score, quizId]
    );

    // Suggest video if score < 80%
    let videoLink = null;
    if (percentage < 80) {
      videoLink = await fetchYouTubeVideo(quiz.topic);
    }

    res.status(200).json({ score, percentage, videoLink });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ error: "Failed to submit quiz" });
  }
};

// ✅ Helper: fetch video from YouTube
const fetchYouTubeVideo = async (topic) => {
  try {
    const API_KEY = process.env.API_KEY;
    const encodedTopic = encodeURIComponent(topic);

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodedTopic}&maxResults=1&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId;
      return `https://www.youtube.com/watch?v=${videoId}`;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching YouTube video:", error);
    return null;
  }
};
