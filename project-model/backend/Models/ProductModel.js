const mongoose = require("mongoose");
// This line imports mongoose for creating the product schema.

const ProductSchema = new mongoose.Schema(
  // This line creates a schema that describes products in the database.
  {
    // This line starts the object that contains all product fields.
    name: {
      // This line creates the product name field.
      type: String,
      // This line says product name must be text.
      required: true,
      // This line says every product must have a name.
      trim: true
      // This line removes extra spaces from the product name.
    },
    // This line ends the product name field.
    price: {
      // This line creates the product price field.
      type: Number,
      // This line says product price must be a number.
      required: true,
      // This line says every product must have a price.
      min: 0
      // This line prevents negative prices.
    },
    // This line ends the product price field.
    quantity: {
      // This line creates the quantity field.
      type: Number,
      // This line says quantity must be a number.
      required: true,
      // This line says every product must have a quantity.
      min: 0
      // This line prevents negative stock values.
    },
    // This line ends the quantity field.
    category: {
      // This line creates the category field.
      type: String,
      // This line says category must be text.
      default: "Vegetables",
      // This line gives a default category.
      trim: true
      // This line removes extra spaces from the category.
    },
    // This line ends the category field.
    location: {
      // This line creates the location field.
      type: String,
      // This line says location must be text.
      required: true,
      // This line says every product must have a location.
      trim: true
      // This line removes extra spaces from the location.
    },
    // This line ends the location field.
    image: {
      // This line creates the image field.
      type: String,
      // This line says image must be text because it stores an image URL.
      default: ""
      // This line allows products to be created without an image URL.
    },
    // This line ends the image field.
    description: {
      // This line creates the description field.
      type: String,
      // This line says description must be text.
      required: true,
      // This line says every product must have a description.
      trim: true
      // This line removes extra spaces from the description.
    },
    // This line ends the description field.
    farmer: {
      // This line creates the farmer field.
      type: mongoose.Schema.Types.ObjectId,
      // This line stores the MongoDB id of the farmer user.
      ref: "User",
      // This line connects this field to the User model.
      required: true
      // This line says every product must belong to a farmer.
    }
    // This line ends the farmer field.
  },
  // This line ends the product fields object.
  {
    // This line starts the schema options object.
    timestamps: true
    // This line automatically adds createdAt and updatedAt fields.
  }
  // This line ends the schema options object.
);
// This line ends the ProductSchema creation.

module.exports = mongoose.model("Product", ProductSchema);
// This line creates and exports the Product model for the products collection.
