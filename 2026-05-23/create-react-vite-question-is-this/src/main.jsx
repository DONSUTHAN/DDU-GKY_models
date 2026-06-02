import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Mail, Menu, Sparkles, UserPlus } from "lucide-react";
import "./styles.css";

const navItems = ["Home", "About Us", "Contact"];

function Button({ children, variant = "primary", icon: Icon }) {
  return (
    <button className={`button button-${variant}`}>
      {Icon && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
    </button>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="PixelNest Home">
        <span className="brand-mark">P</span>
        <span>PixelNest</span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>
            {item}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <Button variant="ghost">Login</Button>
        <Button icon={UserPlus}>Sign Up</Button>
      </div>

      <button
        className="menu-button"
        aria-expanded={isMenuOpen}
        aria-label="Open navigation menu"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <Menu size={22} />
      </button>

      {isMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="mobile-actions">
            <Button variant="ghost">Login</Button>
            <Button icon={UserPlus}>Sign Up</Button>
          </div>
        </div>
      )}
    </header>
  );
}

function Home() {
  return (
    <section className="section hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">Frontend only React section</p>
        <h1>Build a clean website header with useful page sections.</h1>
        <p>
          A responsive Vite + React layout with separate components for the
          navbar, buttons, home, about us, and contact areas.
        </p>
        <div className="hero-actions">
          <Button icon={Sparkles}>Get Started</Button>
          <Button variant="outline">View About</Button>
        </div>
      </div>

      <div className="hero-panel" aria-label="Design preview">
        <div className="panel-topbar">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="panel-grid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
}

function AboutUs() {
  return (
    <section className="section split-section" id="about-us">
      <div>
        <p className="eyebrow">About Us</p>
        <h2>Simple components, organized for learning.</h2>
      </div>
      <p>
        This design keeps the project easy to understand while still feeling
        like a finished page. Each major part is a React component, so you can
        change the navbar, buttons, and sections independently.
      </p>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Ready to customize this page?</h2>
        <p>Add your own text, brand name, links, and colors to make it yours.</p>
      </div>
      <Button icon={Mail}>Contact Us</Button>
    </section>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <AboutUs />
        <Contact />
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
