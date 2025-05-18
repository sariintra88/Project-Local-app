const Review = require("../models/Review");
const User = require("../models/User");
const Temple = require("../models/Temple");

exports.createReview = async (req, res) => {
  try {
    const { title, detail, rating, visitDuration, activities } = req.body;
    const user = await User.findById(req.user.userId);
    const images = req.files ? req.files.map(file => file.filename) : [];

    const newReview = new Review({
      templeId: req.params.templeId,
      userId: user._id,
      username: user.username,
      title,
      detail,
      rating,
      visitDuration,
      activities,
      images,
    });

    await newReview.save();

    // คำนวณ averageRating ใหม่
    const reviews = await Review.find({ templeId: req.params.templeId });
    const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Temple.findByIdAndUpdate(req.params.templeId, {
      averageRating: average.toFixed(1),
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsByTemple = async (req, res) => {
  try {
    const reviews = await Review.find({ templeId: req.params.templeId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { title, detail, rating, visitDuration, activities } = req.body;
    const review = await Review.findById(req.params.reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (rating) review.rating = rating;
    if (title) review.title = title;
    if (detail) review.detail = detail;
    if (visitDuration) review.visitDuration = visitDuration;
    if (activities) review.activities = activities;

    if (req.files && req.files.length > 0) {
      review.images = req.files.map(file => file.filename);
    }

    await review.save();

    // คำนวณ averageRating ใหม่หลังจากแก้ไขรีวิว
    const reviews = await Review.find({ templeId: review.templeId });
    const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Temple.findByIdAndUpdate(review.templeId, {
      averageRating: average.toFixed(1),
    });

    res.json({ message: "Review updated", review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
