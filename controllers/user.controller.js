import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { createSession } from "../services/auth.js";

export const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return res.send("User created");
};

export const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }
    const token = createSession(user._id);
    res.cookie("token", token, { httpOnly: true });
    return res.send("User logged in successfully");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    return res.send("User logged in successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};
