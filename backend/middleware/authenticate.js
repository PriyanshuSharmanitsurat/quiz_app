// middleware/authenticate.js
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized access. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // store decoded user info in request
    next(); // move to next middleware or route
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

export default authenticate;
