const express = require("express");
const { getFruits } = require("../controllers/fruitController");

const router = express.Router();

// Public route to get all fruits and vegetables.
router.get("/", getFruits);

module.exports = router;
