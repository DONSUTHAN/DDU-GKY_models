const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      // This line stores the MongoDB id of the reviewed product.
      ref: "Product",
      // This line connects this field to the Product model.
      required: true
      // This line says every review must belong to a product.
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      // This line stores the MongoDB id of the reviewer.
      ref: "User",
      // This line connects this field to the User model.
      required: true
      // This line says every review must belong to a user.
    },

    rating: {
      type: Number,
      required: true,
      // This line says every review must have a rating.
      min: 1,
      // This line makes 1 the lowest rating.
      max: 5
      // This line makes 5 the highest rating.
    },
    comment: {
      type: String,
      required: true,
      trim: true
    }

  },

  {
    // This line starts the schema options object.
    timestamps: true
    // This line automatically adds createdAt and updatedAt fields.
  }
);


module.exports = mongoose.model("Review", ReviewSchema);
// This line creates and exports the Review model for the reviews collection.
