const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: String,
    members: [{ userId: String }],
    totalAsanasCompleted: { type: Number, default: 0 }
});

module.exports = mongoose.model("Group", groupSchema);
