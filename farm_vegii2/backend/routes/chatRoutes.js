const express = require("express");
const {  createChatRequest,  getMyChatRequests,} = require("../controllers/chatController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Send a new chat request to a farmer.
router.post("/request", protect, createChatRequest);

// Get logged-in user's sent chat requests.
router.get("/my-requests", protect, getMyChatRequests);

module.exports = router;
