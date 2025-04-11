import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

interface IProtectedRouteElement {
  children: React.ReactNode;
}

const ProtectedRouteElement: React.FC<IProtectedRouteElement> = ({
  children,
}) => {
  const isAuth = useAppSelector((store) => store.auth.isAuth); // Check if user is authenticated
  const location = useLocation(); // Get current location

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRouteElement;
