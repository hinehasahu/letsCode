const express = require("express");
const { createChallenge, joinChallenge, completeChallenge } = require("../controllers/challenge.controller");
const router = express.Router();

router.post("/create", createChallenge);
router.post("/join/:id", joinChallenge);
router.post("/complete/:id/:userId", completeChallenge);

module.exports = router;
