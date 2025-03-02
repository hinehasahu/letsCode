const express = require("express");
const { createGroup, joinGroup, getGroup, updateGroupProgress } = require("../controllers/group.controller");
const router = express.Router();

router.post("/create", createGroup);
router.post("/join/:groupId", joinGroup);
router.get("/:groupId", getGroup);
router.post("/progress/:groupId/:userId", updateGroupProgress);

module.exports = router;
