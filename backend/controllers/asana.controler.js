const Asana = require("../models/asana.model");
const User = require("../models/user.model");

exports.createAsana = async (req, res) => {
    const { name, difficulty, description, benefits } = req.body;

    // Validation check
    if (!name || !difficulty || !description || !benefits || !Array.isArray(benefits)) {
        return res.status(400).json({ msg: "All fields are required and benefits must be an array." });
    }

    try {
        const newAsana = new Asana({ name, difficulty, description, benefits });
        await newAsana.save();
        res.status(201).json({ message: "Asana created successfully!", asana: newAsana });
    } catch (err) {
        res.status(400).json({ msg: "Error in creating Asana", error: err.message });
    }
};


exports.getAllAsanas = async (req, res) => {
    try {
        const asanas = await Asana.find();
        res.json(asanas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.completeAsana = async (req, res) => {
    const { asanaId, userId } = req.params; // Get values from URL params

    if (!asanaId || !userId) {
        return res.status(400).json({ msg: "Asana ID and User ID are required." });
    }

    try {
        // Find the Asana by ID
        const asana = await Asana.findById(asanaId);
        if (!asana) {
            return res.status(404).json({ msg: "Asana not found." });
        }

        // Check if user has already completed the Asana
        const alreadyCompleted = asana.completedBy.some(entry => entry.userId === userId);
        if (alreadyCompleted) {
            return res.status(400).json({ msg: "User has already completed this Asana." });
        }

        // Add user to the 'completedBy' list
        asana.completedBy.push({ userId, date: new Date() });

        // Save only the updated fields (DOES NOT require 'description')
        await asana.save();

        // Update user's points
        const user = await User.findById(userId);
        if (user) {
            user.points += 10; // Reward points
            await user.save();
        }

        res.status(200).json({ msg: "Asana marked as completed!", asana });
    } catch (err) {
        res.status(500).json({ msg: "Error completing Asana", error: err.message });
    }
};

exports.rateAsana = async (req, res) => {
    const { asanaId,rating } = req.params;
    // const { rating } = req.body;
    try {
        const asana = await Asana.findById(asanaId);
        if (!asana) return res.status(404).json({ message: "Asana not found" });

        asana.difficulty = (asana.difficulty + Number(rating)) /2; // Update average difficulty
        await asana.save();

        res.json({ message: "Asana rating updated!" });
    } catch (err) {
        res.status(400).json({msg:"error in rating updation", error: err.message });
    }
};
