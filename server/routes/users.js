import express from "express";

import {
  getUserInfo,
  signin,
  signup,
  updatePassword,
  updateProfile,
  validateSignUp,
  validateUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/validateSignUp", validateSignUp); // validate the information provided by the user on sign up
router.post("/validateUser", validateUser); // validate user on edit password to check if user exists or not
router.post("/signin", signin); //sign in
router.post("/signup", signup); //sign up
router.patch("/", updateProfile); // update profile
router.get("/", getUserInfo); // get user info
router.patch("/updatePassword", updatePassword); // update password

export default router;
