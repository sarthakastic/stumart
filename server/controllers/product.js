import express from "express";
import fs from "fs";
import * as mimeTypes from "mime-types";
import mongoose from "mongoose";
import Product from "../models/product.js";

export const getAllProducts = async (req, res) => {
  const { page } = req.query;

  const { limit } = req.query;

  try {
    const LIMIT = limit;
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

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Product.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  const newProduct = new Product({
    ...product,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  // Convert selectedFile to file object
  const fileBuffer = Buffer.from(product.photos, "base64");

  // Write file buffer to a temporary file
  const tempFilePath = "/tmp/" + Date.now() + "-tempfile";
  fs.writeFileSync(tempFilePath, fileBuffer);

  // Check file size
  const stats = fs.statSync(tempFilePath);
  const fileSizeInBytes = stats.size;
  const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
  fs.unlinkSync(tempFilePath); // Delete temporary file

  if (fileSizeInMB > 30) {
    return res.status(400).json({ message: "File size exceeds 30MB." });
  }

  const fileExtension = product.photos.split(";")[0].split("/")[1];
  const mimeType = mimeTypes.lookup(fileExtension);

  // Add allowed file types here
  const allowedMimeTypes = ["image/jpeg", "image/png"];

  if (!mimeType || !allowedMimeTypes.includes(mimeType)) {
    return res.status(400).json({ message: "Invalid file type." });
  }

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch {
    res.status(409).json({ message: error.message });
  }
};

export const updateProductStatus = async (req, res) => {
  const { id: _id } = req.params;

  const product = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
    _id,
    { ...product, _id },
    {
      new: true,
    }
  );
  res.json(updatedProduct);
};

export const updateProduct = async (req, res) => {
  const { id: _id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No profile with this ID");

  // Convert selectedFile to file object
  const fileBuffer = Buffer.from(product.photos, "base64");

  // Write file buffer to a temporary file
  const tempFilePath = "/tmp/" + Date.now() + "-tempfile";
  fs.writeFileSync(tempFilePath, fileBuffer);

  // Check file size
  const stats = fs.statSync(tempFilePath);
  const fileSizeInBytes = stats.size;
  const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
  fs.unlinkSync(tempFilePath); // Delete temporary file

  if (fileSizeInMB > 30) {
    return res.status(400).json({ message: "File size exceeds 30MB." });
  }

  const fileExtension =
    typeof product?.photos === "string"
      ? product.photos.split(";")[0].split("/")[1]
      : product.photos[0].split(";")[0].split("/")[1];
  const mimeType = mimeTypes.lookup(fileExtension);

  // Add allowed file types here
  const allowedMimeTypes = ["image/jpeg", "image/png"];

  if (typeof product?.photos === "string") {
  } else {
    if (!mimeType || !allowedMimeTypes.includes(mimeType)) {
      return res.status(400).json({ message: "Invalid file type." });
    }
  }

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

export const getProductsBySearch = async (req, res) => {
  const { searchQuery, category } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await Product.find({
      $or: [{ title }, { category }],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserProducts = async (req, res) => {
  const creator = req.params.id;

  try {
    // Create a query object with the `creator` field and value
    const product = await Product.find({
      creator: creator,
    }).sort({ _id: -1 });

    // Check if the address is found
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).json({ message: "Address not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
