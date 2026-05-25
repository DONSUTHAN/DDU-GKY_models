const { validationResult } = require("express-validator");
// Loads the helper that collects validation errors from express-validator.
const { AppError } = require("../utils/AppError");
// Loads the custom error class for validation failures.

function validate(req, res, next) {
  // Defines middleware that checks request validation results.
  const errors = validationResult(req);
  // Collects validation errors created by route validation rules.

  if (!errors.isEmpty()) {
    // Checks whether any validation errors exist.
    const message = errors.array().map((error) => error.msg).join(", ");
    // Turns all validation messages into one readable string.
    return next(new AppError(message, 400));
    // Sends a 400 Bad Request error to the central error handler.
  }

  next();
  // Allows the request to continue when validation passes.
}

module.exports = { validate };
// Exports validate so routes can reuse it.
