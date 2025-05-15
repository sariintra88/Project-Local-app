const mongoose = require("mongoose");

const templeSchema = new mongoose.Schema({
  name: String,
  image: { type: String, default: "" },
  description: String,
});

module.exports = mongoose.model("Temple", templeSchema);
