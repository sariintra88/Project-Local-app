equire("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit"); // ✅ เพิ่มตรงนี้

const app = express();

// ✅ กำหนด rate limiter (100 requests ต่อ 15 นาที ต่อ IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 นาที
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

// 🔌 เชื่อม MongoDB
require("./db");

// 🔁 Routes
const authRoutes = require("./routes/auth");
const templeRoutes = require("./routes/temples");
const reviewRoutes = require("./routes/reviews");
const templeInfoRoutes = require("./routes/templeInfo");

// ✅ Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(limiter); // ✅ ใส่หลังสุดก่อน route อื่น

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 📦 ใช้งาน Routes
app.use("/auth", authRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/templeinfos", templeInfoRoutes);

// ❌ Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// 🚀 Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));