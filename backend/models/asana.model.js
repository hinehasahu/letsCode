const mongoose = require("mongoose");

const asanaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    difficulty: { type: Number, required: true, min: 1, max: 5 }, // 1-5 rating
    description: { type: String }, // Added description
    benefits: { type: [String], required: true }, // List of benefits
    completedBy: [{ userId: String, date: { type: Date, default: Date.now } }] // Users who completed it
});

module.exports = mongoose.model("Asana", asanaSchema);
