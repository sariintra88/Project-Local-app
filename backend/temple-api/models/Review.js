const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  templeId: { type: mongoose.Schema.Types.ObjectId, ref: "Temple", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },

  title: { type: String, required: true },       // หัวข้อรีวิว
  detail: { type: String, required: true },      // รายละเอียดรีวิว
  rating: { type: Number, required: true, min: 1, max: 5 }, // คะแนนจากดาว
  visitDuration: { type: String },               // เวลาที่ใช้ เช่น "2 ชั่วโมง"
  activities: { type: String },                  // กิจกรรมที่ทำ
  images: { type: [String], default: [] },       // ⬅️ เก็บแค่ชื่อไฟล์รูปภาพ
  createdAt: { type: Date, default: Date.now },  // เวลาที่รีวิว
});

module.exports = mongoose.model("Review", reviewSchema);
