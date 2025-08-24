// controllers/quizController.js
import { generateMCQs } from "../utils/geminiClient.js";
import {pool} from "../config/db.js";
import dotenv from 'dotenv';



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
    try {
        // Replace with your actual YouTube Data API key
        const API_KEY = process.env.API_KEY;
        
        // Encode the topic for URL
        const encodedTopic = encodeURIComponent(topic);
        
        // Make API request to search for videos
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodedTopic}&maxResults=1&key=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if any videos were found
        if (data.items && data.items.length > 0) {
            const videoId = data.items[0].id.videoId;
            console.log('hi')
            console.log(`https://www.youtube.com/watch?v=${videoId}`)

            return `https://www.youtube.com/watch?v=${videoId}`;
        } else {
            throw new Error('No videos found for the given topic');
        }
        
    } catch (error) {
        console.error('Error fetching YouTube video:', error);
        throw error; // Re-throw the error for the caller to handle
    }
};


