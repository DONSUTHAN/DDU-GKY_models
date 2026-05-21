const jwt = require("jsonwebtoken");
// Loads the JWT library used to create login tokens.

function signToken(user) {
  // Defines a helper that signs a token for a user.
  return jwt.sign(
    // Creates and returns a signed JWT string.
    { id: user._id, role: user.role },
    // Stores the user's id and role inside the token.
    process.env.JWT_SECRET,
    // Uses the secret key from .env to sign the token.
    { expiresIn: "7d" }
    // Sets the token to expire in seven days.
  );
}

module.exports = { signToken };
// Exports signToken for the authentication controller.
