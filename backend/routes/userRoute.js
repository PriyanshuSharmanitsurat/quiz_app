import express from "express";
import { getUserNotification } from "../controllers/userController.js";
import authenticateUser from "../middleware/authenticate.js";

const router = express.Router();

router.get("/notification", authenticateUser, getUserNotification);

export default router;
