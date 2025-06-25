import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { FaPlane, FaUserAlt, FaClipboardList, FaPlus, FaSignOutAlt, FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ flights: 0, bookings: 0, users: 0 });
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/stats');
      setStats(res.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const fetchFlights = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/flights');
      setFlights(res.data);
    } catch (err) {
      console.error('Failed to fetch flights:', err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings/all');
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };

  const deleteFlight = async (id) => {
    if (window.confirm('Delete this flight?')) {
      try {
        await axios.delete(`http://localhost:5000/api/flights/${id}`);
        fetchFlights();
        alert('Flight deleted');
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  useEffect(() => {
    fetchStats();
    fetchFlights();
    fetchBookings();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
      <h2 className="dashboard-title">🛫 Admin Dashboard</h2>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem('isAdmin');
            window.location.href = '/admin-login';
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="stats">
        <div className="stat-card">
          <FaPlane className="stat-icon" />
          <p>Total Flights</p>
          <h3>{stats.flights}</h3>
        </div>
        <div className="stat-card">
          <FaClipboardList className="stat-icon" />
          <p>Total Bookings</p>
          <h3>{stats.bookings}</h3>
        </div>
        <div className="stat-card">
          <FaUserAlt className="stat-icon" />
          <p>Total Users</p>
          <h3>{stats.users}</h3>
        </div>
      </div>

      <div className="section-header">
        <h3>All Flights</h3>
        <button className="add-btn">
          <FaPlus /> Add Flight
        </button>
      </div>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Airline</th><th>Route</th><th>Date</th><th>Time</th><th>Price</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {flights.map(f => (
            <tr key={f._id}>
              <td>{f.airline}</td>
              <td>{f.source} → {f.destination}</td>
              <td>{f.date}</td>
              <td>{f.time}</td>
              <td>₹{f.price}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteFlight(f._id)}>
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="section-header">
        <h3>All Bookings</h3>
      </div>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Flight</th><th>Passenger</th><th>Email</th><th>Phone</th><th>Seats</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id}>
              <td>{b.flightId?.airline}</td>
              <td>{b.passengerName}</td>
              <td>{b.email}</td>
              <td>{b.phone}</td>
              <td>{b.seats.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
