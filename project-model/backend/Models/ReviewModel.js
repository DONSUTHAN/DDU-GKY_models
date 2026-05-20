const mongoose = require("mongoose");
// This line imports mongoose for creating the review schema.

const ReviewSchema = new mongoose.Schema(
  // This line creates a schema that describes product reviews.
  {
    // This line starts the object that contains all review fields.
    product: {
      // This line creates the product field.
      type: mongoose.Schema.Types.ObjectId,
      // This line stores the MongoDB id of the reviewed product.
      ref: "Product",
      // This line connects this field to the Product model.
      required: true
      // This line says every review must belong to a product.
    },
    // This line ends the product field.
    user: {
      // This line creates the user field.
      type: mongoose.Schema.Types.ObjectId,
      // This line stores the MongoDB id of the reviewer.
      ref: "User",
      // This line connects this field to the User model.
      required: true
      // This line says every review must belong to a user.
    },
    // This line ends the user field.
    rating: {
      // This line creates the rating field.
      type: Number,
      // This line says rating must be a number.
      required: true,
      // This line says every review must have a rating.
      min: 1,
      // This line makes 1 the lowest rating.
      max: 5
      // This line makes 5 the highest rating.
    },
    // This line ends the rating field.
    comment: {
      // This line creates the comment field.
      type: String,
      // This line says comment must be text.
      required: true,
      // This line says every review must have a comment.
      trim: true
      // This line removes extra spaces from the comment.
    }
    // This line ends the comment field.
  },
  // This line ends the review fields object.
  {
    // This line starts the schema options object.
    timestamps: true
    // This line automatically adds createdAt and updatedAt fields.
  }
  // This line ends the schema options object.
);
// This line ends the ReviewSchema creation.

module.exports = mongoose.model("Review", ReviewSchema);
// This line creates and exports the Review model for the reviews collection.
