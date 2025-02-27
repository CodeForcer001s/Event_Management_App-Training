import React, { useState } from "react";
import "./Signup.css"; // Reusing the same CSS file

const Login = () => {
  const [theme, setTheme] = useState("light");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="signup-container">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      <div className="signup-card">
        <h2>Login</h2>
        <form className="signup-form">
          {["email", "password"].map((field) => (
            <input
              key={field}
              type={field === "password" ? "password" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          ))}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
