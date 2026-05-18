import { useEffect, useState } from "react";
import { http } from "../api/http";

export function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    http.get("/orders/my-orders").then(({ data }) => setOrders(data.orders));
  }, []);

  return (
    <main>
      <p className="eyebrow">Orders</p>
      <h1>Order history</h1>
      <section className="order-list">
        {orders.map((order) => (
          <article key={order._id} className="order-card">
            <div>
              <strong>KES {order.totalAmount}</strong>
              <span>{order.status}</span>
            </div>
            <p>{order.deliveryAddress}</p>
            <ul>
              {order.items.map((item) => (
                <li key={`${order._id}-${item.product?._id || item.name}`}>
                  {item.quantity} {item.unit} {item.name}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
