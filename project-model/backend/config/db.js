const mongoose = require("mongoose");
// This line imports mongoose so Node.js can connect this backend to MongoDB.

require("dotenv").config();
// This line loads variables from the .env file into process.env.

const connectDB = async () => {
  // This line creates an async function named connectDB for database connection.
  try {
    // This line starts a try block so connection errors can be handled safely.
    await mongoose.connect(process.env.MONGO_URL);
    // This line connects mongoose to the MongoDB URL stored in the .env file.
    console.log("mongo connected");
    // This line prints success when MongoDB is connected.
  } catch (error) {
    // This line catches any database connection error.
    console.log("mongo connection failed");
    // This line prints a simple failure message for beginners.
    console.log(error.message);
    // This line prints the real error message for debugging.
  }
};
// This line ends the connectDB function.

module.exports = connectDB;
// This line exports connectDB so server.js can use it.
