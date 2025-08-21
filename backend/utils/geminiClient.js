import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("❌ Missing GEMINI_API_KEY in .env file");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateMCQs = async (topic, level, numQuestions) => {
  const prompt = `Generate ${numQuestions} multiple-choice questions on the topic "${topic}" for the "${level}" level. Provide four options for each question and indicate the correct answer. Format the response strictly as a JSON array like this: 
[
  {
    "question": "What is 2 + 2?",
    "options": ["2", "3", "4", "5"],
    "answer": "4"
  }
]`;

  // ✅ use flash (cheaper/faster) or switch back to pro
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(prompt);

    // ✅ safer way than indexing
    const text = result.response.text();

    console.log("Generated text:", text);
    return parseQuestions(text);
  } catch (error) {
    console.error("❌ Error generating MCQs:", error);
    return fallbackQuestions(topic, level, numQuestions);
  }
};

const parseQuestions = (text) => {
  try {
    // clean code fences
    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // try to extract JSON array only
    const match = cleanText.match(/\[[\s\S]*\]/);
    if (!match) throw new Error("No JSON array found");

    const parsed = JSON.parse(match[0]);
    if (!Array.isArray(parsed)) throw new Error("Expected an array of questions");
    return parsed;
  } catch (err) {
    console.error("❌ Failed to parse questions:", err.message || err);
    return [];
  }
};

const fallbackQuestions = (topic, level, numQuestions) => {
  return Array.from({ length: numQuestions }).map((_, i) => ({
    question: `Sample fallback question ${i + 1} on ${topic} (${level})`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option A",
  }));
};
