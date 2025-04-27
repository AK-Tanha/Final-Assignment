// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const response = await axios.get('https://final-assignment-obyq.vercel.app/api/events/mine', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        setError('Invalid data format');
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to fetch events');
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await axios.delete(`https://final-assignment-obyq.vercel.app/api/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.status === 200) {
          setEvents(events.filter((event) => event._id !== eventId));
        }
      } catch (err) {
        console.error('Error deleting event:', err);
        alert('Failed to delete event');
      }
    }
  };

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  const handleEditEvent = (eventId) => {
    navigate(`/update-event/${eventId}`);
  };

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Events</h1>
        <button className="btn btn-primary" onClick={handleCreateEvent}>
          + Create New Event
        </button>
      </div>

      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <div className="row">
          {events.map((event) => (
            <div className="col-md-4 mb-4" key={event._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">
                    <strong>Date:</strong> {event.date}<br />
                    <strong>Time:</strong> {event.time}<br />
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="card-text">{event.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEditEvent(event._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
