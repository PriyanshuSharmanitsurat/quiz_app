"use client"

import React, { useState } from "react";
import axios from "axios";
import Quiz from "./Quiz";
import { FileEdit, BarChart, ListOrdered } from "lucide-react";

const QuizForm = () => {
  const [formData, setFormData] = useState({
    topic: "",
    level: "",
    numQuestions: 5,
  });
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const startQuiz = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please login.");
        return;
      }

      setIsLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/quiz/start",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuizData(response.data); // Assuming backend returns quizData
    } catch (error) {
      console.error("Error starting quiz:", error);
      alert("Failed to start quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (quizData) return <Quiz quizData={quizData} />;

  return (
    <div style={styles.page}>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>

      <div style={styles.bg1} />
      <div style={styles.bg2} />

      <form style={styles.card} onSubmit={startQuiz}>
        <h2 style={styles.title}>Create Your Custom Quiz</h2>

        <div style={styles.inputGroup}>
          <FileEdit style={styles.icon} />
          <input
            type="text"
            name="topic"
            placeholder="Enter Topic"
            value={formData.topic}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <BarChart style={styles.icon} />
          <input
            type="text"
            name="level"
            placeholder="Difficulty Level (e.g., Easy, Medium, Hard)"
            value={formData.level}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <ListOrdered style={styles.icon} />
          <input
            type="number"
            name="numQuestions"
            min="1"
            max="20"
            value={formData.numQuestions}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            ...styles.button,
            opacity: isLoading ? 0.6 : 1,
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Loading..." : "Start Quiz"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  page: {
    height: "100vh",
    background: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  bg1: {
    position: "absolute",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    top: "10%",
    left: "-100px",
    animation: "float 5s ease-in-out infinite",
    filter: "blur(80px)",
    opacity: 0.3,
  },
  bg2: {
    position: "absolute",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    bottom: "10%",
    right: "-100px",
    animation: "float 6s ease-in-out infinite",
    filter: "blur(80px)",
    opacity: 0.3,
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(12px)",
    borderRadius: "24px",
    padding: "40px",
    width: "100%",
    maxWidth: "520px",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
    color: "#facc15",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "10px 14px",
  },
  icon: {
    color: "#cbd5e1",
    marginRight: "10px",
    width: "20px",
    height: "20px",
  },
  input: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "16px",
    flex: 1,
  },
  button: {
    padding: "14px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "10px",
  },
};

export default QuizForm;
