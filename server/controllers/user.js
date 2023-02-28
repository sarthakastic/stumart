import bcrypt from "bcryptjs";
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
      res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { phoneNumber: existingUser.phoneNumber, id: existingUser._id },
      "test",
      { expiresIn: "1d" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { phoneNumber, password, confirmPassword, firstName, lastName } =
    req.body;
  try {
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      phoneNumber,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { phoneNumber: result.phoneNumber, id: result._id },
      "test",
      {
        expiresIn: "30d",
      }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
