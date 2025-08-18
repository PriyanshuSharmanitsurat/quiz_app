import express from "express";
import { adminLogin, getAllUsers, sendNotification } from "../controllers/adminController.js";
import { authenticateAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/users", authenticateAdmin, getAllUsers);
router.post("/notify", authenticateAdmin, sendNotification);

export default router;
