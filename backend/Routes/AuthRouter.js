import express from "express";
import dotenv from "dotenv";
import UsersLogin from "../models/UsersLogin.js";
import Hosted from "../models/Hosted.js";
import Attended from "../models/Attended.js";
import jwt from "jsonwebtoken";
import authenticate from "../middleware/Authenticate.js";

dotenv.config();

const router = express.Router();

// ✅ Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await UsersLogin.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = await UsersLogin.create({ username, email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UsersLogin.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Use .env secret key
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, { httpOnly: true, secure: false });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Fetch Logged-in User Info (Protected Route)
router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await UsersLogin.findById(req.user.id).select("username email");
    // console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ 
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Fetch User Events (Protected Route)
router.get("/events", authenticate, async (req, res) => {
  try {
    const hostedEvents = await Hosted.find({ userId: req.user.id });
    const attendedEvents = await Attended.find({ userId: req.user.id });

    res.json({
      hostedEvents,
      attendedEvents
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events" });
  }
});

export default router;
