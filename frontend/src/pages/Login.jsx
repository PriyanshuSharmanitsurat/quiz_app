"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, User, Lock, LogIn } from "lucide-react"
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ usernameOrEmail: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const isAdmin = form.usernameOrEmail === "admin123" && form.password === "secure@admin"

    try {
      const url = isAdmin
        ? "https://quiz-app-1-pr6l.onrender.com/api/admin/login"
        : "https://quiz-app-1-pr6l.onrender.com/api/auth/login"

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isAdmin
          ? { username: form.usernameOrEmail, password: form.password }
          : form),
      })

      const data = await res.json()

      if (!res.ok || !data.token) {
        throw new Error(data.message || "Login failed")
      }

      localStorage.setItem(isAdmin ? "adminToken" : "token", data.token)

      // ✅ Redirect based on role
      if (isAdmin) {
        navigate("/admin-dashboard")
      } else {
        navigate("/dashboard")
      }

    } catch (err) {
      setError(isAdmin ? "Admin login failed" : "User login failed")
    }

    setIsLoading(false)
  }

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />

      <div style={styles.card}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={styles.iconWrapper}>
            <LogIn style={styles.icon} />
          </div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your account</p>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={styles.label}>Username or Email</label>
            <div style={{ position: "relative" }}>
              <User style={styles.inputIcon} />
              <input
                name="usernameOrEmail"
                value={form.usernameOrEmail}
                onChange={handleChange}
                placeholder="Enter your username or email"
                required
                style={styles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={styles.label}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock style={styles.inputIcon} />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                style={styles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.toggleButton}
              >
                {showPassword ? <EyeOff style={styles.eyeIcon} /> : <Eye style={styles.eyeIcon} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.submitButton,
              background: isLoading
                ? "rgba(59, 130, 246, 0.5)"
                : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? (
              <>
                <div style={styles.loader} />
                Signing in...
              </>
            ) : (
              <>
                <LogIn style={styles.eyeIcon} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Don&apos;t have an account?
            <Link to="/signup" style={styles.link}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
// Helper styles
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
  },
  bgCircle1: {
    position: "absolute",
    top: "10%",
    left: "10%",
    width: "200px",
    height: "200px",
    background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
    borderRadius: "50%",
    animation: "float 6s ease-in-out infinite",
  },
  bgCircle2: {
    position: "absolute",
    bottom: "10%",
    right: "10%",
    width: "150px",
    height: "150px",
    background: "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
    borderRadius: "50%",
    animation: "float 8s ease-in-out infinite reverse",
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    padding: "40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    position: "relative",
    zIndex: 10,
  },
  iconWrapper: {
    width: "60px",
    height: "60px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px auto",
  },
  icon: {
    width: "24px",
    height: "24px",
    color: "white",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: "16px",
    margin: 0,
  },
  label: {
    display: "block",
    color: "#e2e8f0",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "16px 48px 16px 48px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#ffffff",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },
  inputIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "20px",
    height: "20px",
    color: "#64748b",
  },
  toggleButton: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#64748b",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  eyeIcon: {
    width: "20px",
    height: "20px",
  },
  submitButton: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
  },
  loader: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  errorBox: {
    background: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "20px",
    color: "#fca5a5",
    fontSize: "14px",
    textAlign: "center",
  },
  footer: {
    textAlign: "center",
    marginTop: "24px",
    paddingTop: "24px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  footerText: {
    color: "#64748b",
    fontSize: "14px",
    margin: 0,
  },
  link: {
    color: "#3b82f6",
    cursor: "pointer",
    textDecoration: "underline",
    marginLeft: "5px",
  },
}

// Input focus/blur style helpers
const handleFocus = (e) => {
  e.target.style.border = "1px solid #3b82f6"
  e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)"
}
const handleBlur = (e) => {
  e.target.style.border = "1px solid rgba(255, 255, 255, 0.1)"
  e.target.style.boxShadow = "none"
}

export default Login 

