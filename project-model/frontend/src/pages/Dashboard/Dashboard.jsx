import React from "react";
import { ClipboardList, PackagePlus, Send, Star } from "lucide-react";
// This line imports icons used in the dashboard.

import { useEffect, useState } from "react";
// This line imports React hooks for dashboard state and loading orders.

import { createOrder, createProduct, createReview, getMyOrders } from "../../api/api.js";
// This line imports dashboard API helper functions.

import "./Dashboard.css";
// This line imports dashboard styles from an external CSS file.

const emptyProduct = { name: "", price: "", quantity: "", category: "Vegetables", location: "", image: "", description: "" };
// This line creates the starting values for the farmer product form.

function Dashboard({ auth, products, loadProducts, setMessage }) {
  // This line creates the Dashboard page component.
  const [productForm, setProductForm] = useState(emptyProduct);
  // This line stores farmer product form values.
  const [orderForm, setOrderForm] = useState({ productId: "", quantity: 1, address: "", phone: "", paymentMethod: "cash" });
  // This line stores consumer order form values.
  const [reviewForm, setReviewForm] = useState({ productId: "", rating: 5, comment: "" });
  // This line stores consumer review form values.
  const [orders, setOrders] = useState([]);
  // This line stores the logged-in user's orders.

  const token = auth?.token || "";
  // This line reads the token from login data.
  const role = auth?.user?.role || "";
  // This line reads the logged-in user role.

  const loadOrders = async () => {
    // This line creates a function to load dashboard orders.
    if (!token) return;
    // This line stops order loading when the user is not logged in.
    try {
      // This line starts a try block for safe order loading.
      const data = await getMyOrders(token);
      // This line asks the backend for the logged-in user's orders.
      setOrders(data);
      // This line saves loaded orders in state.
    } catch (error) {
      // This line catches order loading errors.
      setMessage(error.message);
      // This line shows the error message in App.
    }
  };
  // This line ends the loadOrders function.

  useEffect(() => {
    // This line runs when the dashboard opens or token changes.
    loadOrders();
    // This line loads orders for the dashboard.
  }, [token]);
  // This line makes the effect depend on the token value.

  const updateProductForm = (event) => {
    // This line creates a function for changing product form values.
    setProductForm({ ...productForm, [event.target.name]: event.target.value });
    // This line updates only the product input that changed.
  };
  // This line ends the updateProductForm function.

  const submitProduct = async (event) => {
    // This line creates the product submit function.
    event.preventDefault();
    // This line stops the browser from refreshing the page.
    try {
      // This line starts a try block for safe product creation.
      await createProduct({ ...productForm, price: Number(productForm.price), quantity: Number(productForm.quantity) }, token);
      // This line sends the new product to the backend with number values.
      setProductForm(emptyProduct);
      // This line clears the product form.
      setMessage("Product added successfully.");
      // This line shows a success message.
      loadProducts();
      // This line reloads products on the home page.
    } catch (error) {
      // This line catches product creation errors.
      setMessage(error.message);
      // This line shows the error message in App.
    }
  };
  // This line ends the submitProduct function.

  const submitOrder = async (event) => {
    // This line creates the order submit function.
    event.preventDefault();
    // This line stops the browser from refreshing the page.
    try {
      // This line starts a try block for safe order creation.
      await createOrder({ ...orderForm, quantity: Number(orderForm.quantity) }, token);
      // This line sends the order to the backend with number quantity.
      setOrderForm({ productId: "", quantity: 1, address: "", phone: "", paymentMethod: "cash" });
      // This line clears the order form.
      setMessage("Order placed successfully.");
      // This line shows a success message.
      loadProducts();
      // This line reloads products because stock changed.
      loadOrders();
      // This line reloads orders in the dashboard.
    } catch (error) {
      // This line catches order creation errors.
      setMessage(error.message);
      // This line shows the error message in App.
    }
  };
  // This line ends the submitOrder function.

  const submitReview = async (event) => {
    // This line creates the review submit function.
    event.preventDefault();
    // This line stops the browser from refreshing the page.
    try {
      // This line starts a try block for safe review creation.
      await createReview({ ...reviewForm, rating: Number(reviewForm.rating) }, token);
      // This line sends the review to the backend with number rating.
      setReviewForm({ productId: "", rating: 5, comment: "" });
      // This line clears the review form.
      setMessage("Review added successfully.");
      // This line shows a success message.
    } catch (error) {
      // This line catches review creation errors.
      setMessage(error.message);
      // This line shows the error message in App.
    }
  };
  // This line ends the submitReview function.

  if (!auth) {
    // This line checks if the user is not logged in.
    return <section className="page-shell dashboard-page"><p className="empty-box">Please login to use the dashboard.</p></section>;
    // This line asks logged-out users to login.
  }
  // This line ends the logged-out check.

  return (
    // This line starts the dashboard JSX.
    <section className="page-shell dashboard-page">
      {/* This line creates the dashboard page section. */}
      <p className="section-label">Dashboard</p>
      {/* This line shows the dashboard label. */}
      <h1 className="section-title">{role === "farmer" ? "Farmer dashboard" : "Consumer dashboard"}</h1>
      {/* This line changes the heading based on user role. */}

      {role === "farmer" && (
        // This line checks if the logged-in user is a farmer.
        <form className="dashboard-card dashboard-form" onSubmit={submitProduct}>
          {/* This line creates the farmer product form. */}
          <h2><PackagePlus size={22} /> Add farm product</h2>
          {/* This line shows the product form heading. */}
          <div className="form-grid">
            {/* This line creates a two-column form grid. */}
            <input name="name" placeholder="Product name" value={productForm.name} onChange={updateProductForm} required />
            {/* This line creates the product name input. */}
            <input name="price" placeholder="Price" type="number" min="0" value={productForm.price} onChange={updateProductForm} required />
            {/* This line creates the product price input. */}
            <input name="quantity" placeholder="Quantity" type="number" min="0" value={productForm.quantity} onChange={updateProductForm} required />
            {/* This line creates the product quantity input. */}
            <input name="category" placeholder="Category" value={productForm.category} onChange={updateProductForm} required />
            {/* This line creates the product category input. */}
            <input name="location" placeholder="Location" value={productForm.location} onChange={updateProductForm} required />
            {/* This line creates the product location input. */}
            <input name="image" placeholder="Image URL" value={productForm.image} onChange={updateProductForm} />
            {/* This line creates the optional product image input. */}
          </div>
          {/* This line ends the two-column form grid. */}
          <textarea name="description" placeholder="Product description" value={productForm.description} onChange={updateProductForm} required />
          {/* This line creates the product description input. */}
          <button className="primary-button">Add product</button>
          {/* This line submits the product form. */}
        </form>
        // This line ends the farmer product form.
      )}
      {/* This line ends the farmer role check. */}

      {role === "consumer" && (
        // This line checks if the logged-in user is a consumer.
        <div className="dashboard-grid">
          {/* This line creates two consumer dashboard cards. */}
          <form className="dashboard-card dashboard-form" onSubmit={submitOrder}>
            {/* This line creates the consumer order form. */}
            <h2><Send size={22} /> Place order</h2>
            {/* This line shows the order form heading. */}
            <select value={orderForm.productId} onChange={(event) => setOrderForm({ ...orderForm, productId: event.target.value })} required>
              {/* This line creates the product select input. */}
              <option value="">Select product</option>
              {/* This line creates the empty product option. */}
              {products.map((product) => <option key={product._id} value={product._id}>{product.name}</option>)}
              {/* This line creates one option for each product. */}
            </select>
            {/* This line ends the product select input. */}
            <input type="number" min="1" value={orderForm.quantity} onChange={(event) => setOrderForm({ ...orderForm, quantity: event.target.value })} required />
            {/* This line creates the order quantity input. */}
            <input placeholder="Delivery phone" value={orderForm.phone} onChange={(event) => setOrderForm({ ...orderForm, phone: event.target.value })} required />
            {/* This line creates the delivery phone input. */}
            <textarea placeholder="Delivery address" value={orderForm.address} onChange={(event) => setOrderForm({ ...orderForm, address: event.target.value })} required />
            {/* This line creates the delivery address input. */}
            <select value={orderForm.paymentMethod} onChange={(event) => setOrderForm({ ...orderForm, paymentMethod: event.target.value })}>
              {/* This line creates the payment method select. */}
              <option value="cash">Cash</option>
              {/* This line creates the cash option. */}
              <option value="mpesa">Mpesa</option>
              {/* This line creates the Mpesa option. */}
            </select>
            {/* This line ends the payment method select. */}
            <button className="primary-button">Place order</button>
            {/* This line submits the order form. */}
          </form>
          {/* This line ends the order form. */}

          <form className="dashboard-card dashboard-form" onSubmit={submitReview}>
            {/* This line creates the consumer review form. */}
            <h2><Star size={22} /> Add review</h2>
            {/* This line shows the review form heading. */}
            <select value={reviewForm.productId} onChange={(event) => setReviewForm({ ...reviewForm, productId: event.target.value })} required>
              {/* This line creates the review product select input. */}
              <option value="">Select product</option>
              {/* This line creates the empty review product option. */}
              {products.map((product) => <option key={product._id} value={product._id}>{product.name}</option>)}
              {/* This line creates one review option for each product. */}
            </select>
            {/* This line ends the review product select input. */}
            <input type="number" min="1" max="5" value={reviewForm.rating} onChange={(event) => setReviewForm({ ...reviewForm, rating: event.target.value })} required />
            {/* This line creates the review rating input. */}
            <textarea placeholder="Write your review" value={reviewForm.comment} onChange={(event) => setReviewForm({ ...reviewForm, comment: event.target.value })} required />
            {/* This line creates the review comment input. */}
            <button className="primary-button">Submit review</button>
            {/* This line submits the review form. */}
          </form>
          {/* This line ends the review form. */}
        </div>
        // This line ends the consumer dashboard cards.
      )}
      {/* This line ends the consumer role check. */}

      <div className="dashboard-card orders-card">
        {/* This line creates the orders card. */}
        <h2><ClipboardList size={22} /> My orders</h2>
        {/* This line shows the orders heading. */}
        {orders.length === 0 && <p className="muted-text">No orders yet.</p>}
        {/* This line shows empty order text when there are no orders. */}
        {orders.map((order) => (
          // This line loops through the loaded orders.
          <div className="order-row" key={order._id}>
            {/* This line creates one order row. */}
            <span>{order.product?.name || "Product"}</span>
            {/* This line shows the ordered product name. */}
            <span>KSh {order.totalPrice}</span>
            {/* This line shows the order total price. */}
            <span>{order.status}</span>
            {/* This line shows the order status. */}
          </div>
          // This line ends one order row.
        ))}
        {/* This line ends the orders loop. */}
      </div>
      {/* This line ends the orders card. */}
    </section>
    // This line ends the dashboard JSX.
  );
  // This line ends the return statement.
}
// This line ends the Dashboard component.

export default Dashboard;
// This line exports Dashboard so App can use it.
