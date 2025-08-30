import { getQuizQuestions, getUserAnswers } from "../models/resultModel.js";

export const getQuizWithAnswers = async (req, res) => {
  try {
    const userId = req.params.userId; // userId from URL params

    // Fetch data
    const questions = await getQuizQuestions();
    const userAnswers = await getUserAnswers(userId);

    // Map user answers by question index
    const answersMap = userAnswers.reduce((acc, ans, index) => {
      acc[index] = ans.answer;
      return acc;
    }, {});

    // Combine data
    const response = questions.map((q, index) => ({
      question: q.question,
      options: q.options,
      correctAnswer: q.answer,
      userAnswer: answersMap[index] || null,
    }));

    res.json(response);
  } catch (error) {
    console.error("Error fetching quiz with answers:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
