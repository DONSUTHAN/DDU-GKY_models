const mongoose = require("mongoose");

// Schema for fruits and vegetables shown in product cards.
const fruitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    origin: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["fruit", "vegetable"],
      default: "fruit",
    },
    farmerName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Fruit", fruitSchema);
