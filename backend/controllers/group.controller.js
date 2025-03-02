const Group = require("../models/group.model");
const User = require("../models/user.model");

exports.createGroup = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ msg: "Group name is required." });
    }

    try {
        const group = new Group({ name });
        await group.save();

        res.status(201).json({ 
            message: "Group created successfully!", 
            groupId: group._id,  // ✅ Return the group ID
            group
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.joinGroup = async (req, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;
    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: "Group not found" });

        if (!group.members.includes(userId)) {
            group.members.push({ userId });
            await group.save();
        }

        res.json({ message: "Joined group successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getGroup = async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findById(groupId).populate("members.userId", "name points");
        if (!group) return res.status(404).json({ message: "Group not found" });

        res.json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateGroupProgress = async (req, res) => {
    const { groupId, userId } = req.params;
    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: "Group not found" });

        group.totalAsanasCompleted += 1;
        await group.save();

        res.json({ message: "Group progress updated!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
