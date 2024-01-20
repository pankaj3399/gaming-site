import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/authUtils';
import Navbar from './navbar';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuth = isAuthenticated();
  return isAuth ? (
    <div>
      <Navbar />
      {children}
    </div>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
