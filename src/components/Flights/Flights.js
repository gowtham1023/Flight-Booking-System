import React, { useEffect, useState } from 'react';
import axios from '../../api/api';

function Flights() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      const res = await axios.get('/flights');
      setFlights(res.data);
    };
    fetchFlights();
  }, []);

  return (
    <div>
      <h2>Available Flights</h2>
      {flights.map((flight) => (
        <div key={flight._id}>
          <h3>{flight.airline}</h3>
          <p>From: {flight.from} - To: {flight.to}</p>
          <p>Price: ₹{flight.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Flights;
