"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Result from "./Result";
import { TimerIcon } from "lucide-react";

const Quiz = ({ quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(120);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    if (timer <= 0) {
      handleNext(); // Auto move if timer runs out
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex, timer]);

  const handleAnswer = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(120);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/quiz/submit",
        {
          quizId: quizData.quizId,
          userAnswers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResultData(response.data);
      setShowResult(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (showResult) {
    return <Result resultData={resultData} />;
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <div style={styles.page}>
      <style>
        {`
          @keyframes glow {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>

      <div style={styles.glow1} />
      <div style={styles.glow2} />

      <div style={styles.card}>
        <div style={styles.timerBox}>
          <TimerIcon style={{ marginRight: "8px", color: "#facc15" }} />
          <span style={styles.timer}>Time Left: {Math.max(timer, 0)}s</span>
        </div>

        <h2 style={styles.question}>
          Q{currentQuestionIndex + 1}. {currentQuestion.question}
        </h2>

        <div style={styles.options}>
          {currentQuestion.options.map((option, index) => (
            <label key={index} style={styles.option}>
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={userAnswers[currentQuestionIndex] === option}
                onChange={() => handleAnswer(option)}
                style={{ marginRight: "10px" }}
              />
              {option}
            </label>
          ))}
        </div>

        <div style={{ marginTop: "30px" }}>
          {currentQuestionIndex < quizData.questions.length - 1 ? (
            <button style={styles.button} onClick={handleNext}>
              Next
            </button>
          ) : (
            <button style={styles.button} onClick={submitQuiz}>
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  glow1: {
    position: "absolute",
    top: "20%",
    left: "-100px",
    width: "200px",
    height: "200px",
    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
    borderRadius: "50%",
    filter: "blur(100px)",
    animation: "glow 5s infinite ease-in-out",
    opacity: 0.3,
  },
  glow2: {
    position: "absolute",
    bottom: "10%",
    right: "-100px",
    width: "200px",
    height: "200px",
    background: "linear-gradient(to right, #22c55e, #16a34a)",
    borderRadius: "50%",
    filter: "blur(100px)",
    animation: "glow 6s infinite ease-in-out",
    opacity: 0.3,
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(12px)",
    borderRadius: "24px",
    padding: "40px",
    color: "#fff",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
  },
  timerBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: "20px",
  },
  timer: {
    fontSize: "16px",
    fontWeight: "600",
  },
  question: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "24px",
    color: "#f9fafb",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  option: {
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: "10px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  button: {
    padding: "14px 28px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Quiz;
