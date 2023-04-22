import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getProductsBySearch,
  getUserProducts,
  updateProduct,
} from "../controllers/product.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createProduct);
router.get("/search", getProductsBySearch);
router.get("/", getAllProducts);
router.get("/:id", auth, getProduct);
router.patch("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);
router.get("/userData/:id", getUserProducts);

export default router;
