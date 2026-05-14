import Hero from "../components/Hero";

function Home() {
  return (
    <div>
      <Hero />

      <section className="home-section">
        <h2>Why Choose Us?</h2>

        <div className="features">
          <div className="feature-card">
            <h3>Fresh Products</h3>
            <p>Directly from local farmers.</p>
          </div>

          <div className="feature-card">
            <h3>Fast Delivery</h3>
            <p>Quick delivery to your doorstep.</p>
          </div>

          <div className="feature-card">
            <h3>Healthy Foods</h3>
            <p>100% organic and natural foods.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;