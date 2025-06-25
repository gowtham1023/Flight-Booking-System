import React from 'react';
import Navbar from '../components/Navbar';
import './HomePage.css'; // External styles

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <div className="home-overlay">
        <div className="home-content">
          <h1>Welcome to SkyBook 🛫</h1>
          <br></br>
          <p>Find and book flights seamlessly — Fast, Simple & Secure.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
