import express from "express";

import {
  getUserInfo,
  signin,
  signup,
  updateProfile,
  validateSignUp,
} from "../controllers/user.js";

const router = express.Router();

router.post("/validateSignUp", validateSignUp); // validate the information provided by the user on sign up
router.post("/signin", signin); //sign in
router.post("/signup", signup); //sign up
router.patch("/", updateProfile); // update profile
router.get("/", getUserInfo); // get user info

export default router;
