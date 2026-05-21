const jwt = require("jsonwebtoken");
// This line imports jsonwebtoken for checking login tokens.

const User = require("../Models/UserModel");
// This line imports the User model so the middleware can find the logged-in user.

const protect = async (req, res, next) => {
  // This line creates middleware that protects private API routes.
  try {
    const authHeader = req.headers.authorization;
    // This line reads the Authorization header sent from the frontend.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // This line checks if the token is missing or not in the correct format.
      return res.status(401).json({ message: "No token, authorization denied" });
      // This line stops the request when the user is not logged in.
    }
    // This line ends the missing-token check.
    const token = authHeader.split(" ")[1];
    // This line removes the word Bearer and keeps only the token value.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // This line verifies the token and reads the user id inside it.
    req.user = await User.findById(decoded.id).select("-password");
    // This line finds the logged-in user and removes the password from the result.
    if (!req.user) {
      // This line checks if the token user no longer exists.
      return res.status(401).json({ message: "User not found" });
      // This line stops the request if the user was deleted.
    }
    // This line ends the missing-user check.
    next();
    // This line allows the request to continue to the controller.
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
    // This line sends an error response when the token is invalid.
  }
};
// This line ends the protect middleware.

const allowRoles = (...roles) => {
  // This line creates middleware for checking if a user role is allowed.
  return (req, res, next) => {
    // This line returns the real middleware function.
    if (!roles.includes(req.user.role)) {
      // This line checks if the logged-in user's role is not allowed.
      return res.status(403).json({ message: "You are not allowed to do this action" });
      // This line stops the request when the role is wrong.
    }
    // This line ends the role check.
    next();
    // This line allows the request when the role is correct.
  };
};

module.exports = { protect, allowRoles };
// This line exports both middleware functions.
