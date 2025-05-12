const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบ" });
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: "ชื่อผู้ใช้หรืออีเมลถูกใช้แล้ว" });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: "สมัครสมาชิกสำเร็จ" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
    }
});

module.exports = router;
