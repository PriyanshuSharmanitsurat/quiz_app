import express from "express";
import { getQuizWithAnswers } from "../controllers/resultController";

const router = express.Router();

// Route: GET /api/quiz/:userId
router.get("/:userId", getQuizWithAnswers);

export default router;
