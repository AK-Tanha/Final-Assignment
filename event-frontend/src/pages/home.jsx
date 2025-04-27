import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('https://final-assignment-obyq.vercel.app/api/events');
        const data = await res.json();
        setEvents(data);

        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(data.map(event => event.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents =
    selectedCategory === 'All'
      ? events
      : events.filter(event => event.category === selectedCategory);

  return (
    <div>
      {/* Banner */}
      <div
        className="text-center text-white py-5 mb-4"
        style={{
          background: 'linear-gradient(135deg, #000, #222)',
          backgroundSize: 'cover',
          color: '#fff',
        }}
      >
        <h1 className="display-4 fw-bold">Welcome to Events Hub</h1>
        <p className="lead">Browse and attend the events in your area!</p>
      </div>

      {/* Category Filter */}
      <div className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Filtered Events */}
      <div className="container">
        <h3 className="mb-4 text-center">
          {selectedCategory === 'All' ? 'All Events' : `Category: ${selectedCategory}`}
        </h3>
        <div className="row">
          {filteredEvents.map(event => (
            <div className="col-md-4 mb-4" key={event._id}>
              <EventCard event={event} />
            </div>
          ))}
          {filteredEvents.length === 0 && (
            <div className="text-center text-muted">No events found for this category.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
