import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../api/http";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export function CartPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, total, updateQuantity, clearCart } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState(user?.location || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [error, setError] = useState("");

  async function checkout(event) {
    event.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await http.post("/orders", {
        deliveryAddress,
        phone,
        items: items.map((item) => ({ product: item._id, quantity: item.quantity }))
      });
      clearCart();
      navigate("/orders");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Order failed");
    }
  }

  return (
    <main className="split-page">
      <section>
        <p className="eyebrow">Cart</p>
        <h1>Your order</h1>
        {items.length === 0 ? (
          <p className="empty-state">Your cart is empty.</p>
        ) : (
          <div className="cart-list">
            {items.map((item) => (
              <div className="cart-row" key={item._id}>
                <div>
                  <strong>{item.name}</strong>
                  <span>KES {item.price} / {item.unit}</span>
                </div>
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(event) => updateQuantity(item._id, Number(event.target.value))}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <form className="checkout-panel" onSubmit={checkout}>
        <h2>Total: KES {total}</h2>
        {error && <p className="form-error">{error}</p>}
        <input
          value={deliveryAddress}
          onChange={(event) => setDeliveryAddress(event.target.value)}
          placeholder="Delivery address"
        />
        <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone" />
        <button disabled={items.length === 0}>Place order</button>
      </form>
    </main>
  );
}
