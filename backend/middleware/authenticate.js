// middleware/authenticate.js
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    // ✅ No token → assign fake user with numeric ID
    req.user = {
      id: 0, // integer (safe default for guest user)
      username: "guest_user",
      role: "guest",
    };
    return next();
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "test_secret_key");

    // Attach user data
    req.user = decoded;
    next();
  } catch (error) {
    // ✅ Invalid token → fallback to fake user
    req.user = {
      id: 8, // integer instead of string
      username: "nn",
      role: "guest",
    };
    next();
  }
};

export default authenticate;
