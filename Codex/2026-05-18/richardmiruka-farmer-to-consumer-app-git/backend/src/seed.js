import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { Order } from "./models/Order.js";
import { Product } from "./models/Product.js";
import { User } from "./models/User.js";

await connectDB();

await Promise.all([Order.deleteMany({}), Product.deleteMany({}), User.deleteMany({})]);

const [farmer, consumer] = await User.create([
  {
    name: "Amina Green Farm",
    email: "farmer@example.com",
    password: "password123",
    role: "farmer",
    phone: "+254700000001",
    location: "Nakuru"
  },
  {
    name: "Demo Consumer",
    email: "consumer@example.com",
    password: "password123",
    role: "consumer",
    phone: "+254700000002",
    location: "Nairobi"
  }
]);

await Product.create([
  {
    farmer: farmer._id,
    name: "Fresh Tomatoes",
    description: "Field-grown red tomatoes harvested this week.",
    category: "Vegetables",
    price: 120,
    unit: "kg",
    quantityAvailable: 80,
    location: "Nakuru",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=80"
  },
  {
    farmer: farmer._id,
    name: "Sweet Bananas",
    description: "Naturally ripened bananas from a smallholder farm.",
    category: "Fruits",
    price: 90,
    unit: "bunch",
    quantityAvailable: 45,
    location: "Kisii",
    imageUrl: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=900&q=80"
  },
  {
    farmer: farmer._id,
    name: "Organic Potatoes",
    description: "Clean, firm potatoes suitable for home cooking and restaurants.",
    category: "Tubers",
    price: 70,
    unit: "kg",
    quantityAvailable: 120,
    location: "Nyandarua",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80"
  }
]);

console.log("Seed complete");
console.log("Farmer login: farmer@example.com / password123");
console.log("Consumer login: consumer@example.com / password123");

await mongoose.disconnect();
