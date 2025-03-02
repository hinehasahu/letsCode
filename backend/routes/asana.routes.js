const express = require("express");
const { createAsana, getAllAsanas, completeAsana, rateAsana } = require("../controllers/asana.controler");
const router = express.Router();

router.post("/create", createAsana);
router.get("/", getAllAsanas);
router.post("/complete/:asanaId/:userId", completeAsana);
router.post("/rate/:asanaId/:rating", rateAsana);

module.exports = router;
