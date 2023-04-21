import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductsBySearch,
  updateProduct,
} from "../controllers/product.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createProduct);
router.get("/", getAllProducts);
router.patch("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);
router.get("/search", getProductsBySearch);

export default router;
