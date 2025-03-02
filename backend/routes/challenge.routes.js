const express = require("express");
const { createChallenge, joinChallenge, completeChallenge,getUserChallenges,allChallenges } = require("../controllers/challenge.controller");
const router = express.Router();

router.post("/create", createChallenge);
router.post("/join/:id", joinChallenge);
router.post("/complete/:id/:userId", completeChallenge);
router.get("/user/:userId", getUserChallenges);
router.get("/",allChallenges)

module.exports = router;
