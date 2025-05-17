const Review = require("../models/Review");
const User = require("../models/User");
const Temple = require("../models/Temple"); // สำหรับอัปเดต averageRating

exports.createReview = async (req, res) => {
  try {
    const {
      title,
      detail,
      rating,
      visitDuration,
      activities,
    } = req.body;

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

    // คำนวณคะแนนเฉลี่ยใหม่ และอัปเดตไปที่ Temple
    const reviews = await Review.find({ templeId: req.params.templeId });
    const average =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

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
