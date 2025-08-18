// controllers/quizController.js
import { generateMCQs } from "../utils/geminiClient.js";
import {pool} from "../config/db.js";



export const startQuiz = async (req, res) => {
  const { topic, level, numQuestions } = req.body;
  
  const userId = req.user.id; // Assuming user ID is available in req.user
  
  try {
    const questions = await generateMCQs(topic, level, numQuestions);
    
    const result = await pool.query(
      "INSERT INTO quizzes (user_id, topic, level, num_questions, questions) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, topic, level, numQuestions, JSON.stringify(questions)]
    );
    res.status(201).json({ quizId: result.rows[0].id, questions });
  } catch (error) {
    console.log(error);
    console.error("Error starting quiz:", error);
    
     res.status(500).json({ error: "Failed to start quiz" });
  }
};

export const submitQuiz = async (req, res) => {
  const { quizId, userAnswers } = req.body;
  
  const userId = req.user.id;

  try {
    const quizResult = await pool.query(
      "SELECT * FROM quizzes WHERE id = $1 AND user_id = $2",
      [quizId, userId]
    );
    const quiz = quizResult.rows[0];
    

    // ✅ Parse questions if stored as JSON string
    const questions = typeof quiz.questions === "string" ? JSON.parse(quiz.questions) : quiz.questions;
    const correctAnswers = questions.map((q) => q.answer);
    console.log(correctAnswers);
    console.log(userAnswers)

    let score = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) score++;
    });

    const percentage = (score / questions.length) * 100;

    await pool.query(
      "UPDATE quizzes SET user_answers = $1, score = $2 WHERE id = $3",
      [JSON.stringify(userAnswers), score, quizId]
    );

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

const fetchYouTubeVideo = async (topic) => {
  // Implement YouTube API call to fetch the first video link for the given topic
  return "https://www.youtube.com/watch?v=example";
};
