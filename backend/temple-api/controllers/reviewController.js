const Review = require("../models/Review");
const User = require("../models/User");

exports.createReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const user = await User.findById(req.user.userId);

    const images = req.files ? req.files.map(file => file.filename) : [];

    const newReview = new Review({
      templeId: req.params.templeId,
      userId: user._id,
      username: user.username,
      comment,
      rating,
      images
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsByTemple = async (req, res) => {
  try {
    const reviews = await Review.find({ templeId: req.params.templeId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
