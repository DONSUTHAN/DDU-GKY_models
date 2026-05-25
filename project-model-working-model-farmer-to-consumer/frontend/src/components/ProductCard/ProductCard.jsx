import React from "react";
import { ShoppingBasket } from "lucide-react";
// This line imports the basket icon for order buttons.

import "./ProductCard.css";
// This line imports product card styles from an external CSS file.

const fallbackImage = "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=900&q=80";
// This line stores an image used when a product has no image URL.

function ProductCard({ product, auth, setPage }) {
  // This line creates the ProductCard component and receives one product as a prop.
  return (
    // This line starts the product card JSX.
    <article className="product-card">
      {/* This line creates the product card container. */}
      <img src={product.image || fallbackImage} alt={product.name} />
      {/* This line shows the product image or fallback image. */}
      <div className="product-card-body">
        {/* This line creates the product card content area. */}
        <span className="product-category">{product.category}</span>
        {/* This line shows the product category. */}
        <h3>{product.name}</h3>
        {/* This line shows the product name. */}
        <p>{product.description}</p>
        {/* This line shows the product description. */}
        <div className="product-meta">
          {/* This line creates product detail rows. */}
          <span>Rs {product.price}</span>
          {/* This line shows the product price. */}
          <span>{product.quantity} in stock</span>
          {/* This line shows available stock. */}
          <span>{product.location}</span>
          {/* This line shows the farmer location. */}
        </div>
        {/* This line ends the product detail rows. */}
        {auth?.user?.role === "consumer" && (
          // This line checks if the logged-in user is a consumer.
          <button className="primary-button card-order-button" onClick={() => setPage("dashboard")}>
            {/* This line sends the consumer to the dashboard order form. */}
            <ShoppingBasket size={18} />
            {/* This line shows a basket icon. */}
            Order from dashboard
            {/* This line labels the order button. */}
          </button>
          // This line ends the order button.
        )}
        {/* This line ends the consumer role check. */}
      </div>
      {/* This line ends the card content area. */}
    </article>
    // This line ends the product card JSX.
  );
  // This line ends the return statement.
}
// This line ends the ProductCard component.

export default ProductCard;
// This line exports ProductCard so Home can use it.
