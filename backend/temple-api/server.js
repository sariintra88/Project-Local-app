require("dotenv").config(); //โหลดตัวแปรจาก .env

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose"); //เพิ่มกรณีใช้ mongoose.connect ใน db.js

const app = express();

//เชื่อมต่อ MongoDB (ควรอยู่ใน db.js แยกต่างหาก)
require("./db");

//เรียก routes
const authRoutes = require("./routes/auth");
const templeRoutes = require("./routes/temples");
const reviewRoutes = require("./routes/reviews");
const registerRoute = require("./routes/register");

//Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//API Routes
app.use("/api/auth", authRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/register", registerRoute);

//Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));