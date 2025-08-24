"use client"

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PlayCircle, BellRing, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStartTest = () => navigate("/quiz-form");

  const fetchNotification = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://quiz-app-1-pr6l.onrender.com/api/users/notification", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotification(res.data.notification || "No notifications found.");
    } catch (error) {
      console.error("Error fetching notification:", error);
      setNotification("Failed to fetch notification.");
    }
    setIsLoading(false);
  };

  return (
    <div style={styles.page}>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>

      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />

      <div style={styles.card}>
        <h1 style={styles.heading}>Welcome to <span style={{ color: "#3b82f6" }}>QUIZFORALL</span></h1>
        <p style={styles.subtitle}>
          Get ready to test your knowledge and improve your learning with custom quizzes!
        </p>

        <button onClick={handleStartTest} style={{ ...styles.button, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
          <PlayCircle style={styles.icon} />
          Start Test
        </button>

        <button
          onClick={fetchNotification}
          disabled={isLoading}
          style={{
            ...styles.button,
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            marginTop: "16px",
            opacity: isLoading ? 0.6 : 1,
            cursor: isLoading ? "not-allowed" : "pointer"
          }}
        >
          <BellRing style={styles.icon} />
          {isLoading ? "Fetching..." : "View Notification"}
        </button>

        {notification && (
          <p style={styles.notificationBox}>
            <strong>Notification:</strong> {notification}
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: "100vh",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    padding: "20px"
  },
  bgCircle1: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    top: "10%",
    left: "-150px",
    animation: "float 6s ease-in-out infinite",
    filter: "blur(80px)",
    opacity: 0.3
  },
  bgCircle2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    bottom: "10%",
    right: "-150px",
    animation: "float 7s ease-in-out infinite",
    filter: "blur(80px)",
    opacity: 0.3
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(12px)",
    borderRadius: "24px",
    padding: "40px",
    width: "100%",
    maxWidth: "520px",
    textAlign: "center",
    color: "#fff",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)"
  },
  heading: {
    fontSize: "36px",
    marginBottom: "16px"
  },
  subtitle: {
    fontSize: "18px",
    color: "#cbd5e1",
    marginBottom: "32px"
  },
  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "0.3s",
  },
  icon: {
    width: "20px",
    height: "20px"
  },
  notificationBox: {
    marginTop: "24px",
    fontSize: "16px",
    color: "#facc15",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: "10px",
    borderRadius: "10px"
  }
};

export default Dashboard;
