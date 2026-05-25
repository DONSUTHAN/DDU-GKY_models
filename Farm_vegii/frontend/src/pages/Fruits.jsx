import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FruitCard from "../components/FruitCard";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./Fruits.css";

const Fruits = () => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Route guard for this page: user must be logged in.
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: "/fruits" } });
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Load fruits from backend using useEffect.
  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const { data } = await api.get("/api/fruits");
        setFruits(data.fruits || []);
      } catch (fetchError) {
        setError("Unable to load fruits right now");
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  if (loading || authLoading) {
    return <p className="status-text">Loading fruits...</p>;
  }

  if (error) {
    return <p className="status-text error">{error}</p>;
  }

  return (
    <section className="fruits-page">
      <div className="fruits-header">
        <h2>Fresh Fruits & Vegetables</h2>
        <p>Choose from farmer-direct stock. Hover each card to inspect quickly.</p>
      </div>

      <div className="fruits-flex-grid">
        {fruits.map((item) => (
          <FruitCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Fruits;
