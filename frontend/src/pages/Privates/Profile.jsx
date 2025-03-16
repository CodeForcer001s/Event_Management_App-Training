import React, { useState, useEffect } from 'react'
import Navbar from '../../Components/navbar/Navbar'
import axios from 'axios'
import './Profile.css'

const Profile = () => {
  const [userData, setUserData] = useState({ username: 'Loading...' });
  const [createdEvents, setCreatedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        // Fetch user data
        const userResponse = await axios.get('http://localhost:8080/AuthRouter/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(userResponse.data);

        // Fetch all events and filter by user's email
        const eventsResponse = await axios.get('http://localhost:8080/events/all');
        const userEvents = eventsResponse.data.filter(event => event.email === userResponse.data.email);
        setCreatedEvents(userEvents);

        // Fetch registered events
        const registeredResponse = await axios.get('http://localhost:8080/events/registered/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRegisteredEvents(registeredResponse.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
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

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="user-info">
            <div className="avatar">{userData.username[0]?.toUpperCase()}</div>
            <h2>{userData.username}</h2>
          </div>
        </div>

        <div className="events-container">
          <div className="events-section">
            <h3>Events Created</h3>
            <div className="events-grid">
              {createdEvents.map(event => (
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
                  </div>
                </div>
              ))}
              {createdEvents.length === 0 && <p>No events created yet</p>}
            </div>
          </div>

          <div className="events-section">
            <h3>Events Registered</h3>
            <div className="events-grid">
              {registeredEvents.map(registration => (
                <div key={registration._id} className="event-card">
                  <div className="card-content">
                    <div className="event-type-badge">Registered</div>
                    <h2 className="event-name">{registration.eventName}</h2>
                    <div className="event-details">
                      <div className="detail-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{registration.location}</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-calendar-alt"></i>
                        <span>{formatDate(registration.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {registeredEvents.length === 0 && <p>No events registered yet</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;