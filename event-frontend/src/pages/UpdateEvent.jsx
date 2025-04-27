import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
  });

  useEffect(() => {
    axios.get(`https://final-assignment-obyq.vercel.app/api/events/${id}`)
      .then((res) => setEventData(res.data))
      .catch((err) => {
        console.error('Error fetching event:', err);
        setError('Failed to fetch event data.');
      });
  }, [id]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.put(`https://final-assignment-obyq.vercel.app/api/events/${id}`, eventData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Event updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Update failed', err);
      setError('Failed to update event.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f2f6fc' }}>
      <div className="card p-4 shadow-sm border-0 w-100" style={{ maxWidth: '600px', borderRadius: '15px' }}>
        <h4 className="text-center mb-4" style={{ color: '#d4af37' }}>Edit Event</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Event Name</label>
            <input type="text" className="form-control" name="name" value={eventData.name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" rows="3" value={eventData.description} onChange={handleChange} required />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" name="date" value={eventData.date} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Time</label>
              <input type="time" className="form-control" name="time" value={eventData.time} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input type="text" className="form-control" name="location" value={eventData.location} onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <label className="form-label">Category</label>
            <input type="text" className="form-control" name="category" value={eventData.category} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn w-100" style={{ backgroundColor: '#d4af37', color: '#fff' }}>
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
