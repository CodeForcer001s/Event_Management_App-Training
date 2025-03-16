import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [username, setUsername] = useState("Guest");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get("https://event-management-app-training.vercel.app/AuthRouter/me", {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true,
        });
        setUsername(res.data.username);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post("https://event-management-app-training.vercel.app/AuthRouter/logout", {}, { 
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true 
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
      // Force logout on error
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-icon">🎉</span> EventX
      </div>

      <div className="navbar-links">
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/createEvents" className="nav-link">Create Events</Link>
        <Link to="/dashboard" className="nav-link">Events</Link>
      </div>

      <div className="navbar-user">
        <span className="username">{username}</span>
        <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
