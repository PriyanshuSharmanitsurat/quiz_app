// middleware/authenticate.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || "test_secret_key"; // keep consistent

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  // Extract token if present
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    // ❌ No token → reject request
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Attach decoded user to request
    req.user = decoded; // { id, username, email }
    next();
  } catch (error) {
    // ❌ Invalid token → reject request
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default authenticate;
