import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import './FlightsPage.css'; // ✅ Add this line

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [form, setForm] = useState({
    source: '',
    destination: '',
    date: '',
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/flights');
      setFlights(res.data);
      setFilteredFlights(res.data);
    } catch (err) {
      console.error('Error fetching flights:', err);
    }
  };

  const handleSearch = () => {
    const { source, destination, date } = form;
    const results = flights.filter(flight =>
      flight.source.toLowerCase().includes(source.toLowerCase()) &&
      flight.destination.toLowerCase().includes(destination.toLowerCase()) &&
      (!date || flight.date === date)
    );
    setFilteredFlights(results);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="flights-container">
        <h2 className="flights-title">Search Flights</h2>
        <div className="search-box">
          <input
            type="text"
            name="source"
            placeholder="From"
            value={form.source}
            onChange={handleChange}
          />
          <input
            type="text"
            name="destination"
            placeholder="To"
            value={form.destination}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="flight-results">
          {filteredFlights.length === 0 ? (
            <p className="no-results">No flights found.</p>
          ) : (
            filteredFlights.map((flight, i) => (
              <div key={i} className="flight-card">
                <div className="flight-details">
                  <div className="flight-route">
                    <strong>{flight.source}</strong> ✈️ <strong>{flight.destination}</strong>
                  </div>
                  <div>Date: {flight.date}</div>
                  <div>Time: {flight.time}</div>
                  <div>Airline: {flight.airline}</div>
                  <div>Price: ₹{flight.price}</div>
                </div>
                <button
                  className="book-btn"
                  onClick={() => navigate(`/book-flight/${flight._id}`)}
                >
                  Book Now
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default FlightsPage;
