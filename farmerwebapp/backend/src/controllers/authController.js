const { User } = require("../models/User");
// Loads the User model so the controller can create and find users.
const { AppError } = require("../utils/AppError");
// Loads the custom error class for readable API errors.
const { signToken } = require("../utils/token");
// Loads the helper that creates JWT login tokens.

function authResponse(user, token) {
  // Builds the response object returned after register or login.
  return {
    // Starts the response object.
    token,
    // Sends the JWT token to the frontend.
    user: {
      // Starts the safe user object sent to the frontend.
      id: user._id,
      // Sends the user's MongoDB id.
      name: user.name,
      // Sends the user's name.
      email: user.email,
      // Sends the user's email.
      role: user.role,
      // Sends the user's role.
      phone: user.phone,
      // Sends the user's phone number.
      location: user.location
      // Sends the user's location.
    }
  };
}

async function register(req, res, next) {
  // Handles creating a new user account.
  try {
    // Starts a try block so errors go to the error handler.
    const { name, email, password, role, phone, location } = req.body;
    // Reads account details from the request body.
    const existingUser = await User.findOne({ email });
    // Checks whether another user already has this email.

    if (existingUser) {
      // Runs when the email is already registered.
      throw new AppError("Email is already registered", 409);
      // Sends a conflict error because duplicate email is not allowed.
    }

    const user = await User.create({ name, email, password, role, phone, location });
    // Creates the new user in MongoDB.
    const token = signToken(user);
    // Creates a JWT token for the new user.

    res.status(201).json(authResponse(user, token));
    // Sends the new user and token with a 201 Created status.
  } catch (error) {
    // Catches validation, database, or duplicate-account errors.
    next(error);
    // Sends the error to the central error handler.
  }
}

async function login(req, res, next) {
  // Handles logging in an existing user.
  try {
    // Starts a try block so errors go to the error handler.
    const { email, password } = req.body;
    // Reads login details from the request body.
    const user = await User.findOne({ email }).select("+password");
    // Finds the user and explicitly includes the hidden password field.

    if (!user || !(await user.comparePassword(password))) {
      // Checks whether the user is missing or the password is wrong.
      throw new AppError("Invalid email or password", 401);
      // Sends an unauthorized error for invalid login details.
    }

    const token = signToken(user);
    // Creates a JWT token for the logged-in user.
    res.json(authResponse(user, token));
    // Sends the user and token to the frontend.
  } catch (error) {
    // Catches login or database errors.
    next(error);
    // Sends the error to the central error handler.
  }
}

function getMe(req, res) {
  // Handles returning the currently authenticated user.
  res.json({ user: req.user });
  // Sends the user added by the protect middleware.
}

module.exports = { getMe, login, register };
// Exports auth controller functions for authRoutes.js.
