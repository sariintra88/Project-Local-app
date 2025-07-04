const express = require("express");
const multer = require("multer");
const verifyToken = require("../middleware/verifyToken");
const templeController = require("../controllers/templeController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/1-temple/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", verifyToken, upload.single("image"), templeController.createTemple);
router.get("/", templeController.getAllTemples);
router.get("/search", templeController.searchTemplesByName);
router.get("/:id", templeController.getTempleById);
router.delete("/:id", verifyToken, templeController.deleteTemple);

module.exports = router;
