import mongoose from "mongoose";
import Address from "../models/address.js";

export const createAddress = async (req, res) => {
  const address = req.body;

  const newAddress = new Address({
    ...address,
    creator: req.userId,
  });

  try {
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch {
    res.status(409).json({ message: error.message });
  }
};

export const getAddress = async (req, res) => {
  const { creator } = req.query;

  try {
    // Create a query object with the `creator` field and value
    const address = await Address.findOne({
      creator: creator,
    });

    // Check if the address is found
    if (address) {
      res.status(200).json(address);
    } else {
      res.status(400).json({ message: "Address not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
