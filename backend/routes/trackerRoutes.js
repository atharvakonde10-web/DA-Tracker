const express = require("express");
const router = express.Router();
const Tracker = require("../models/Tracker");

// GET tracker
router.get("/:userId", async (req, res) => {
  try {
    const tracker = await Tracker.findOne({ userId: req.params.userId });

    res.json({ data: tracker ? tracker.data : {} });

  } catch (err) {
    res.status(500).json(err);
  }
});

// SAVE tracker
router.post("/:userId", async (req, res) => {
  try {
    const { data } = req.body;

    let tracker = await Tracker.findOne({ userId: req.params.userId });

    if (tracker) {
      tracker.data = data;
    } else {
      tracker = new Tracker({
        userId: req.params.userId,
        data
      });
    }

    await tracker.save();

    res.json({ success: true });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;