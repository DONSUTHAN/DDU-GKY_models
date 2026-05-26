require("dotenv/config");
// Loads environment variables from the backend .env file.
const mongoose = require("mongoose");
// Loads Mongoose so the script can disconnect after seeding.
const { connectDB } = require("./config/db");
// Loads the database connection helper.
const { Order } = require("./models/Order");
// Loads the Order model so old orders can be cleared.
const { Product } = require("./models/Product");
// Loads the Product model so sample products can be created.
const { User } = require("./models/User");
// Loads the User model so sample users can be created.

async function seed() {
  // Defines the main async seed function.
  await connectDB();
  // Connects to MongoDB before changing data.

  await Promise.all([Order.deleteMany({}), Product.deleteMany({}), User.deleteMany({})]);
  // Clears old demo orders, products, and users at the same time.

  const [farmer, consumer] = await User.create([
    // Creates demo users and stores them in farmer and consumer variables.
    {
      // Starts the demo farmer account.
      name: "Amina Green Farm",
      // Sets the farmer display name.
      email: "farmer@example.com",
      // Sets the farmer login email.
      password: "password123",
      // Sets the farmer login password before the model hashes it.
      role: "farmer",
      // Gives this account farmer permissions.
      phone: "+254700000001",
      // Sets the farmer phone number.
      location: "Nakuru"
      // Sets the farmer location.
    },
    {
      // Starts the demo consumer account.
      name: "Demo Consumer",
      // Sets the consumer display name.
      email: "consumer@example.com",
      // Sets the consumer login email.
      password: "password123",
      // Sets the consumer login password before the model hashes it.
      role: "consumer",
      // Gives this account consumer permissions.
      phone: "+254700000002",
      // Sets the consumer phone number.
      location: "Nairobi"
      // Sets the consumer location.
    }
  ]);

  await Product.create([
    // Creates sample products for the demo farmer.
    {
      // Starts the sample tomato product.
      farmer: farmer._id,
      // Assigns the product to the demo farmer.
      name: "Fresh Tomatoes",
      // Sets the product name.
      description: "Field-grown red tomatoes harvested this week.",
      // Sets the product description.
      category: "Vegetables",
      // Sets the product category.
      price: 120,
      // Sets the product price.
      unit: "kg",
      // Sets the product unit.
      quantityAvailable: 80,
      // Sets the available stock.
      location: "Nakuru",
      // Sets the product location.
      imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=80"
      // Sets the product image URL.
    },
    {
      // Starts the sample banana product.
      farmer: farmer._id,
      // Assigns the product to the demo farmer.
      name: "Sweet Bananas",
      // Sets the product name.
      description: "Naturally ripened bananas from a smallholder farm.",
      // Sets the product description.
      category: "Fruits",
      // Sets the product category.
      price: 90,
      // Sets the product price.
      unit: "bunch",
      // Sets the product unit.
      quantityAvailable: 45,
      // Sets the available stock.
      location: "Kisii",
      // Sets the product location.
      imageUrl: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=900&q=80"
      // Sets the product image URL.
    },
    {
      // Starts the sample potato product.
      farmer: farmer._id,
      // Assigns the product to the demo farmer.
      name: "Organic Potatoes",
      // Sets the product name.
      description: "Clean, firm potatoes suitable for home cooking and restaurants.",
      // Sets the product description.
      category: "Tubers",
      // Sets the product category.
      price: 70,
      // Sets the product price.
      unit: "kg",
      // Sets the product unit.
      quantityAvailable: 120,
      // Sets the available stock.
      location: "Nyandarua",
      // Sets the product location.
      imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80"
      // Sets the product image URL.
    }
  ]);

  console.log("Seed complete");
  // Prints a success message after sample data is created.
  console.log("Farmer login: farmer@example.com / password123");
  // Prints the demo farmer login details.
  console.log("Consumer login: consumer@example.com / password123");
  // Prints the demo consumer login details.

  await mongoose.disconnect();
  // Closes the MongoDB connection after seeding finishes.
}

seed().catch(async (error) => {
  // Runs this block if the seed function fails.
  console.error(error);
  // Prints the seed error.
  await mongoose.disconnect();
  // Closes the MongoDB connection even when an error happens.
  process.exit(1);
  // Stops the script with a failure status.
});
