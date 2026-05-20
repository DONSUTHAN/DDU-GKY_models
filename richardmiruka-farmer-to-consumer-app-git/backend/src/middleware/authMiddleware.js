const jwt = require("jsonwebtoken");
// Loads JWT so the middleware can verify login tokens.
const { AppError } = require("../utils/AppError");
// Loads the custom error class for clean API errors.
const { User } = require("../models/User");
// Loads the User model so tokens can be matched to real users.

async function protect(req, res, next) {
  // Defines middleware that protects routes from unauthenticated users.
  try {
    // Starts a try block so token errors can be passed to the error handler.
    const header = req.headers.authorization;
    // Reads the Authorization header from the request.

    if (!header?.startsWith("Bearer ")) {
      // Checks whether the header is missing or not a Bearer token.
      throw new AppError("Authentication token is required", 401);
      // Rejects the request because no valid token was provided.
    }

    const token = header.split(" ")[1];
    // Extracts the token part after the word Bearer.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Verifies the token and reads the payload inside it.
    const user = await User.findById(decoded.id).select("-password");
    // Finds the logged-in user and excludes the password field.

    if (!user) {
      // Checks whether the token belongs to a user that no longer exists.
      throw new AppError("User no longer exists", 401);
      // Rejects the request because the token is no longer valid.
    }

    req.user = user;
    // Stores the authenticated user on the request object.
    next();
    // Allows the request to continue to the next middleware or controller.
  } catch (error) {
    // Catches invalid token or database lookup errors.
    next(error);
    // Sends the error to the central error handler.
  }
}

function authorize(...roles) {
  // Creates middleware that allows only selected user roles.
  return (req, res, next) => {
    // Returns the actual Express middleware function.
    if (!roles.includes(req.user.role)) {
      // Checks whether the current user's role is allowed.
      return next(new AppError("You do not have permission for this action", 403));
      // Rejects the request when the user's role is not allowed.
    }

    next();
    // Allows the request when the user's role is allowed.
  };
}

module.exports = { authorize, protect };
// Exports both authentication and authorization middleware.
