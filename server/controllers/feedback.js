import mongoose from "mongoose";
import Feedback from "../models/feedback.js";

export const addFeedback = async (req, res) => {
  const feedback = req.body;

  const newFeedback = new Feedback({
    ...feedback,
    creator: req.userId,
  });

  try {
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch {
    res.status(409).json({ message: error.message });
  }
};
