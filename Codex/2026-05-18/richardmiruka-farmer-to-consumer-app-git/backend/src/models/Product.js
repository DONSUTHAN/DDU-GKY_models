import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      default: "kg"
    },
    quantityAvailable: {
      type: Number,
      required: true,
      min: 0
    },
    imageUrl: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

productSchema.index({ name: "text", category: "text", location: "text" });

export const Product = mongoose.model("Product", productSchema);
