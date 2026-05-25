const mongoose = require("mongoose");
// Loads Mongoose so we can define the product schema and model.

const productSchema = new mongoose.Schema(
  // Creates the structure for product documents in MongoDB.
  {
    // Starts the list of fields stored for each product.
    farmer: {
      // Stores the farmer who owns this product.
      type: mongoose.Schema.Types.ObjectId,
      // Uses a MongoDB object id.
      ref: "User",
      // Links this id to the User model.
      required: true
      // Requires every product to belong to a farmer.
    },
    name: {
      // Defines the product name field.
      type: String,
      // Stores the product name as text.
      required: true,
      // Requires every product to have a name.
      trim: true
      // Removes extra spaces from the product name.
    },
    description: {
      // Defines the product description field.
      type: String,
      // Stores the description as text.
      required: true,
      // Requires every product to have a description.
      trim: true
      // Removes extra spaces from the description.
    },
    category: {
      // Defines the product category field.
      type: String,
      // Stores the category as text.
      required: true,
      // Requires every product to have a category.
      trim: true
      // Removes extra spaces from the category.
    },
    price: {
      // Defines the product price field.
      type: Number,
      // Stores the price as a number.
      required: true,
      // Requires every product to have a price.
      min: 0
      // Prevents negative prices.
    },
    unit: {
      // Defines the unit used for pricing.
      type: String,
      // Stores units like kg, bunch, or crate as text.
      default: "kg"
      // Uses kg when no unit is provided.
    },
    quantityAvailable: {
      // Defines how much stock is available.
      type: Number,
      // Stores the available quantity as a number.
      required: true,
      // Requires every product to have a stock quantity.
      min: 0
      // Prevents negative stock.
    },
    imageUrl: {
      // Defines the product image URL field.
      type: String,
      // Stores the image URL as text.
      default: ""
      // Uses an empty string when no image is provided.
    },
    location: {
      // Defines where the product is located.
      type: String,
      // Stores the location as text.
      required: true
      // Requires every product to have a location.
    },
    isAvailable: {
      // Defines whether the product should appear in the market.
      type: Boolean,
      // Stores availability as true or false.
      default: true
      // Makes products available by default.
    }
  },
  { timestamps: true }
  // Automatically adds createdAt and updatedAt fields.
);

productSchema.index({ name: "text", category: "text", location: "text" });
// Adds a text index so products can be searched by name, category, or location.

const Product = mongoose.model("Product", productSchema);
// Creates the Product model from the schema.

module.exports = { Product };
// Exports the Product model for controllers.
