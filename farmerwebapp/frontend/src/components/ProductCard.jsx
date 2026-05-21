import { MapPin, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";

export function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="product-card">
      <img src={product.imageUrl || "/placeholder-produce.jpg"} alt={product.name} />
      <div className="product-body">
        <div>
          <p className="eyebrow">{product.category}</p>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
        <div className="product-meta">
          <span>
            KES {product.price} / {product.unit}
          </span>
          <span className="location">
            <MapPin size={15} />
            {product.location}
          </span>
        </div>
        <button onClick={() => addItem(product)}>
          <Plus size={18} />
          Add
        </button>
      </div>
    </article>
  );
}
