import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  let isAuthenticated = !!localStorage.getItem('token');
  // isAuthenticated = true;

  // If no children (i.e., root path), handle redirect to /dashboard or /login
  if (!children) {
    // If not authenticated, redirect to login page
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
  }
  // If authenticated, render the protected content
  if (isAuthenticated) {
    return children;
  }

  // If not authenticated, redirect to error page
  return <Navigate to="/errorPage" />;
};

export default ProtectedRoute;
