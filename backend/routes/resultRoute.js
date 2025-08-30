import express from "express";
import { getQuizWithAnswers } from "../controllers/resultController.js";

const router = express.Router();

// Route: GET /api/quiz/:userId
router.get("/:userId", getQuizWithAnswers);

export default router;
