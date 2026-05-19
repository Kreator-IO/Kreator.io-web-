const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Graceful Asynchronous MongoDB Connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri || mongoUri === "your_mongodb_connection_string") {
  console.warn("⚠️ WARNING: MONGO_URI environment variable is not set or is the placeholder. Database features will not be available.");
} else {
  mongoose.connect(mongoUri)
    .then(() => console.log("✅ Successfully connected to MongoDB"))
    .catch(err => {
      console.error("❌ MongoDB connection error:", err.message);
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});