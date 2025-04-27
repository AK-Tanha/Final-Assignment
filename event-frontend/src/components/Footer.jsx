// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4 shadow-sm">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <p className="mb-2 mb-md-0">&copy; {new Date().getFullYear()} 🎟️ EventPlatform</p>
        <div>
          <Link to="/events" className="text-white text-decoration-none me-3">Events</Link>
          <Link to="/about" className="text-white text-decoration-none me-3">About</Link>
          <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
