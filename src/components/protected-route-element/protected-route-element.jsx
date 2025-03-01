import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRouteElement = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuth); // Check if user logged in
  const location = useLocation(); // Get current location

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

ProtectedRouteElement.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRouteElement;
