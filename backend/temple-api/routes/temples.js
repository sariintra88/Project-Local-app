const express = require("express");
const multer = require("multer");
const Temple = require("../models/Temple");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;
    const newTemple = new Temple({
      name,
      description,
      image: req.file ? req.file.filename : null,
    });
    await newTemple.save();
    res.status(201).json(newTemple);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const temples = await Temple.find();
    res.json(temples);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) return res.status(404).json({ message: "Temple not found" });
    res.json(temple);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const temple = await Temple.findByIdAndDelete(req.params.id);
    if (!temple) return res.status(404).json({ message: "Temple not found" });
    res.json({ message: "Temple deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;