const mongoose = require("mongoose");

const TrackerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

module.exports = mongoose.model("Tracker", TrackerSchema);