import React, { useState } from 'react';
import axios from '../../api/api';

function AddFlight() {
  const [flight, setFlight] = useState({ airline: '', from: '', to: '', price: '' });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/flights', flight, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Flight added!');
    } catch (err) {
      alert('Error adding flight');
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <h2>Add New Flight</h2>
      <input placeholder="Airline" onChange={(e) => setFlight({ ...flight, airline: e.target.value })} />
      <input placeholder="From" onChange={(e) => setFlight({ ...flight, from: e.target.value })} />
      <input placeholder="To" onChange={(e) => setFlight({ ...flight, to: e.target.value })} />
      <input placeholder="Price" type="number" onChange={(e) => setFlight({ ...flight, price: e.target.value })} />
      <button type="submit">Add Flight</button>
    </form>
  );
}

export default AddFlight;
