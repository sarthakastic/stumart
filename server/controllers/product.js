import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.js";

export const getAllProducts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Product.countDocuments({});

    const product = await Product.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: product,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  const newProduct = new Product({
    ...product,
    creator: req.userId,
    createtAt: new Date().toISOString(),
  });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch {
    res.status(409).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id: _id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with this ID");

  const updatedProduct = await Product.findByIdAndUpdate(
    _id,
    { ...product, _id },
    {
      new: true,
    }
  );
  res.json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Product with this ID");
  }
  await Product.findByIdAndRemove(id);
  res.json({ message: "Product deleted succesfully" });
};
