import { useNavigate } from "react-router-dom";
import "./FruitCard.css";

const FruitCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <article className="fruit-card">
      <img src={item.image} alt={item.name} className="fruit-image" />

      <div className="fruit-info">
        <h3>{item.name}</h3>
        <p>
          <strong>Price:</strong> RS {item.price}
        </p>
        <p>
          <strong>Available:</strong> {item.quantity} kg
        </p>
        <p>
          <strong>Origin:</strong> {item.origin}
        </p>
        <p>
          <strong>Farmer:</strong> {item.farmerName}
        </p>

        <button
          type="button"
          className="chat-btn"
          onClick={() => navigate(`/chat?fruitId=${item._id}&fruitName=${encodeURIComponent(item.name)}`)}
        >
          Inspect Farmer / Request Chat
        </button>
      </div>
    </article>
  );
};

export default FruitCard;
