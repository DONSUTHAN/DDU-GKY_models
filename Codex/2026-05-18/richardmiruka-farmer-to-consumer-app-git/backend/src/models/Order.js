import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    unit: String,
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    consumer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: {
      type: [orderItemSchema],
      validate: [(items) => items.length > 0, "Order must include at least one item"]
    },
    deliveryAddress: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending"
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid"
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
