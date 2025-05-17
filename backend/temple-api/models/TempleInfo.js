const mongoose = require("mongoose");

const templeInfoSchema = new mongoose.Schema({
    name: String,
    images: [String],
    description: String,
    feeAdult: String,
    feeChild: String,
    feeForeigner: String,
    openDays: String,
    openTime: String,
    location: String,
});

module.exports = mongoose.model("TempleInfo", templeInfoSchema);
