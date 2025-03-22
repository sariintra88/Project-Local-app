//Schema ของวัด
const mongoose = require("mongoose");

const templeSchema = new mongoose.Schema({
  name: String,
  image: String, // เก็บชื่อไฟล์รูป (ไม่เก็บไฟล์ลง DB)
  description: String,
});

const Temple = mongoose.model("Temple", templeSchema);

module.exports = Temple;
