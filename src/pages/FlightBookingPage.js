// src/pages/FlightBookingPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FlightBookingPage.css';

const FlightBookingPage = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/flights/${flightId}`);
        console.log('Flight API response:', res.data);
        setFlight(res.data);
      } catch (err) {
        console.error('Error loading flight:', err.message);
      }
    };

    if (flightId) fetchFlight();
  }, [flightId]);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const confirmSeats = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }

    navigate('/payment', {
      state: { flight, selectedSeats }
    });
  };

  if (!flight) return <div className="loading">Loading flight...</div>;

  const seats = Array.from({ length: 30 }, (_, i) => `S${i + 1}`);

  return (
    <div className="booking-container">
      <h2>Flight Booking</h2>
      <p><strong>Flight:</strong> {flight.airline}</p>
      <p><strong>From:</strong> {flight.source} <strong>To:</strong> {flight.destination}</p>
      <p><strong>Date:</strong> {flight.date} <strong>Time:</strong> {flight.time}</p>
      <p><strong>Price:</strong> ₹{flight.price}</p>

      <h3>Select Seats</h3>
      <div className="seat-grid">
        {seats.map(seat => (
          <div
            key={seat}
            onClick={() => handleSeatClick(seat)}
            className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
          >
            {seat}
          </div>
        ))}
      </div>

      <button onClick={confirmSeats} className="confirm-btn">Confirm Seats</button>
    </div>
  );
};

export default FlightBookingPage;
