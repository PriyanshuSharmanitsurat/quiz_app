// routes/quizRoutes.js
import express from "express";
import { startQuiz, submitQuiz } from "../controllers/quizController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/start", authenticate, startQuiz);
router.post("/submit", authenticate, submitQuiz);

export default router;
