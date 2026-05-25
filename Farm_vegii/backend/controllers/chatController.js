const ChatRequest = require("../models/ChatRequest");
const Fruit = require("../models/Fruit");

// Create a chat/inspection request from buyer to farmer.
const createChatRequest = async (req, res) => {
  try {
    const { fruitId, message } = req.body;

    if (!fruitId || !message) {
      return res.status(400).json({
        success: false,
        message: "fruitId and message are required",
      });
    }

    const fruit = await Fruit.findById(fruitId);

    if (!fruit) {
      return res.status(404).json({
        success: false,
        message: "Fruit item not found",
      });
    }

    const chatRequest = await ChatRequest.create({
      user: req.user._id,
      fruit: fruit._id,
      farmerName: fruit.farmerName,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Chat request sent to farmer",
      chatRequest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to send chat request",
      error: error.message,
    });
  }
};

// Show current user's sent requests in the chat page.
const getMyChatRequests = async (req, res) => {
  try {
    const chatRequests = await ChatRequest.find({ user: req.user._id })
      .populate("fruit", "name image price quantity origin")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: chatRequests.length,
      chatRequests,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch chat requests",
      error: error.message,
    });
  }
};

module.exports = {
  createChatRequest,
  getMyChatRequests,
};
