const mongoose = require('mongoose');
const TempleInfo = require("../models/TempleInfo");

exports.createTempleInfo = async (req, res) => {
  try {
    const { id,name, description, feeAdult, feeChild, feeForeigner, openDays, openTime, location } = req.body;
    const images = req.files ? req.files.map(file => file.filename) : [];

    const newTempleInfo = new TempleInfo({
      id,
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
    const id = req.params.id;

    // เช็คว่า id ที่ส่งมาเป็น ObjectId ถูกต้องหรือไม่
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid TempleInfo ID" });
    }

    const templeInfo = await TempleInfo.findById(id);
    if (!templeInfo) return res.status(404).json({ message: "TempleInfo not found" });

    res.json(templeInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTempleInfoByName = async (req, res) => {
  try {
    const name = req.params.name;
    // ค้นหาแบบตรงตัว
    const templeInfo = await TempleInfo.findOne({ name: name });
    if (!templeInfo) {
      return res.status(404).json({ message: "ไม่พบข้อมูลวัดนี้" });
    }
    res.json(templeInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

