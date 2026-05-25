const mongoose = require("mongoose");
// Loads Mongoose, the library used to connect Express to MongoDB.

async function connectDB() {
  // Defines an async function for opening the database connection.
  const url = process.env.MONGO_URL;
  // Reads the MongoDB connection string from the environment.

  if (!url) {
    // Checks whether the connection string is missing.
    throw new Error("MONGO_URL is required");
    // Throws a clear startup error when no MongoDB URL is configured.
  }

  await mongoose.connect(uri);
  // Connects to MongoDB using the provided URL.
  console.log("MongoDB connected");
  // Prints a success message after the database connects.
}

module.exports = { connectDB };
// Exports connectDB so other files can use it.
