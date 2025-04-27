// src/components/CreateEvent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to create an event.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Event created successfully!');
        navigate('/events');
      } else {
        setError(result.error || 'Failed to create event.');
      }
    } catch (err) {
      console.error('Event creation error:', err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f2f6fc' }}>
      <div className="card p-4 shadow-sm border-0 w-100" style={{ maxWidth: '600px', borderRadius: '15px' }}>
        <h4 className="text-center mb-4" style={{ color: '#d4af37' }}>Create a New Event</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Event Name</label>
            <input type="text" className="form-control" name="name" value={eventData.name} onChange={handleInputChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" rows="3" value={eventData.description} onChange={handleInputChange} required />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" name="date" value={eventData.date} onChange={handleInputChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Time</label>
              <input type="time" className="form-control" name="time" value={eventData.time} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input type="text" className="form-control" name="location" value={eventData.location} onChange={handleInputChange} required />
          </div>

          <div className="mb-4">
            <label className="form-label">Category</label>
            <input type="text" className="form-control" name="category" value={eventData.category} onChange={handleInputChange} required />
          </div>

          <button type="submit" className="btn w-100" style={{ backgroundColor: '#d4af37', color: '#fff' }}>
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
