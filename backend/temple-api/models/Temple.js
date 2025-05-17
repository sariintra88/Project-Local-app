const mongoose = require("mongoose");

const templeSchema = new mongoose.Schema({
  name: String,
  image: { type: String, default: "" },
  description: String,
  averageRating: { type: Number, default: 0 },
});

module.exports = mongoose.model("Temple", templeSchema);
