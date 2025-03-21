require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
require("./db"); // เชื่อมต่อ MongoDB
const Temple = require("./models/Temple");

const app = express();
const PORT = process.env.PORT || 5000;

// ตั้งค่า Multer สำหรับอัปโหลดรูปภาพ
const storage = multer.diskStorage({
  destination: "./uploads/", // บันทึกรูปภาพในโฟลเดอร์ uploads/
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์ให้ไม่ซ้ำกัน
  },
});
const upload = multer({ storage });

// ใช้งาน Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // เปิดให้เข้าถึงไฟล์รูปภาพจาก URL

// **API เพิ่มข้อมูลวัด**
app.post("/api/temples", upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;
    const newTemple = new Temple({
      name,
      image: req.file.filename, // เก็บแค่ชื่อไฟล์
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
    res.json(
      temples.map((temple) => ({
        _id: temple._id,
        name: temple.name,
        description: temple.description,
        imageUrl: `${req.protocol}://${req.get("host")}/uploads/${temple.image}`, // ส่ง URL รูปกลับไป
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **API ดึงข้อมูลวัดตาม ID**
app.get("/api/temples/:id", async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) return res.status(404).json({ message: "ไม่พบข้อมูล" });

    res.json({
      _id: temple._id,
      name: temple.name,
      description: temple.description,
      imageUrl: `${req.protocol}://${req.get("host")}/uploads/${temple.image}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **API ลบข้อมูลวัด**
app.delete("/api/temples/:id", async (req, res) => {
  try {
    const temple = await Temple.findByIdAndDelete(req.params.id);
    if (!temple) return res.status(404).json({ message: "ไม่พบข้อมูล" });

    res.json({ message: "ลบข้อมูลสำเร็จ" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
