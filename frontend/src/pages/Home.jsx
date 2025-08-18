"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";

export default function ModernHome() {
  const [animate, setAnimate] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStartTest = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
        color: "#ffffff",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Navbar at top */}
      <div style={{ zIndex: 20, position: "relative" }}>
        <Navbar />
      </div>

      {/* Animated background elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
          opacity: animate ? 1 : 0,
          transition: "opacity 2s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite reverse",
          opacity: animate ? 1 : 0,
          transition: "opacity 2s ease 0.5s",
        }}
      />

      {/* Main content */}
      <div
        style={{
          textAlign: "center",
          zIndex: 10,
          maxWidth: "800px",
          margin: "0 auto",
          marginTop: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2rem",
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(-30px)",
            transition: "all 1s ease 0.2s",
          }}
        >
          <Sparkles
            style={{
              width: "32px",
              height: "32px",
              color: "#3b82f6",
              marginRight: "12px",
            }}
          />
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            QuizForAll
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            fontWeight: "800",
            lineHeight: "1.1",
            marginBottom: "1.5rem",
            background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s ease 0.4s",
          }}
        >
          Welcome to the Future of
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Interactive Learning
          </span>
        </h1>

        <p
          style={{
            fontSize: "1.25rem",
            color: "#94a3b8",
            marginBottom: "3rem",
            maxWidth: "600px",
            margin: "0 auto 3rem auto",
            lineHeight: "1.6",
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s ease 0.6s",
          }}
        >
          Challenge yourself with our comprehensive quiz platform. Test your knowledge, track your progress, and unlock your potential.
        </p>

        <button
          onClick={handleStartTest}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={{
            background: isHover
              ? "linear-gradient(135deg, #2563eb, #7c3aed)"
              : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            border: "none",
            padding: "16px 32px",
            fontSize: "1.1rem",
            fontWeight: "600",
            borderRadius: "50px",
            cursor: "pointer",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "0 auto",
            boxShadow: isHover
              ? "0 20px 40px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)"
              : "0 10px 30px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            transform: isHover ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: animate ? 1 : 0,
            backdropFilter: "blur(10px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: isHover ? "100%" : "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
              transition: "left 0.6s ease",
            }}
          />
          <Play style={{ width: "20px", height: "20px", fill: "currentColor" }} />
          Start Your Journey
          <ArrowRight
            style={{
              width: "20px",
              height: "20px",
              transform: isHover ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.3s ease",
            }}
          />
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
            marginTop: "4rem",
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s ease 1s",
            flexWrap: "wrap",
          }}
        >
          {[
            { number: "10K+", label: "Active Users" },
            { number: "500+", label: "Quiz Categories" },
            { number: "99%", label: "Success Rate" },
          ].map((stat, index) => (
            <div key={index} style={{ textAlign: "center", padding: "1rem" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#3b82f6",
                  marginBottom: "0.5rem",
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @media (max-width: 768px) {
          .stats-container {
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
