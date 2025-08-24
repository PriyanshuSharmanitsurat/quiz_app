"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const token = localStorage.getItem("adminToken");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://quiz-app-1-pr6l.onrender.com/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const sendNotification = async () => {
    await axios.post(
      "https://quiz-app-1-pr6l.onrender.com/api/admin/notify",
      {
        userId: selectedUser,
        message,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert("Notification sent!");
    setMessage("");
    setSelectedUser(null);
    fetchUsers(); // Refresh data
  };

  return (
    <div style={styles.page}>
      <style>
        {`
          @keyframes glow {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      <div style={styles.glow1} />
      <div style={styles.glow2} />

      <div style={styles.card}>
        <h2 style={styles.heading}>🛠️ Admin Dashboard</h2>
        <p style={styles.subheading}>Manage users and send notifications</p>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Notification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.notification || "None"}</td>
                  <td>
                    <button
                      style={styles.notifyButton}
                      onClick={() => setSelectedUser(user.id)}
                    >
                      Notify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedUser && (
          <div style={styles.notifyBox}>
            <h4 style={{ color: "#fff" }}>
              Send Notification to <span style={{ color: "#93c5fd" }}>User ID: {selectedUser}</span>
            </h4>
            <input
              type="text"
              value={message}
              placeholder="Enter message"
              onChange={(e) => setMessage(e.target.value)}
              style={styles.input}
            />
            <button style={styles.sendButton} onClick={sendNotification}>
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    position: "relative",
    overflow: "hidden",
  },
  glow1: {
    position: "absolute",
    top: "15%",
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
    maxWidth: "1100px",
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "24px",
    padding: "40px",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  subheading: {
    fontSize: "16px",
    color: "#ccc",
    marginBottom: "30px",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "30px",
  },
  notifyButton: {
    padding: "8px 16px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  notifyBox: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "300px",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none",
    background: "#1e293b",
    color: "#fff",
    outline: "none",
  },
  sendButton: {
    backgroundColor: "#22c55e",
    color: "#fff",
    padding: "10px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default AdminDashboard;
