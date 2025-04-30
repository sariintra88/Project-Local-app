const express = require("express");
const Review = require("../models/Review");
const verifyToken = require("../middleware/verifyToken");
const User = require("../models/User");
const router = express.Router();

router.post("/:templeId", verifyToken, async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const user = await User.findById(req.user.userId);

    const newReview = new Review({
      templeId: req.params.templeId,
      userId: user._id,
      username: user.username,
      comment,
      rating,
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:templeId", async (req, res) => {
  try {
    const reviews = await Review.find({ templeId: req.params.templeId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;