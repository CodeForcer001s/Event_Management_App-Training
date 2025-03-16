import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/navbar/Navbar';
import './EventDetails.css';

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`https://event-management-app-training.vercel.app/events/${eventId}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const handleRegister = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`https://event-management-app-training.vercel.app/events/${eventId}/register`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/profile');
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <>
      <Navbar />
      <div className="event-details-container">
        <div className="event-details-card">
          <div className="event-type-badge">{event.eventType}</div>
          <h1>{event.eventName}</h1>
          <div className="event-info">
            <div className="info-item">
              <i className="fas fa-user"></i>
              <span>Hosted by {event.username}</span>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <span>Contact: {event.email}</span>
            </div>
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>{event.location}</span>
            </div>
            <div className="info-item">
              <i className="fas fa-calendar-alt"></i>
              <span>{new Date(event.eventDate).toLocaleString()}</span>
            </div>
            <div className="info-item">
              <i className="fas fa-users"></i>
              <span>Capacity: {event.capacity}</span>
            </div>
          </div>
          <button className="register-button" onClick={handleRegister}>
            Register for Event
          </button>
        </div>
      </div>
    </>
  );
};

export default EventDetails;