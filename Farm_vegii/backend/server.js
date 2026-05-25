const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const { ensureSeedFruits } = require("./controllers/fruitController");

const authRoutes = require("./routes/authRoutes");
const fruitRoutes = require("./routes/fruitRoutes");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config();

const app = express();

// Connect to MongoDB first.
connectDB().then(() => {
  // Seed initial data after successful DB connection.
  ensureSeedFruits().catch((error) => {
    console.error("Fruit seed failed:", error.message);
  });
});

// Parse JSON bodies from frontend.
app.use(express.json());

// Parse URL encoded bodies.
app.use(express.urlencoded({ extended: true }));

// Parse cookie header into req.cookies.
app.use(cookieParser());

// Allow frontend origin and cookie credentials.
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// API health route.
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Farm Vegii backend running",
  });
});

// Mount API routes.
app.use("/api/auth", authRoutes);
app.use("/api/fruits", fruitRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
