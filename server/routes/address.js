import express from "express";
import {
  createAddress,
  getAddress,
  updateAddress,
} from "../controllers/address.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createAddress); //add address
router.get("/", getAddress); // get address
router.patch("/", updateAddress); //update address

export default router;
