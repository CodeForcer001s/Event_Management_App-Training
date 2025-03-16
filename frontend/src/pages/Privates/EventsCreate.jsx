import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/navbar/Navbar';
import './EventsCreate.css';

const EventsCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    eventName: '',
    eventType: '',
    eventDate: '',
    location: '',
    capacity: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      await axios.post('http://localhost:8080/events/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating event:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-event-container">
        <div className="create-event-card">
          <h2>Create New Event</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Event Name</label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Type of Event</label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
              >
                <option value="">Select Event Type</option>
                <option value="conference">Conference</option>
                <option value="seminar">Seminar</option>
                <option value="workshop">Workshop</option>
                <option value="social">Social Gathering</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Event Date</label>
              <input
                type="datetime-local"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Event Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <button type="submit" className="submit-btn">Create Event</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EventsCreate;