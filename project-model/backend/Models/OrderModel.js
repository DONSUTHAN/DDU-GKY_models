const mongoose = require("mongoose");
// This line imports mongoose for creating the order schema.

const OrderSchema = new mongoose.Schema(
  // This line creates a schema that describes orders in the database.
  {
    // This line starts the object that contains all order fields.
    product: {
      // This line creates the product field.
      type: mongoose.Schema.Types.ObjectId,
      // This line stores the MongoDB id of the ordered product.
      ref: "Product",
      // This line connects this field to the Product model.
      required: true
      // This line says every order must have a product.
    },
    // This line ends the product field.
    consumer: {
      // This line creates the consumer field.
      type: mongoose.Schema.Types.ObjectId,
      // This line stores the MongoDB id of the buyer.
      ref: "User",
      // This line connects this field to the User model.
      required: true
      // This line says every order must have a consumer.
    },
    // This line ends the consumer field.
    farmer: {
      // This line creates the farmer field.
      type: mongoose.Schema.Types.ObjectId,
      // This line stores the MongoDB id of the seller.
      ref: "User",
      // This line connects this field to the User model.
      required: true
      // This line says every order must have a farmer.
    },
    // This line ends the farmer field.
    quantity: {
      // This line creates the quantity field.
      type: Number,
      // This line says quantity must be a number.
      required: true,
      // This line says every order must have a quantity.
      min: 1
      // This line prevents orders with zero quantity.
    },
    // This line ends the quantity field.
    totalPrice: {
      // This line creates the totalPrice field.
      type: Number,
      // This line says totalPrice must be a number.
      required: true,
      // This line says every order must have a total price.
      min: 0
      // This line prevents negative totals.
    },
    // This line ends the totalPrice field.
    address: {
      // This line creates the address field.
      type: String,
      // This line says address must be text.
      required: true,
      // This line says every order must have a delivery address.
      trim: true
      // This line removes extra spaces from the address.
    },
    // This line ends the address field.
    phone: {
      // This line creates the phone field.
      type: String,
      // This line says phone must be text.
      required: true,
      // This line says every order must have a phone number.
      trim: true
      // This line removes extra spaces from the phone number.
    },
    // This line ends the phone field.
    paymentMethod: {
      // This line creates the payment method field.
      type: String,
      // This line says payment method must be text.
      enum: ["cash", "mpesa"],
      // This line allows only cash or mpesa.
      default: "cash"
      // This line sets cash as the default payment method.
    },
    // This line ends the payment method field.
    status: {
      // This line creates the order status field.
      type: String,
      // This line says status must be text.
      enum: ["pending", "accepted", "delivered", "cancelled"],
      // This line limits the status to known order steps.
      default: "pending"
      // This line makes new orders pending by default.
    }
    // This line ends the status field.
  },
  // This line ends the order fields object.
  {
    // This line starts the schema options object.
    timestamps: true
    // This line automatically adds createdAt and updatedAt fields.
  }
  // This line ends the schema options object.
);
// This line ends the OrderSchema creation.

module.exports = mongoose.model("Order", OrderSchema);
// This line creates and exports the Order model for the orders collection.
