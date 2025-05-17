require("dotenv").config(); // โหลดตัวแปรจาก .env

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// เชื่อมต่อ MongoDB (ควรแยกไป db.js หากต้องการแยก concerns)
require("./db");

// เรียกใช้งาน routes
const authRoutes = require("./routes/auth");
const templeRoutes = require("./routes/temples");
const reviewRoutes = require("./routes/reviews");
const templeInfoRoutes = require("./routes/templeInfo");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/auth", authRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/temple-info", templeInfoRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
