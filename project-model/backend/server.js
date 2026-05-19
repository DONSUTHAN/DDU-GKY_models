const express = require("express");
// This line imports express for creating the backend server.

const cors = require("cors");
// This line imports cors so the React frontend can call this backend.

const dotenv = require("dotenv");
// This line imports dotenv so .env variables can be loaded.

const connectDB = require("./config/db");
// This line imports the MongoDB connection function.

const authRoutes = require("./Routes/authRoutes");
// This line imports routes for login and register APIs.

const productRoutes = require("./Routes/ProductRoute");
// This line imports routes for product APIs.

const orderRoutes = require("./Routes/orderRoutes");
// This line imports routes for order APIs.

const reviewRoutes = require("./Routes/reviewRoutes");
// This line imports routes for review APIs.

dotenv.config();
// This line loads .env values into process.env.

connectDB();
// This line connects the backend to MongoDB.

const app = express();
// This line creates the express app.

app.use(cors());
// This line allows requests from the frontend.

app.use(express.json());
// This line allows the backend to read JSON request bodies.

app.get("/", (req, res) => {
  // This line creates a test route for checking if the API is running.
  res.send("The Farm Vegi API Running...");
  // This line sends a simple message to the browser or frontend.
});
// This line ends the test route.

app.use("/api/auth", authRoutes);
// This line connects auth routes to /api/auth.

app.use("/api/products", productRoutes);
// This line connects product routes to /api/products.

app.use("/api/orders", orderRoutes);
// This line connects order routes to /api/orders.

app.use("/api/reviews", reviewRoutes);
// This line connects review routes to /api/reviews.

const port = process.env.PORT || 3000;
// This line uses the .env port or 3000 if no port is given.

app.listen(port, () => {
  // This line starts the backend server.
  console.log(`server connected on port ${port}`);
  // This line prints the running port in the terminal.
});
// This line ends the server listen function.
