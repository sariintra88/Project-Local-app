const express = require("express");
const multer = require("multer");
const verifyToken = require("../middleware/verifyToken");
const templeInfoController = require("../controllers/templeInfoController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/5-temple/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// สร้างข้อมูลใหม่
router.post("/", verifyToken, upload.array("images", 5), templeInfoController.createTempleInfo);

// ดึงข้อมูลทั้งหมด
router.get("/", templeInfoController.getAllTempleInfos);

// ในไฟล์ routes ที่เกี่ยวข้องกับ templeInfos
router.get('/name/:name', async (req, res) => {
  try {
    const templeName = req.params.name;
    const temple = await TempleInfo.findOne({ name: templeName });
    
    if (!temple) {
      return res.status(404).json({ message: 'ไม่พบข้อมูลวัด' });
    }
    
    res.json(temple);
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการค้นหาข้อมูล', error: error.message });
  }
});

// ดึงข้อมูลโดยใช้ id (ObjectId)
router.get("/:id", templeInfoController.getTempleInfoById);

module.exports = router;

