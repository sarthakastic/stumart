import express from "express";
import { addFeedback } from "../controllers/feedback.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addFeedback); //add feedback

export default router;
