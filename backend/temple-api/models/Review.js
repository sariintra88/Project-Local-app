const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  templeId: { type: mongoose.Schema.Types.ObjectId, ref: "Temple", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  comment: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  images: [String], // เก็บชื่อไฟล์รูปภาพ
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
