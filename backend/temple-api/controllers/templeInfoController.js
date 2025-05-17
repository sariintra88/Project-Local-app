const TempleInfo = require("../models/TempleInfo");

exports.createTempleInfo = async (req, res) => {
  try {
    const { name, description, feeAdult, feeChild, feeForeigner, openDays, openTime, location } = req.body;
    const images = req.files ? req.files.map(file => file.filename) : [];

    const newTempleInfo = new TempleInfo({
      name,
      images,
      description,
      feeAdult,
      feeChild,
      feeForeigner,
      openDays,
      openTime,
      location,
    });

    await newTempleInfo.save();
    res.status(201).json(newTempleInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTempleInfos = async (req, res) => {
  try {
    const templeInfos = await TempleInfo.find();
    res.json(templeInfos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTempleInfoById = async (req, res) => {
  try {
    const templeInfo = await TempleInfo.findById(req.params.id);
    if (!templeInfo) return res.status(404).json({ message: "TempleInfo not found" });
    res.json(templeInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
