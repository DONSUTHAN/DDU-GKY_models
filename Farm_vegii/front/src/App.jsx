import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Fruits from "./pages/Fruits";
import Chat from "./pages/Chat";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./styles/App.css";

function App() {
  // Persist dark mode between page refreshes.
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("farm_theme") === "dark";
  });

  // Apply theme class to body whenever dark mode changes.
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("farm_theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("farm_theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="app-shell">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fruits" element={<Fruits />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
