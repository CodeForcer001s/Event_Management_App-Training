import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/navbar/Navbar';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://event-management-app-training.vercel.app/events/all');
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleJoinEvent = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="dashboard-loading">Loading events...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Upcoming Events</h1>
        <div className="events-wrapper">
          <div className="events-grid">
            {events.map((event) => (
              <div key={event._id} className="event-card">
                <div className="card-content">
                  <div className="event-type-badge">{event.eventType}</div>
                  <h2 className="event-name">{event.eventName}</h2>
                  <div className="event-details">
                    <div className="detail-item">
                      <i className="fas fa-user"></i>
                      <span>Hosted by {event.username}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{event.location}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-calendar-alt"></i>
                      <span>{formatDate(event.eventDate)}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-users"></i>
                      <span>Capacity: {event.capacity}</span>
                    </div>
                  </div>
                  <button 
                    className="join-button"
                    onClick={() => handleJoinEvent(event._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
