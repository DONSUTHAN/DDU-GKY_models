const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  // This line creates a schema that describes products in the database.
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
      // This line prevents negative prices.
    },

    quantity: {
      type: Number,
      required: true,
      min: 0
      // This line prevents negative stock values.
    },

    category: {
      type: String,
      default: "Vegetables",
      // This line gives a default category.
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String,
      // This line says image must be text because it stores an image URL.
      default: ""
      // This line allows products to be created without an image URL.
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      // This line stores the MongoDB id of the farmer user.
      ref: "User",
      // This line connects this field to the User model.
      required: true
      // This line says every product must belong to a farmer.
    }
  },
  {
    // This line starts the schema options object.
    timestamps: true
    // This line automatically adds createdAt and updatedAt fields.
  }
);

module.exports = mongoose.model("Product", ProductSchema);
// This line creates and exports the Product model for the products collection.
