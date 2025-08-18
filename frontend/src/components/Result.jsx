"use client";

import React from "react";

const Result = ({ resultData }) => {
  const { score, percentage, videoLink } = resultData;

  return (
    <div style={styles.page}>
      <style>
        {`
          @keyframes glow {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      <div style={styles.glow1} />
      <div style={styles.glow2} />

      <div style={styles.card}>
        <h2 style={styles.heading}>🎉 Quiz Result</h2>
        <p style={styles.text}>
          <strong>Your Score:</strong> {score}
        </p>
        <p style={styles.text}>
          <strong>Percentage:</strong> {percentage}%
        </p>

        {videoLink && (
          <div style={styles.videoSection}>
            <h3 style={styles.videoTitle}>📺 Recommended to Improve</h3>
            <a
              href={videoLink}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              👉 Watch Video on YouTube
            </a>
          </div>
        )}
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
    animation: "glow 6s infinite ease-in-out",
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
    animation: "glow 5s infinite ease-in-out",
    opacity: 0.3,
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(12px)",
    borderRadius: "24px",
    padding: "40px",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
  },
  heading: {
    fontSize: "30px",
    marginBottom: "20px",
    color: "#f9fafb",
  },
  text: {
    fontSize: "20px",
    margin: "10px 0",
    color: "#e5e7eb",
  },
  videoSection: {
    marginTop: "30px",
    background: "rgba(255,255,255,0.03)",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  videoTitle: {
    fontSize: "18px",
    color: "#93c5fd",
    marginBottom: "10px",
  },
  link: {
    textDecoration: "none",
    color: "#60a5fa",
    fontWeight: "bold",
    fontSize: "16px",
  },
};

export default Result;
