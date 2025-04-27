import React from 'react';
import { Link } from 'react-router-dom'; // ✅ import Link

const EventCard = ({ event }) => {
  return (
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
      <div className="card-footer text-end">
        <Link to={`/events/${event._id}`} className="btn btn-outline-primary btn-sm">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
