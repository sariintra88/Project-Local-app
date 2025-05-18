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

router.post("/", verifyToken, upload.array("images", 5), templeInfoController.createTempleInfo);
router.get("/", templeInfoController.getAllTempleInfos);
router.get("/:id", templeInfoController.getTempleInfoById);
router.get("/name/:name", templeInfoController.getTempleInfoByName); // ✅ FIXED

module.exports = router;
