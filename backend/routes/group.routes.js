const express = require("express");
const Group = require("../models/group.model");
const { createGroup, joinGroup, getGroup, updateGroupProgress } = require("../controllers/group.controller");
const router = express.Router();

router.post("/create", createGroup);
router.post("/join/:groupId", joinGroup);
router.get("/:groupId", getGroup);
router.post("/progress/:groupId/:userId", updateGroupProgress);

router.get("/", async (req, res) => {
    try {
      const groups = await Group.find();
      res.json(groups);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
