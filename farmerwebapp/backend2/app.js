const cors = require("cors");
// Loads CORS middleware so the frontend can call this backend from another port.
const express = require("express");
// Loads Express, which creates the API server and routes.
const helmet = require("helmet");
// Loads Helmet, which adds common security headers.
const morgan = require("morgan");
// Loads Morgan, which logs incoming HTTP requests.
const authRoutes = require("./routes/authRoutes");
// Loads routes for register, login, and current-user profile.
const orderRoutes = require("./routes/orderRoutes");
// Loads routes for creating and viewing orders.
const productRoutes = require("./routes/productRoutes");
// Loads routes for listing, creating, updating, and deleting products.
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
// Loads middleware that handles missing routes and API errors.

const app = express();
// Creates the Express app instance.

app.use(helmet());
// Adds security-related HTTP headers to all responses.
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
// Allows requests from the configured frontend URL.
app.use(express.json());
// Converts JSON request bodies into req.body.
app.use(morgan("dev"));
// Prints each request in the terminal during development.

app.get("/api/health", (req, res) => {
  // Creates a small health-check endpoint for testing the API.
  res.json({ status: "ok", service: "farmer-to-consumer-api" });
  // Sends a JSON response that says the API is working.
});

app.use("/api/auth", authRoutes);
// Mounts authentication routes at /api/auth.
app.use("/api/products", productRoutes);
// Mounts product routes at /api/products.
app.use("/api/orders", orderRoutes);
// Mounts order routes at /api/orders.

app.use(notFound);
// Runs when no route above matches the request.
app.use(errorHandler);
// Sends errors back to the client as JSON.

module.exports = app;
// Exports the app so server.js can start it.
