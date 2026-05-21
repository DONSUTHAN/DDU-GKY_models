import React from "react";
import { createRoot } from "react-dom/client";
// This line imports createRoot so React can start the app.

import App from "./App.jsx";
// This line imports the main App component.

import "./App.css";
// This line imports global app styles.

createRoot(document.getElementById("root")).render(
  // This line finds the root div in index.html and tells React to render inside it.
  <React.StrictMode>
    {/* This line helps React warn us about possible problems during development. */}
    <App />
    {/* This line renders the full The Farm Vegi app. */}
  </React.StrictMode>
  // This line closes React strict mode.
);
// This line ends the React render call.
