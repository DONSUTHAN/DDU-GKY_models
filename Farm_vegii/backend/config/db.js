const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongo connected");
  } catch (error) {
    console.log("mongo connection failed");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
// This line exports connectDB so server.js can use it.
