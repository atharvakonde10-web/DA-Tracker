const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema({
  userId: String,
  data: Object
});

module.exports = mongoose.model("Tracker", trackerSchema);