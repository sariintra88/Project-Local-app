const express = require("express");
const multer = require("multer");
const verifyToken = require("../middleware/verifyToken");
const { createReview, getReviewsByTemple } = require("../controllers/reviewController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/review",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/:templeId", verifyToken, upload.array("images", 5), createReview);
router.get("/:templeId", getReviewsByTemple);

module.exports = router;
