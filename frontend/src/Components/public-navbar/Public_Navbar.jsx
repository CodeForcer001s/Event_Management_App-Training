import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./publicNavbar.css";
import { Sun, Moon } from "lucide-react"; // Cool icons for dark mode toggle

const PublicNavbar = () => {
  // Get theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme); // Apply theme to body
    localStorage.setItem("theme", theme); // Save preference
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="public-navbar">
      <div className="logo">🚀 EventX</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="nav-actions">

      <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <Link to="/login" className="login-button">Login</Link>
        <Link to="/Signup" className="login-button">SignUp</Link>
        

      </div>
    </nav>
  );
};

export default PublicNavbar;
