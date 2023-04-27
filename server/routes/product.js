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

router.post("/", auth, createProduct); //create product
router.get("/search", getProductsBySearch); // get product by search from category and title
router.get("/", getAllProducts); // get all products
router.get("/:id", auth, getProduct); // get details of a particular product using product ID
router.patch("/:id", updateProduct); // update a product using Product ID
router.delete("/:id", auth, deleteProduct); // delete a product using product ID
router.get("/userData/:id", getUserProducts); // get all products uploaded by a user using User ID

export default router;
