// src/components/Flights/PaymentPage.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './PaymentPage.css';
import { FaGooglePay, FaCreditCard } from 'react-icons/fa';
import { SiPhonepe, SiPaytm } from 'react-icons/si';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, selectedSeats } = location.state;

  const [passengers, setPassengers] = useState(
    selectedSeats.map(() => ({ name: '', email: '', phone: '' }))
  );
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiApp, setUpiApp] = useState('');

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleBooking = async () => {
    if (!paymentMethod) return alert('Please select a payment method');
    if (paymentMethod === 'UPI' && !upiApp) return alert('Please select a UPI app');

    const isDetailsFilled = passengers.every(p => p.name && p.email && p.phone);
    if (!isDetailsFilled) return alert('Please fill all passenger details');

    try {
      const bookingRequests = passengers.map((passenger, idx) => ({
        flightId: flight._id,
        passengerName: passenger.name,
        email: passenger.email,
        phone: passenger.phone,
        seats: [selectedSeats[idx]],
      }));

      const responses = await Promise.all(
        bookingRequests.map(data =>
          axios.post('http://localhost:5000/api/bookings', data)
        )
      );

      if (responses.every(res => res.status === 201)) {
        alert('Booking successful!');
        navigate('/booking-success');
      } else {
        alert('Some bookings failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error.response?.data || error.message);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="payment-container">
      <h2>Passenger Details</h2>

      {passengers.map((passenger, i) => (
        <div className="passenger-card" key={i}>
          <h4>Passenger {i + 1} (Seat: {selectedSeats[i]})</h4>
          <input
            type="text"
            placeholder="Name"
            value={passenger.name}
            onChange={(e) => handlePassengerChange(i, 'name', e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={passenger.email}
            onChange={(e) => handlePassengerChange(i, 'email', e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={passenger.phone}
            onChange={(e) => handlePassengerChange(i, 'phone', e.target.value)}
          />
        </div>
      ))}

      <h3>Total Amount: ₹{selectedSeats.length * flight.price}</h3>

      <div className="payment-method">
        <h3>Choose Payment Method</h3>
        <div className="payment-method-options">
          <div
            className={`payment-card ${paymentMethod === 'UPI' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('UPI')}
          >
            <FaGooglePay size={40} />
            <span>UPI</span>
          </div>
          <div
            className={`payment-card ${paymentMethod === 'Card' ? 'selected' : ''}`}
            onClick={() => setPaymentMethod('Card')}
          >
            <FaCreditCard size={40} />
            <span>Card</span>
          </div>
        </div>
      </div>
{paymentMethod === 'UPI' && (
  <div className="upi-options">
    <h4>Select UPI App:</h4>
    <div className="upi-buttons">
      <button
        type="button"
        onClick={() => setUpiApp('Google Pay')}
        className={`upi-button ${upiApp === 'Google Pay' ? 'selected' : ''}`}
      >
        <FaGooglePay className="upi-icon" />
        <span>Google Pay</span>
      </button>
      <button
        type="button"
        onClick={() => setUpiApp('PhonePe')}
        className={`upi-button ${upiApp === 'PhonePe' ? 'selected' : ''}`}
      >
        <SiPhonepe className="upi-icon" />
        <span>PhonePe</span>
      </button>
      <button
        type="button"
        onClick={() => setUpiApp('Paytm')}
        className={`upi-button ${upiApp === 'Paytm' ? 'selected' : ''}`}
      >
        <SiPaytm className="upi-icon" />
        <span>Paytm</span>
      </button>
    </div>
    <p className="selected-upi">Selected: {upiApp || 'None'}</p>
  </div>
)}



      <button className="confirm-button" onClick={handleBooking}>
        Confirm & Pay
      </button>
    </div>
  );
};

export default PaymentPage;
