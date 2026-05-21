import { useEffect, useState } from "react";
import { http } from "../api/http";

const initialProduct = {
  name: "",
  description: "",
  category: "",
  price: "",
  unit: "kg",
  quantityAvailable: "",
  imageUrl: "",
  location: ""
};

export function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(initialProduct);

  function loadDashboard() {
    Promise.all([http.get("/products/mine"), http.get("/orders/farmer-orders")]).then(
      ([productResponse, orderResponse]) => {
        setProducts(productResponse.data.products);
        setOrders(orderResponse.data.orders);
      }
    );
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function createProduct(event) {
    event.preventDefault();
    await http.post("/products", {
      ...form,
      price: Number(form.price),
      quantityAvailable: Number(form.quantityAvailable)
    });
    setForm(initialProduct);
    loadDashboard();
  }

  return (
    <main className="dashboard">
      <section>
        <p className="eyebrow">Farmer dashboard</p>
        <h1>Manage produce</h1>
        <form className="product-form" onSubmit={createProduct}>
          <input name="name" value={form.name} onChange={updateField} placeholder="Product name" />
          <input name="category" value={form.category} onChange={updateField} placeholder="Category" />
          <input name="price" value={form.price} onChange={updateField} placeholder="Price" />
          <input name="unit" value={form.unit} onChange={updateField} placeholder="Unit" />
          <input
            name="quantityAvailable"
            value={form.quantityAvailable}
            onChange={updateField}
            placeholder="Quantity"
          />
          <input name="location" value={form.location} onChange={updateField} placeholder="Location" />
          <input name="imageUrl" value={form.imageUrl} onChange={updateField} placeholder="Image URL" />
          <textarea
            name="description"
            value={form.description}
            onChange={updateField}
            placeholder="Description"
          />
          <button>Add produce</button>
        </form>
      </section>

      <section className="dashboard-list">
        <h2>Your listings</h2>
        {products.map((product) => (
          <article key={product._id} className="list-item">
            <strong>{product.name}</strong>
            <span>
              {product.quantityAvailable} {product.unit} at KES {product.price}
            </span>
          </article>
        ))}

        <h2>Incoming orders</h2>
        {orders.map((order) => (
          <article key={order._id} className="list-item">
            <strong>{order.consumer?.name || "Customer"}</strong>
            <span>KES {order.totalAmount} - {order.status}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
