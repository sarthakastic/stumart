import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createProduct);
router.get("/", getAllProducts);
router.patch("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;
