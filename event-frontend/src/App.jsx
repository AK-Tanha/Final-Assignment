import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';  // Capital H in Home
import EventList from './components/EventList';
import EventDetail from './pages/EventDetail'; // Correct import
import Navbar from './components/Navbar';
import CreateEvent from './pages/CreateEvent';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import UpdateEvent from './pages/UpdateEvent';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <div className="container mt-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetail />} /> {/* Route for individual event details */}
          
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-event"
            element={
              <PrivateRoute>
                <CreateEvent />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update-event/:id" element={<UpdateEvent />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
