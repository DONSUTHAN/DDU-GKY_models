import React from "react";
import { useEffect, useState } from "react";
// This line imports React hooks for state and side effects.

import Navbar from "./components/Navbar/Navbar.jsx";
// This line imports the Navbar component.

import Home from "./pages/Home/Home.jsx";
// This line imports the Home page.

import Login from "./pages/Login/Login.jsx";
// This line imports the Login page.

import Register from "./pages/Register/Register.jsx";
// This line imports the Register page.

import Dashboard from "./pages/Dashboard/Dashboard.jsx";
// This line imports the Dashboard page.

import { getProducts, getSavedAuth, removeSavedAuth } from "./api/api.js";
// This line imports API helper functions.

function App() {
  // This line creates the main App component.
  const [page, setPage] = useState("home");
  // This line stores which page should be shown.
  const [auth, setAuth] = useState(getSavedAuth());
  // This line stores logged-in user information from localStorage.
  const [products, setProducts] = useState([]);
  // This line stores product data loaded from the backend.
  const [message, setMessage] = useState("");
  // This line stores success or error messages for the user.
  const [loading, setLoading] = useState(false);
  // This line stores whether product loading is happening.

  const loadProducts = async (searchText = "") => {
    // This line creates a function to load products from the backend.
    setLoading(true);
    // This line turns on the loading state.
    try {
      // This line starts a try block for safe API loading.
      const data = await getProducts(searchText);
      // This line calls the backend product API.
      setProducts(data);
      // This line saves loaded products in React state.
    } catch (error) {
      // This line catches product loading errors.
      setMessage(error.message);
      // This line shows the error message on the screen.
    } finally {
      // This line runs after success or failure.
      setLoading(false);
      // This line turns off the loading state.
    }
  };
  // This line ends the loadProducts function.

  useEffect(() => {
    // This line runs code when the app first opens.
    loadProducts();
    // This line loads products immediately for the home page.
  }, []);
  // This line makes the effect run only one time.

  const logoutUser = () => {
    // This line creates a function for logging out.
    removeSavedAuth();
    // This line removes saved login data from localStorage.
    setAuth(null);
    // This line clears login data from React state.
    setPage("home");
    // This line sends the user back to the home page.
    setMessage("Logged out successfully.");
    // This line shows a logout message.
  };
  // This line ends the logoutUser function.

  const showPage = () => {
    // This line creates a helper that decides which page component to display.
    if (page === "login") {
      // This line checks if the login page is selected.
      return <Login setPage={setPage} setAuth={setAuth} setMessage={setMessage} />;
      // This line shows the Login page.
    }
    // This line ends the login page check.
    if (page === "register") {
      // This line checks if the register page is selected.
      return <Register setPage={setPage} setAuth={setAuth} setMessage={setMessage} />;
      // This line shows the Register page.
    }
    // This line ends the register page check.
    if (page === "dashboard") {
      // This line checks if the dashboard page is selected.
      return <Dashboard auth={auth} products={products} loadProducts={loadProducts} setMessage={setMessage} />;
      // This line shows the Dashboard page.
    }
    // This line ends the dashboard page check.
    return <Home auth={auth} products={products} loading={loading} loadProducts={loadProducts} setPage={setPage} />;
    // This line shows the Home page by default.
  };
  // This line ends the showPage helper.

  return (
    // This line starts the JSX returned by App.
    <div className="app">
      {/* This line wraps the full app for styling. */}
      <Navbar auth={auth} page={page} setPage={setPage} logoutUser={logoutUser} />
      {/* This line shows the navbar on every page. */}
      {message && <div className="app-message">{message}</div>}
      {/* This line shows a message only when message text exists. */}
      {showPage()}
      {/* This line renders the selected page. */}
    </div>
    // This line ends the app wrapper.
  );
  // This line ends the JSX return.
}
// This line ends the App component.

export default App;
// This line exports App so main.jsx can render it.
