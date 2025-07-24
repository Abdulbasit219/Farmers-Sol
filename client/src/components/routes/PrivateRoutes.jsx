import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function PrivateRoutes() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default PrivateRoutes;
