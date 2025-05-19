require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const rateLimit = require("express-rate-limit");

const app = express();

// เชื่อมต่อ MongoDB
require("./db");

// Middleware: Helmet (ความปลอดภัย), Morgan (log), body parser
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ตั้งค่า CORS เฉพาะ API routes เท่านั้น
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use("/api", cors(corsOptions));

// ตั้ง rate limiter เฉพาะ API routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 นาที
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use("/api", limiter);

// ตั้ง header สำหรับ static รูปภาพ ให้โหลดข้าม origin ได้
app.use("/uploads", (req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// serve static รูปภาพ (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const authRoutes = require("./routes/auth");
const templeRoutes = require("./routes/temples");
const reviewRoutes = require("./routes/reviews");
const templeInfoRoutes = require("./routes/templeInfo");

app.use("/auth", authRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/templeinfos", templeInfoRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
