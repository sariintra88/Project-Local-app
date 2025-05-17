const TempleInfo = require("../models/TempleInfo");

exports.createTempleInfo = async (req, res) => {
  try {
    const {
      name, description, feeAdult, feeChild, feeForeign,
      openDays, openTime, location
    } = req.body;

    const images = req.files ? req.files.map(file => file.filename) : [];

    const newTemple = new TempleInfo({
      name, description, feeAdult, feeChild, feeForeign,
      openDays, openTime, location, images
    });

    await newTemple.save();
    res.status(201).json(newTemple);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTempleInfo = async (req, res) => {
  try {
    const temples = await TempleInfo.find();
    res.json(temples);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTempleInfoById = async (req, res) => {
  try {
    const temple = await TempleInfo.findById(req.params.id);
    if (!temple) return res.status(404).json({ message: "Temple not found" });
    res.json(temple);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTempleInfo = async (req, res) => {
  try {
    const temple = await TempleInfo.findByIdAndDelete(req.params.id);
    if (!temple) return res.status(404).json({ message: "Temple not found" });
    res.json({ message: "Temple deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
