import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: String,
  cost: Number,
  details: String,
  photos: [String],
  category: String,
  creator: String,
  name: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  productStatus: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
