const mongoose = require("mongoose");
// This line imports mongoose for creating the order schema.

const OrderSchema = new mongoose.Schema(
  // This line creates a schema that describes orders in the database.
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      // This line stores the MongoDB id of the ordered product.
      ref: "Product",
      // This line connects this field to the Product model.
      required: true
      // This line says every order must have a product.
    },

    consumer: {
      type: mongoose.Schema.Types.ObjectId,
      // This line stores the MongoDB id of the buyer.
      ref: "User",
      // This line connects this field to the User model.
      required: true
      // This line says every order must have a consumer.
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      // This line stores the MongoDB id of the seller.
      ref: "User",
      // This line connects this field to the User model.
      required: true
      // This line says every order must have a farmer.
    },

    quantity: {
      type: Number,
      required: true,
      // This line says every order must have a quantity.
      min: 1
      // This line prevents orders with zero quantity.
    },

    totalPrice: {
      type: Number,
      required: true,
      // This line says every order must have a total price.
      min: 0
      // This line prevents negative totals.
    },

    address: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },
    
    paymentMethod: {
      type: String,
      enum: ["cash", "G-pay"],
      // This line allows only cash or g-pay.
      default: "cash"
    },

    status: {
      // This line creates the order status field.
      type: String,
      enum: ["pending", "accepted", "delivered", "cancelled"],
      // This line limits the status to known order steps.
      default: "pending"
      // This line makes new orders pending by default.
    }
  },


  {
    // This line starts the schema options object.
    timestamps: true
    // This line automatically adds createdAt and updatedAt fields.
  }
);


module.exports = mongoose.model("Order", OrderSchema);
// This line creates and exports the Order model for the orders collection.
