import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(product) {
    setItems((current) => {
      const existing = current.find((item) => item._id === product._id);

      if (existing) {
        return current.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(productId, quantity) {
    setItems((current) =>
      current
        .map((item) => (item._id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const value = useMemo(
    () => ({ items, total, addItem, updateQuantity, clearCart }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
