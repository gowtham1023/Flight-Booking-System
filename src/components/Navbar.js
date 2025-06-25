import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlaneDeparture, FaTicketAlt, FaUserShield, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaPlaneDeparture className="navbar-icon" />
        <h3 className="navbar-logo">SkyBook</h3>
      </div>
      <div className="navbar-links">
        <Link to="/flights" className="navbar-link">
          <FaTicketAlt className="icon" /> Flights
        </Link>
        <Link to="/bookings" className="navbar-link">
          <FaUserShield className="icon" /> Bookings
        </Link>
        <Link to="/dashboard" className="navbar-link">
          <FaUserShield className="icon" />Admin Dashboard
        </Link>
        <button onClick={handleLogout} className="navbar-logout">
          <FaSignOutAlt className="icon" /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
