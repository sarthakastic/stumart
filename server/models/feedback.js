import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
  feedback: String,
  name: String,
  contact: Number,
  creator: String,
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
