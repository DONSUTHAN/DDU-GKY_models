const express = require("express");
// This line imports express so we can create routes.

const { registerUser, loginUser, getProfile } = require("../controller/userController");
// This line imports user controller functions.

const { protect } = require("../middleware/authMiddleware");
// This line imports the protect middleware for private routes.

const router = express.Router();
// This line creates an express router for auth APIs.

router.post("/register", registerUser);
// This line creates the POST route for user registration.

router.post("/login", loginUser);
// This line creates the POST route for user login.

router.get("/profile", protect, getProfile);
// This line creates a protected GET route for logged-in user profile.

module.exports = router;
