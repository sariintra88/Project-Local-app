require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

require("./db");

const authRoutes = require("./routes/auth");
const templeRoutes = require("./routes/temples");
const reviewRoutes = require("./routes/reviews");
const templeInfoRoutes = require("./routes/templeInfo");

// ตั้งค่า CORS อย่างปลอดภัย
const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error('CORS policy: Access denied'), false);
    }
    return callback(null, true);
  }
}));

app.use(helmet());
app.use(morgan('dev'));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/templeinfos", templeInfoRoutes);

// Middleware จัดการ error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
