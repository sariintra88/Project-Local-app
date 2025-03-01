require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("✅ MongoDB Connected"));

// สร้าง Schema สำหรับวัด
const templeSchema = new mongoose.Schema({
  name: String,
  image: String, // เก็บชื่อไฟล์รูป
  description: String,
});

const Temple = mongoose.model("Temple", templeSchema);

// ตั้งค่าการอัปโหลดรูปภาพ
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ใช้งาน Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // ให้เข้าถึงไฟล์รูปผ่าน API

// **API เพิ่มข้อมูลวัด**
app.post("/api/temples", upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;
    const newTemple = new Temple({
      name,
      image: req.file.filename,
      description,
    });
    await newTemple.save();
    res.status(201).json(newTemple);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **API ดึงข้อมูลวัดทั้งหมด**
app.get("/api/temples", async (req, res) => {
  try {
    const temples = await Temple.find();
    res.json(temples);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **API ดึงข้อมูลวัดตาม ID**
app.get("/api/temples/:id", async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) return res.status(404).json({ message: "ไม่พบข้อมูล" });
    res.json(temple);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **API ลบข้อมูลวัด**
app.delete("/api/temples/:id", async (req, res) => {
  try {
    await Temple.findByIdAndDelete(req.params.id);
    res.json({ message: "ลบข้อมูลสำเร็จ" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
