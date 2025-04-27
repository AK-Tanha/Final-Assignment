import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
  const { id } = useParams();  // Grab the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${id}`);
        const data = await response.json();

        if (response.ok) {
          setEvent(data);
        } else {
          setError('Event not found');
        }
      } catch (err) {
        setError('An error occurred while fetching the event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]); // Trigger useEffect when the event ID changes

  if (loading) return <div className="text-center">Loading event details...</div>;

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>{event?.name}</h2>
      <p><strong>Description:</strong> {event?.description}</p>
      <p><strong>Date:</strong> {event?.date}</p>
      <p><strong>Time:</strong> {event?.time}</p>
      <p><strong>Location:</strong> {event?.location}</p>
      <p><strong>Category:</strong> {event?.category}</p>
      <p><strong>Created By:</strong> {event?.createdBy?.username || 'Unknown'}</p>
      <a href="/events" className="btn btn-primary">Back to Events</a>
    </div>
  );
};

export default EventDetail;
