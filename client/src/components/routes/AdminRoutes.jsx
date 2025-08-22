import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { handleError } from "../../Utils";

function AdminRoutes() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAuthenticated && user?.isAdmin !== 1) {
    handleError("You are not an admin");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoutes;
