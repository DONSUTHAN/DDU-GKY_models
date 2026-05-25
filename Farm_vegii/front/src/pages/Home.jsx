import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if user is not logged in, otherwise go to fruits page.
  const handleShopNow = () => {
    if (isAuthenticated) {
      navigate("/fruits");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="home-page">
      <div className="hero-section">
        <div className="hero-overlay-content">
          <p className="hero-tag">Farm Fresh Delivery</p>
          <h1>Farm in for Fresh Fruits and Vegetables</h1>
          <p>
            Hand-picked produce from local farmers. Fresh every morning and delivered with care.
          </p>
          <button type="button" className="hero-btn" onClick={handleShopNow}>
            Shop Now
          </button>
        </div>
      </div>

      <div className="info-strip">
        <div>
          <h3>Direct from Farmers</h3>
          <p>No middle layers. Better freshness and better value.</p>
        </div>
        <div>
          <h3>Quality Checked</h3>
          <p>Every batch is inspected before listing in the cards section.</p>
        </div>
        <div>
          <h3>Farmer Chat Support</h3>
          <p>Request chat and inspect the source details anytime.</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
