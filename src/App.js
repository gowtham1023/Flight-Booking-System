import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import Flights from './components/Flights/Flights';
import AddFlight from './components/Admin/AddFlight';
import Dashboard from './components/Admin/Dashboard';
import FlightsPage from './pages/FlightsPage';
import ProtectedRoute from './utils/ProtectedRoute';
import FlightBookingPage from './pages/FlightBookingPage';
import PaymentPage from './components/Flights/PaymentPage';
import BookingSuccess from './components/Flights/BookingSuccess';
import Bookings from './components/Bookings/Bookings'; // ✅ FIXED ✅
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import ProtectedAdminRoute from './utils/ProtectedAdminRoute';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Auth Page */}
        <Route path="/" element={<AuthPage />} />

        {/* Home after login */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Flights list page */}
        <Route
          path="/flights"
          element={
            <ProtectedRoute>
              <FlightsPage />
            </ProtectedRoute>
          }
        />

        {/* Book a flight */}
        <Route path="/book-flight/:flightId" element={<FlightBookingPage />} />

        {/* Payment */}
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/booking-success" element={<BookingSuccess />} />

        {/* ✅ Bookings Page Route (Correct Component) */}
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/add-flight"
          element={
            <ProtectedRoute>
              <AddFlight />
            </ProtectedRoute>
          }
          
        />
         <Route path="/admin-login" element={<AdminLogin />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedAdminRoute>
                <Dashboard />
              </ProtectedAdminRoute>
            }
          />
      </Routes>
    </Router>
  );
}

export default App;
