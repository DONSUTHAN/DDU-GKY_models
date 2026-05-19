import { Link, NavLink } from "react-router-dom";
import { Leaf, LogOut, ShoppingCart, Sprout } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="app-header">
      <Link className="brand" to="/">
        <Sprout size={24} />
        <span>FarmDirect</span>
      </Link>
      <nav>
        <NavLink to="/">Market</NavLink>
        {user?.role === "farmer" && <NavLink to="/farmer">Farmer</NavLink>}
        {user?.role === "consumer" && <NavLink to="/orders">Orders</NavLink>}
        <NavLink className="cart-link" to="/cart" aria-label="Open cart">
          <ShoppingCart size={19} />
          <span>{cartCount}</span>
        </NavLink>
        {user ? (
          <button className="icon-button" onClick={logout} title="Log out">
            <LogOut size={18} />
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
}
