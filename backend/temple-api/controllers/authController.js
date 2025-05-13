const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: "Email already exists" });

        const user = new User({ username, email, password });
        await user.save();

        const token = createToken(user);
        res.status(201).json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
        res.status(500).json({ error: "Registration failed" });
    }
};

exports.login = async (req, res) => {
    try {
      console.log("🔐 login route hit"); // ดูว่าเข้า route ไหม
  
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ success: false, message: 'ไม่พบผู้ใช้' });
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ success: false, message: 'รหัสผ่านไม่ถูกต้อง' });
  
      res.json({ success: true, message: 'เข้าสู่ระบบสำเร็จ' });
    } catch (err) {
      console.error("💥 login error:", err);
      res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในระบบ' });
    }
  };
  
