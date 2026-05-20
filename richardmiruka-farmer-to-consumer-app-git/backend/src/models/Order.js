const mongoose = require("mongoose");
// Loads Mongoose so we can define the order schemas and model.

const orderItemSchema = new mongoose.Schema(
  // Creates the structure for each item inside an order.
  {
    // Starts the list of fields stored for each order item.
    product: {
      // Stores the product being ordered.
      type: mongoose.Schema.Types.ObjectId,
      // Uses a MongoDB object id.
      ref: "Product",
      // Links this id to the Product model.
      required: true
      // Requires every order item to reference a product.
    },
    farmer: {
      // Stores the farmer who owns the ordered product.
      type: mongoose.Schema.Types.ObjectId,
      // Uses a MongoDB object id.
      ref: "User",
      // Links this id to the User model.
      required: true
      // Requires every order item to reference a farmer.
    },
    name: String,
    // Stores the product name at the time of ordering.
    quantity: {
      // Stores how many units the consumer ordered.
      type: Number,
      // Saves the quantity as a number.
      required: true,
      // Requires every order item to have a quantity.
      min: 1
      // Requires at least one unit.
    },
    unit: String,
    // Stores the product unit at the time of ordering.
    price: {
      // Stores the product price at the time of ordering.
      type: Number,
      // Saves the price as a number.
      required: true,
      // Requires every order item to have a price.
      min: 0
      // Prevents negative prices.
    }
  },
  { _id: false }
  // Prevents Mongoose from creating a separate id for each item.
);

const orderSchema = new mongoose.Schema(
  // Creates the structure for full order documents in MongoDB.
  {
    // Starts the list of fields stored for each order.
    consumer: {
      // Stores the user who placed the order.
      type: mongoose.Schema.Types.ObjectId,
      // Uses a MongoDB object id.
      ref: "User",
      // Links this id to the User model.
      required: true
      // Requires every order to belong to a consumer.
    },
    items: {
      // Stores all products included in this order.
      type: [orderItemSchema],
      // Uses the order item schema for every item in the array.
      validate: [(items) => items.length > 0, "Order must include at least one item"]
      // Rejects orders that do not contain any items.
    },
    deliveryAddress: {
      // Stores where the order should be delivered.
      type: String,
      // Saves the address as text.
      required: true
      // Requires every order to have a delivery address.
    },
    phone: {
      // Stores the contact phone number for delivery.
      type: String,
      // Saves the phone number as text.
      required: true
      // Requires every order to include a phone number.
    },
    totalAmount: {
      // Stores the full cost of the order.
      type: Number,
      // Saves the total as a number.
      required: true,
      // Requires every order to include the total.
      min: 0
      // Prevents negative totals.
    },
    status: {
      // Stores the current delivery workflow status.
      type: String,
      // Saves the status as text.
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      // Allows only these order status values.
      default: "pending"
      // Starts new orders as pending.
    },
    paymentStatus: {
      // Stores whether the order has been paid.
      type: String,
      // Saves the payment status as text.
      enum: ["unpaid", "paid"],
      // Allows only unpaid or paid values.
      default: "unpaid"
      // Starts new orders as unpaid.
    }
  },
  { timestamps: true }
  // Automatically adds createdAt and updatedAt fields.
);

const Order = mongoose.model("Order", orderSchema);
// Creates the Order model from the schema.

module.exports = { Order };
// Exports the Order model for controllers.
