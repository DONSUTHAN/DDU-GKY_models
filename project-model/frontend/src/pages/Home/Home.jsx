import React from "react";
import Footer from "../../components/Footer/Footer.jsx";
// This line imports the Footer component.

import Hero from "../../components/Hero/Hero.jsx";
// This line imports the Hero component.

import ProductCard from "../../components/ProductCard/ProductCard.jsx";
// This line imports the ProductCard component.

import "./Home.css";
// This line imports home page styles from an external CSS file.

const contactInfo = {
  // This line creates one place to update contact section details.
  phone: "+254 700 000 000",
  // This line stores the phone number shown in the contact section.
  email: "support@thefarmvegi.com",
  // This line stores the email shown in the contact section.
  location: "Nairobi Fresh Market, Kenya"
  // This line stores the location shown in the contact section.
};
// This line ends the contactInfo object.

function Home({ auth, products, loading, loadProducts, setPage }) {
  // This line creates the Home page component.
  return (
    // This line starts the Home page JSX.
    <>
      {/* This line lets the page return multiple sections. */}
      <Hero loadProducts={loadProducts} setPage={setPage} />
      {/* This line shows the hero section at the top. */}

      <section className="page-shell products-section">
        {/* This line creates the products marketplace section. */}
        <p className="section-label">Marketplace</p>
        {/* This line shows the marketplace label. */}
        <h2 className="section-title">Fresh products available now</h2>
        {/* This line shows the products section heading. */}
        {loading && <p className="muted-text">Loading products...</p>}
        {/* This line shows loading text while products are loading. */}
        {!loading && products.length === 0 && <p className="empty-box">No products found. Farmers can add products from the dashboard.</p>}
        {/* This line shows an empty state when there are no products. */}
        <div className="products-grid">
          {/* This line creates the product cards grid. */}
          {products.map((product) => (
            // This line loops through all products from the backend.
            <ProductCard key={product._id} product={product} auth={auth} setPage={setPage} />
            // This line renders one ProductCard for each product.
          ))}
          {/* This line ends the products loop. */}
        </div>
        {/* This line ends the product cards grid. */}
      </section>
      {/* This line ends the products marketplace section. */}

      <section id="about" className="page-shell about-section">
        {/* This line creates the about section on the same home page. */}
        <div>
          {/* This line creates the about text column. */}
          <p className="section-label">About</p>
          {/* This line shows the about label. */}
          <h2 className="section-title">Why The Farm Vegi exists</h2>
          {/* This line shows the about heading. */}
        </div>
        {/* This line ends the about heading column. */}
        <p className="muted-text">
          {/* This line starts the about paragraph. */}
          The Farm Vegi helps farmers sell directly to consumers. Farmers can upload produce, prices, stock, and location. Consumers can search products, order fresh food, and review what they buy.
          {/* This line explains the project idea. */}
        </p>
        {/* This line ends the about paragraph. */}
      </section>
      {/* This line ends the about section. */}

      <section id="contact" className="page-shell contact-section">
        {/* This line creates the contact section on the same home page. */}
        <p className="section-label">Contact</p>
        {/* This line shows the contact label. */}
        <h2 className="section-title">Update this contact area for your own farm business</h2>
        {/* This line tells where contact details can be changed. */}
        <div className="contact-grid">
          {/* This line creates contact detail boxes. */}
          <div>
            {/* This line starts the phone contact box. */}
            <span>Phone</span>
            {/* This line labels the phone value. */}
            <strong>{contactInfo.phone}</strong>
            {/* This line shows the phone number from contactInfo. */}
          </div>
          {/* This line ends the phone contact box. */}
          <div>
            {/* This line starts the email contact box. */}
            <span>Email</span>
            {/* This line labels the email value. */}
            <strong>{contactInfo.email}</strong>
            {/* This line shows the email from contactInfo. */}
          </div>
          {/* This line ends the email contact box. */}
          <div>
            {/* This line starts the location contact box. */}
            <span>Location</span>
            {/* This line labels the location value. */}
            <strong>{contactInfo.location}</strong>
            {/* This line shows the location from contactInfo. */}
          </div>
          {/* This line ends the location contact box. */}
        </div>
        {/* This line ends contact detail boxes. */}
      </section>
      {/* This line ends the contact section. */}

      <Footer />
      {/* This line shows the footer at the bottom of the home page. */}
    </>
    // This line ends the Home page JSX.
  );
  // This line ends the return statement.
}
// This line ends the Home component.

export default Home;
// This line exports Home so App can use it.
