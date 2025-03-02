const Challenge = require("../models/challenge.model");

exports.createChallenge = async (req, res) => {
    const { title, description, type, target } = req.body;
    const challenge = new Challenge({ title, description, type, target });

    try {
        await challenge.save();
        res.status(201).json({ message: "Challenge created successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.joinChallenge = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const challenge = await Challenge.findById(id);
        if (!challenge) return res.status(404).json({ message: "Challenge not found" });

        if (!challenge.participants.find(p => p.userId === userId)) {
            challenge.participants.push({ userId, progress: 0, completed: false });
            await challenge.save();
        }

        res.json({ message: "Joined challenge successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.completeChallenge = async (req, res) => {
    const { id, userId } = req.params;

    try {
        const challenge = await Challenge.findById(id);
        if (!challenge) return res.status(404).json({ message: "Challenge not found" });

        const participant = challenge.participants.find(p => p.userId === userId);
        if (!participant) return res.status(400).json({ message: "User not part of challenge" });

        participant.completed = true;
        await challenge.save();

        res.json({ message: "Challenge completed!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
