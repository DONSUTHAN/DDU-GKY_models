const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const BlogRoutes = require("./routes/BlogRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "API running" });
});

app.use("/api/posts", BlogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});

