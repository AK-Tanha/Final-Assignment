// src/components/EventList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the API
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Upcoming Events</h2>
      <div className="row">
        {events.map(event => (
          <div key={event._id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
                <p className="text-muted">Date: {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-muted">Time: {event.time}</p>
                <Link to={`/events/${event._id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const token = localStorage.getItem('token');

{token && (
  <>
    <button onClick={() => handleEdit(event._id)}>Edit</button>
    <button onClick={() => handleDelete(event._id)}>Delete</button>
  </>
)}

export default EventList;
