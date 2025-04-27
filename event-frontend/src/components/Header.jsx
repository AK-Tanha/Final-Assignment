import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-light">
      <Link to="/" className="h4 text-decoration-none text-dark">Event Assignment</Link>
      <div>
        {user ? (
          <>
            <span className="me-3">Hello, {user.username}</span>
            <button onClick={logout} className="btn btn-outline-danger btn-sm">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-primary btn-sm me-2">Login</Link>
            <Link to="/register" className="btn btn-outline-secondary btn-sm">Register</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
