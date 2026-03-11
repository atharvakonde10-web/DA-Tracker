const express = require("express");
const router = express.Router();
const Tracker = require("../models/Tracker");

// SAVE tracker
router.post("/:userId", async (req, res) => {
  try {
    const { data } = req.body;
    const userId = req.params.userId;

    let tracker = await Tracker.findOne({ userId });

    if (tracker) {
      tracker.data = data;
      await tracker.save();
    } else {
      tracker = new Tracker({ userId, data });
      await tracker.save();
    }

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET tracker
router.get("/:userId", async (req, res) => {
  try {
    const tracker = await Tracker.findOne({ userId: req.params.userId });

    if (!tracker) return res.json({ data: {} });

    res.json({ data: tracker.data });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;