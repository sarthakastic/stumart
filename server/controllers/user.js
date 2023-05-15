import bcrypt from "bcryptjs";
import fs from "fs";
import * as mimeTypes from "mime-types";
import jwt from "jsonwebtoken";

import User from "../models/users.js";

export const signin = async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    const existingUser = await User.findOne({ phoneNumber });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { phoneNumber: existingUser.phoneNumber, id: existingUser._id },
      "test",
      { expiresIn: "90d" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const validateUser = async (req, res) => {
  const data = req;
  console.log(data, "data");

  const { phoneNumber } = req.body;

  const existingUser = await User.findOne({ phoneNumber });
  if (!existingUser) {
    return res.status(404).json({ message: "User doesn't exist." });
  }
};

export const validateSignUp = async (req, res) => {
  const data = req;
  console.log(data, "data");

  const { phoneNumber, password, confirmPassword, selectedFile } = req.body;
  console.log(
    phoneNumber,
    password,
    confirmPassword,

    "inside api"
  );

  const existingUser = await User.findOne({ phoneNumber });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords don't match." });
  }

  // Convert selectedFile to file object
  const fileBuffer = Buffer.from(selectedFile, "base64");

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

  const fileExtension = selectedFile.split(";")[0].split("/")[1];
  const mimeType = mimeTypes.lookup(fileExtension);

  // Add allowed file types here
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (!mimeType || !allowedMimeTypes.includes(mimeType)) {
    return res.status(400).json({ message: "Invalid file type." });
  }

  return res.status(200).json({ message: "Sign Up data is valid" });
};

export const signup = async (req, res) => {
  const {
    phoneNumber,
    password,
    confirmPassword,
    firstName,
    lastName,
    selectedFile,
  } = req.body;
  try {
    // const existingUser = await User.findOne({ phoneNumber });
    // if (existingUser) {
    //   return res.status(400).json({ message: "User already exists." });
    // }

    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: "Passwords don't match." });
    // }

    // // Convert selectedFile to file object
    // const fileBuffer = Buffer.from(selectedFile, "base64");

    // // Write file buffer to a temporary file
    // const tempFilePath = "/tmp/" + Date.now() + "-tempfile";
    // fs.writeFileSync(tempFilePath, fileBuffer);

    // // Check file size
    // const stats = fs.statSync(tempFilePath);
    // const fileSizeInBytes = stats.size;
    // const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
    // fs.unlinkSync(tempFilePath); // Delete temporary file

    // if (fileSizeInMB > 30) {
    //   return res.status(400).json({ message: "File size exceeds 30MB." });
    // }

    // const fileExtension = selectedFile.split(";")[0].split("/")[1];
    // const mimeType = mimeTypes.lookup(fileExtension);

    // // Add allowed file types here
    // const allowedMimeTypes = ["image/jpeg", "image/png"];

    // if (!mimeType || !allowedMimeTypes.includes(mimeType)) {
    //   return res.status(400).json({ message: "Invalid file type." });
    // }
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      phoneNumber,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      selectedFile,
    });

    const token = jwt.sign(
      { phoneNumber: result.phoneNumber, id: result._id },
      "test",
      {
        expiresIn: "90d",
      }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getUserInfo = async (req, res) => {
  const { id } = req.query;

  try {
    const userInfo = await User.findById(id);
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.query;
  const { firstName, lastName, selectedFile } = req.body;

  const updatedProfile = await User.findByIdAndUpdate(
    id,
    {
      name: `${firstName} ${lastName}`,
      selectedFile,
    },
    {
      new: true,
    }
  );
  res.json(updatedProfile);
};

export const updatePassword = async (req, res) => {
  const { phoneNumber } = req.query;
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const updatedPassword = await User.findOneAndUpdate(
    phoneNumber,
    {
      password: hashedPassword,
    },
    {
      new: true,
    }
  );
  res.json(updatedPassword);
};
