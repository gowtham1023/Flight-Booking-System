import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Bookings.css';
import { FaPlaneDeparture, FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone, FaChair } from 'react-icons/fa';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userEmail) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/bookings?email=${userEmail}`);
        setBookings(res.data || []);
      } catch (err) {
        console.error('Error fetching bookings:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail]);

  if (loading) return <div>Loading bookings...</div>;
  if (!userEmail) return <div>Please login to view bookings.</div>;
  if (bookings.length === 0) return <div>No bookings found.</div>;

  return (
    <div className="bookings-container">
      <h2>Your Bookings</h2>
      {bookings.map((booking, idx) => (
        <div key={idx} className="booking-card">
          <h3>{booking.flightId?.airline}</h3>
          <p><FaPlaneDeparture /> <strong>Route:</strong> {booking.flightId?.source} → {booking.flightId?.destination}</p>
          <p><FaCalendarAlt /> <strong>Date:</strong> {booking.flightId?.date}</p>
          <p><FaClock /> <strong>Time:</strong> {booking.flightId?.time}</p>
          <p><FaChair /> <strong>Seats:</strong> {booking.seats?.join(', ')}</p>
          <p><FaUser /> <strong>Passenger:</strong> {booking.passengerName}</p>
          <p><FaEnvelope /> <strong>Email:</strong> {booking.email}</p>
          <p><FaPhone /> <strong>Phone:</strong> {booking.phone}</p>
          <p><strong>Booked At:</strong> {new Date(booking.bookedAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
