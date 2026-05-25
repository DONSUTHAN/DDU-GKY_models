require("dotenv/config");
// Loads variables from the .env file into process.env.
const app = require("./app");
// Imports the Express app configuration.


const port = process.env.PORT || 5000;
// Chooses the port from .env, or uses 5000 by default.

connectDB()
  // Connects to MongoDB before accepting API requests.
  .then(() => {
    // Runs this block after MongoDB connects successfully.
    app.listen(port, () => {
      // Starts the Express server on the selected port.
      console.log(`API running on http://localhost:${port}`);
      // Prints the local API URL in the terminal.
    });
  })
  .catch((error) => {
    // Runs this block if the database connection fails.
    console.error(error);
    // Prints the database connection error.
    process.exit(1);
    // Stops the Node process because the API needs MongoDB.
  });
