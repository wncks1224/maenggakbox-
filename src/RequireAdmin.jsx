// src/components/RequireAdmin.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAdmin({ children }) {
  const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

  return isLoggedIn ? children : <Navigate to="/admin/login" replace />;
}
