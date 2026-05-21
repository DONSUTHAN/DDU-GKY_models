function notFound(req, res, next) {
  // Defines middleware for routes that do not exist.
  const error = new Error(`Route not found: ${req.originalUrl}`);
  // Creates an error message using the requested URL.
  res.status(404);
  // Sets the response status to 404 Not Found.
  next(error);
  // Passes the error to the central error handler.
}

function errorHandler(err, req, res, next) {
  // Defines the central Express error handler.
  const statusCode = res.statusCode === 200 ? err.statusCode || 500 : res.statusCode;
  // Uses the existing response status or falls back to the error status.

  res.status(statusCode).json({
    // Sends the error response using the chosen status code.
    message: err.message || "Server error",
    // Sends the error message to the frontend.
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack
    // Sends the stack trace only outside production.
  });
}

module.exports = { errorHandler, notFound };
// Exports error middleware for app.js.
