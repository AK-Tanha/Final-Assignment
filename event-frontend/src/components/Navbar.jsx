import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <Link className="navbar-brand fw-bold text-white" to="/">EventPlatform</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-center text-center" id="navbarNav">
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/events">Events</Link>
          </li>
          {token && (
            <li className="nav-item">
              <Link className="nav-link text-white" to="/create-event">Create Event</Link>
            </li>
          )}
        </ul>

        <ul className="navbar-nav mb-2 mb-lg-0">
          {token ? (
            <>
              <li className="nav-item">
                <span className="nav-link text-white">
                  👤 {user?.username || 'User'}
                </span>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-sm btn-outline-light my-2">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
