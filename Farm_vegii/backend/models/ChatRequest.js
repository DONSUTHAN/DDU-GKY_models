const mongoose = require("mongoose");

// Schema for storing farmer chat/inspection requests.
const chatRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fruit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fruit",
      required: true,
    },
    farmerName: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ChatRequest", chatRequestSchema);
