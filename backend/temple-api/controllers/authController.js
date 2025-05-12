const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "7d",
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
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid email or password" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

        const token = createToken(user);
        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
};
