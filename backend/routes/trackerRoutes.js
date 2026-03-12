const express = require("express");
const router = express.Router();
const Tracker = require("../models/Tracker");

// GET — load data for a user
router.get("/:userId", async (req, res) => {
  try {
    const tracker = await Tracker.findOne({ userId: req.params.userId });
    if (!tracker) {
      return res.json({ data: {} });
    }
    res.json({ data: tracker.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST — save data for a user
router.post("/:userId", async (req, res) => {
  try {
    const { data } = req.body;
    const tracker = await Tracker.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: { data: data } },
      { new: true, upsert: true }
    );
    res.json({ success: true, data: tracker.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;