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
    const { challengeId } = req.params;
    const { userId } = req.body; // Get userId from request body

    try {
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) return res.status(404).json({ error: "Challenge not found" });

        // Check if the user is already a participant
        const alreadyJoined = challenge.participants.some(p => p.userId.toString() === userId);
        if (alreadyJoined) return res.status(400).json({ error: "You have already joined this challenge" });

        // Add user to participants
        challenge.participants.push({ userId, completed: false });
        await challenge.save();

        res.json({ message: "Successfully joined the challenge!", challenge });
    } catch (error) {
        res.status(500).json({ error: "Error joining challenge: " + error.message });
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

exports.getUserChallenges = async (req, res) => {
    const { userId } = req.params;

    try {
        const challenges = await Challenge.find({ "participants.userId": userId });

        if (!challenges.length) {
            return res.status(404).json({ message: "No challenges found for this user" });
        }

        res.json(challenges);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.allChallenges = async(req,res)=>{
    try{
        const challenges = await Challenge.find();
        res.json(challenges);
    }
     catch (err) {
        res.status(400).json({ error: err.message });
    }
}
