const Temple = require("../models/Temple");

exports.createTemple = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newTemple = new Temple({
      name,
      description,
      image: req.file ? req.file.filename : "",
    });
    await newTemple.save();
    res.status(201).json(newTemple);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTemples = async (req, res) => {
  try {
    const temples = await Temple.find();
    res.json(temples);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) return res.status(404).json({ message: "Temple not found" });
    res.json(temple);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndDelete(req.params.id);
    if (!temple) return res.status(404).json({ message: "Temple not found" });
    res.json({ message: "Temple deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchTemplesByName = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Missing search query" });

    const regex = new RegExp(q, "i");
    const temples = await Temple.find({ name: { $regex: regex } });

    res.json(temples);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};