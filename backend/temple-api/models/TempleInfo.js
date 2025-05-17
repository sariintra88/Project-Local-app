const mongoose = require("mongoose");

const templeInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [{ type: String }], // รูปภาพหลายภาพ
  description: { type: String },
  feeAdult: { type: Number },
  feeChild: { type: Number },
  feeForeign: { type: Number },
  openDays: { type: String }, // เช่น "ทุกวัน", "จันทร์–ศุกร์"
  openTime: { type: String }, // เช่น "08:00–17:00"
  location: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("TempleInfo", templeInfoSchema);
