import express from "express";

import {
  getUserInfo,
  signin,
  signup,
  updateProfile,
} from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin); //sign in
router.post("/signup", signup); //sign up
router.patch("/", updateProfile); // update profile
router.get("/", getUserInfo);

export default router;
