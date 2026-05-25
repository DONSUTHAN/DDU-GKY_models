const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../controllers/authController");

const router = express.Router();

// Register a new user.
router.post("/register", registerUser);

// Login an existing user.
router.post("/login", loginUser);

// Logout current user.
router.post("/logout", logoutUser);

// Check login status and get current user.
router.get("/me", getCurrentUser);

module.exports = router;
