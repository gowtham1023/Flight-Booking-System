import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const adminEmail = localStorage.getItem('adminEmail');
  const role = localStorage.getItem('adminRole');

  if (!adminEmail || role !== 'admin') {
    return <Navigate to="/admin-login" />;
  }

  return children;
};

export default ProtectedAdminRoute;
