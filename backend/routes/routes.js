const express = require("express");
const router = express.Router();

const Feedback = require("../models/feedback");  // go up one folder

// POST feedback
router.post("/", async (req, res) => {
    console.log("Incoming:", req.body);

  try {
    const { name, email, message, rating } = req.body;

    if (!name || !message || !rating) {
      return res.status(400).json({ error: "Name, message, and rating are required" });
    }

    const newFeedback = new Feedback({ name, email, message, rating });
    await newFeedback.save();

    res.json({ message: "Feedback saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
