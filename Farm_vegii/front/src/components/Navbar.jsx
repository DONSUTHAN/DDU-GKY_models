import { Link, NavLink, useNavigate } from "react-router-dom";
import { Drawer, Switch } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Tractor } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout and return user to login page.
  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setDrawerOpen(false);
  };

  return (
    <header className="navbar-wrap">
      <nav className="navbar">
        <Link className="brand" to="/">
          <Tractor size={26} />
          <span>Farm Vegii</span>
        </Link>

        <div className="nav-center">
          <NavLink
            to="/" end  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`.trim()}> Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`.trim()}> About</NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`.trim()}
          >
            Contact
          </NavLink>
        </div>

        <button
          className="menu-trigger"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open drawer"
          type="button"
        >
          <MenuOutlined />
        </button>
      </nav>

      <Drawer
        title="Navigation"
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        maskClosable={true}
      >
        <div className="drawer-links">
          <NavLink to="/" onClick={() => setDrawerOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setDrawerOpen(false)}>
            About
          </NavLink>
          <NavLink to="/contact" onClick={() => setDrawerOpen(false)}>
            Contact
          </NavLink>
          <NavLink to="/fruits" onClick={() => setDrawerOpen(false)}>
            Fresh Fruits
          </NavLink>
          <NavLink to="/chat" onClick={() => setDrawerOpen(false)}>
            Farmer Chat
          </NavLink>
        </div>

        <div className="drawer-theme">
          <span>Dark Mode</span>
          <Switch checked={darkMode} onChange={(checked) => setDarkMode(checked)} />
        </div>

        <div className="drawer-auth">
          {isAuthenticated ? (
            <>
              <p className="welcome-msg">Hello, {user?.name || "Farmer Friend"}</p>
              <button className="outline-btn" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button
              className="solid-btn"
              type="button"
              onClick={() => {
                navigate("/login");
                setDrawerOpen(false);
              }}
            >
              Login
            </button>
          )}
        </div>
      </Drawer>
    </header>
  );
};

export default Navbar;
