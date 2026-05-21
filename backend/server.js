import contactRouter from './routes/contact.js';
require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', contactRouter);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
}

module.exports = app;