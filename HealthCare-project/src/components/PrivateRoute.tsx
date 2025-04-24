
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  userType: 'patient' | 'dentist';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, userType }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // You could add a loading spinner here
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user type matches the required type for this route
  if (user.userType !== userType) {
    return <Navigate to={`/${user.userType}/dashboard`} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
