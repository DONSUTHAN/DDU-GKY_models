import React from "react";
import { Search, ShoppingBasket } from "lucide-react";
// This line imports icons for the hero section.
import { useState } from "react";
import "./Hero.css";

function Hero({ loadProducts, setPage }) {
  // This line creates the Hero component and receives needed functions as props.


  const [searchText, setSearchText] = useState("");
  // This line stores what the user types in the search input.



  const submitSearch = (event) => {
    // This line creates the search form submit function.

    event.preventDefault();
    // This line stops the browser from refreshing the page.


    loadProducts(searchText);
    // This line asks the backend for products matching the search text.

  };

  
  return (
    // This line starts the hero JSX.
    <section id="home" className="hero-section">
      {/* This line creates the home hero section. */}

      <div className="hero-content">
        {/* This line creates the left side hero text area. */}

        <p className="section-label">Fresh farmer marketplace</p>
        {/* This line shows a small hero label. */}

        <h1>The Farm Vegi connects farmers directly with families.</h1>
        {/* This line shows the main hero heading. */}

        <p className="hero-text">
          Buy vegetables, fruits, and farm produce without middlemen. Farmers can list fresh stock, and consumers can order directly from the source.
        </p>

        <form className="hero-search" onSubmit={submitSearch}>
          {/* This line creates the product search form. */}
          <Search size={20} />

          {/* This line shows a search icon. */}
          <input value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Search tomato, spinach, banana..." />
          {/* This line stores typed search text in state. */}
          <button className="primary-button">Search</button>
          {/* This line submits the search form. */}
        </form>
        {/* This line ends the search form. */}
        <button className="primary-button secondary-button hero-dashboard-button" onClick={() => setPage("dashboard")}>
          {/* This line opens the dashboard when clicked. */}
          <ShoppingBasket size={18} />
          {/* This line shows a basket icon. */}
          Start selling or ordering
          {/* This line labels the dashboard button. */}
        </button>
      </div>

      <div className="hero-photo">
        {/* This line creates the right side hero image area. */}
        <div className="hero-photo-card">
          {/* This line creates text over the hero photo. */}
          <span>Today in the market</span>
          {/* This line shows a small photo label. */}
          <strong>Fresh vegetables, direct from growers</strong>
          {/* This line shows the photo headline. */}
        </div>
        {/* This line ends the text over the hero photo. */}
      </div>
      {/* This line ends the hero image area. */}
    </section>
  );
}


export default Hero;
// This line exports Hero so the Home page can use it.
