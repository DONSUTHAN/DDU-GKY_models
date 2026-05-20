class AppError extends Error {
  // Creates a custom error class for predictable API errors.
  constructor(message, statusCode = 500) {
    // Accepts an error message and an HTTP status code.
    super(message);
    // Sends the message to the built-in Error class.
    this.statusCode = statusCode;
    // Stores the HTTP status code on this error.
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    // Labels client errors as fail and server errors as error.
    this.isOperational = true;
    // Marks this error as expected app behavior.
  }
}

module.exports = { AppError };
// Exports AppError for controllers and middleware.
