import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import { signupUser } from "../../api.js";
import './Signup.css';

const SignUp = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signupUser(form);
    setMessage(data.message);

    if (data.message=="User registered successfully") {
      navigate('/login'); // ✅ Redirect instantly after signup
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={handleChange} required />
          </div>

          <button type="submit" className="btn">Sign Up</button>
        </form>

        <div className="login-link">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default SignUp;
