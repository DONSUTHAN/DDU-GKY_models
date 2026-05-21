import React from "react";
import { Menu, Sprout } from "lucide-react";
// This line imports icons used in the navbar.

import { useState } from "react";
// This line imports useState for opening and closing the dropdown.

import "./Navbar.css";
// This line imports navbar styles from an external CSS file.

function Navbar({ auth, page, setPage, logoutUser }) {
  // This line creates the Navbar component and receives props from App.
  const [openMenu, setOpenMenu] = useState(false);
  // This line stores whether the three-line dropdown is open.

  const goToHomeSection = (sectionId) => {
    // This line creates a function for Home, About, and Contact links.
    setPage("home");
    // This line switches the app back to the home page.
    setTimeout(() => {
      // This line waits briefly so the home page can render first.
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      // This line scrolls to the selected section smoothly.
    }, 50);
    // This line ends the small delay.
  };
  // This line ends the goToHomeSection function.

  return (
    // This line starts the navbar JSX.
    <nav className="navbar">
      {/* This line creates the main navbar container. */}
      <button className="navbar-logo" onClick={() => goToHomeSection("home")}>
        {/* This line creates the logo and app name button. */}
        <span className="logo-mark">
          {/* This line creates the logo icon circle. */}
          <Sprout size={24} />
          {/* This line shows a plant icon for the farm brand. */}
        </span>
        {/* This line ends the logo icon circle. */}
        <span className="logo-text">The Farm Vegi</span>
        {/* This line shows the app name beside the logo. */}
      </button>
      {/* This line ends the logo button. */}

      <div className="navbar-links">
        {/* This line creates the navigation links container. */}
        <button onClick={() => goToHomeSection("home")}>Home</button>
        {/* This line sends the user to the hero/home section. */}
        <button onClick={() => goToHomeSection("about")}>About</button>
        {/* This line sends the user to the about section on the same page. */}
        <button onClick={() => goToHomeSection("contact")}>Contact</button>
        {/* This line sends the user to the contact section on the same page. */}
        {auth && <button onClick={() => setPage("dashboard")}>Dashboard</button>}
        {/* This line shows Dashboard only after login. */}
      </div>
      {/* This line ends the navigation links container. */}

      <div className="navbar-actions">
        {/* This line creates the right side navbar area. */}
        {!auth && (
          // This line checks if the user is not logged in.
          <button className="login-button" onClick={() => setPage("login")}>
            {/* This line opens the login page when clicked. */}
            {page === "login" ? "Sign in" : "Login"}
            {/* This line changes Login text to Sign in on the login page. */}
          </button>
          // This line ends the login button.
        )}
        {/* This line ends the logged-out navbar action. */}

        {auth && (
          // This line checks if the user is logged in.
          <div className="user-menu">
            {/* This line creates the user dropdown wrapper. */}
            <span className="user-name">{auth.user.name}</span>
            {/* This line shows the logged-in user's name. */}
            <button className="menu-button" onClick={() => setOpenMenu(!openMenu)} aria-label="Open user menu">
              {/* This line opens or closes the three-line dropdown. */}
              <Menu size={24} />
              {/* This line shows the three-line menu icon. */}
            </button>
            {/* This line ends the menu button. */}
            {openMenu && (
              // This line checks if the dropdown is open.
              <div className="dropdown">
                {/* This line creates the dropdown box below the name/menu. */}
                <button onClick={() => setPage("dashboard")}>My dashboard</button>
                {/* This line opens the dashboard page. */}
                <button onClick={logoutUser}>Logout</button>
                {/* This line logs the user out of the web app. */}
              </div>
              // This line ends the dropdown box.
            )}
            {/* This line ends the open dropdown check. */}
          </div>
          // This line ends the user menu.
        )}
        {/* This line ends the logged-in navbar action. */}
      </div>
      {/* This line ends the right side navbar area. */}
    </nav>
    // This line ends the navbar JSX.
  );
  // This line ends the return statement.
}
// This line ends the Navbar component.

export default Navbar;
// This line exports Navbar so App can use it.
