const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: { type: String, enum: ["daily", "weekly"] },
    target: Number, // Number of asanas to complete
    participants: [{ userId: String, progress: Number, completed: Boolean }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Challenge", challengeSchema);
