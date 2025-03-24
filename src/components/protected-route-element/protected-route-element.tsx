import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { TStore } from '../../declarations/store';

interface IProtectedRouteElement {
  children: React.ReactNode;
}

const ProtectedRouteElement: React.FC<IProtectedRouteElement> = ({
  children,
}) => {
  const isAuth = useSelector((state: TStore) => state.auth.isAuth); // Check if user logged in
  const location = useLocation(); // Get current location

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRouteElement;
