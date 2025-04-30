require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

require("./db");

const authRoutes = require("./routes/auth");
const templeRoutes = require("./routes/temples");
const reviewRoutes = require("./routes/reviews");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
