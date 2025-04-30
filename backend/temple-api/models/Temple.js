const mongoose = require("mongoose");

const templeSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});

module.exports = mongoose.model("Temple", templeSchema);