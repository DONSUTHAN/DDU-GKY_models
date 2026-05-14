import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Eszy Shop</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Signup</Link>

        <Link to="/cart">
          <FaShoppingCart />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;