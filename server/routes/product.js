import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
