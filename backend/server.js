const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const trackerRoutes = require("./routes/trackerRoutes");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET","POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.use("/api/tracker", trackerRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});