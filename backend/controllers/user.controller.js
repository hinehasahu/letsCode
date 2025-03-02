const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Register User and Return User Data
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    try {
        await user.save();

        // Generate token
        const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });

        // Return user details along with token
        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email },
            token
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// ✅ Login User and Return User Data
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });

    // Return user details along with token
    res.json({
        message: "Login successful",
        user: { id: user._id, name: user.name, email: user.email },
        token
    });
};

// ✅ Get User Profile by ID
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password"); // Exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};


exports.getUserProfile = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};
