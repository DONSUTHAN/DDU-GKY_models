const { Router } = require("express");
// Loads Express Router so auth endpoints can be grouped in one file.
const { body } = require("express-validator");
// Loads body validators for checking request body fields.
const { getMe, login, register } = require("../controllers/authController");
// Loads controller functions for authentication actions.
const { protect } = require("../middleware/authMiddleware");
// Loads middleware that requires a valid JWT.
const { validate } = require("../middleware/validate");
// Loads middleware that sends validation errors back to the client.

const router = Router();
// Creates a router for authentication endpoints.

router.post(
  // Defines a POST route.
  "/register",
  // Sets the register endpoint path to /api/auth/register.
  [
    // Starts the list of validation rules for registration.
    body("name").trim().notEmpty().withMessage("Name is required"),
    // Requires the name field and removes extra spaces.
    body("email").isEmail().withMessage("Valid email is required"),
    // Requires the email field to contain a valid email address.
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    // Requires the password to be at least six characters.
    body("role").optional().isIn(["farmer", "consumer"]).withMessage("Role must be farmer or consumer")
    // Allows an optional role, but only farmer or consumer.
  ],
  validate,
  // Stops the request when validation fails.
  register
  // Runs the register controller when validation passes.
);

router.post(
  // Defines another POST route.
  "/login",
  // Sets the login endpoint path to /api/auth/login.
  [
    // Starts the list of validation rules for login.
    body("email").isEmail().withMessage("Valid email is required"),
    // Requires the email field to contain a valid email address.
    body("password").notEmpty().withMessage("Password is required")
    // Requires the password field to be present.
  ],
  validate,
  // Stops the request when validation fails.
  login
  // Runs the login controller when validation passes.
);

router.get("/me", protect, getMe);
// Returns the current logged-in user after checking the JWT.

module.exports = router;
// Exports the router for app.js.
