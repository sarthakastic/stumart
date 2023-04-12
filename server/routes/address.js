import express from "express";
import { createAddress, getAddress } from "../controllers/address.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createAddress);
router.get("/", getAddress);

export default router;
