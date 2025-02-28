import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouteElement = ({ children }) => {
    const isAuth = useSelector(state => state.auth.isAuth); // Check if user logged in
    const location = useLocation(); // Get current location

    if(!isAuth) {
        return <Navigate to="/login" state={{from: location}} replace />
    }

    return children;
}

export default ProtectedRouteElement;