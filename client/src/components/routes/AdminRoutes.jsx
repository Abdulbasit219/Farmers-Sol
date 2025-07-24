import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function AdminRoutes() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  return isAuthenticated && user?.isAdmin === 1 ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default AdminRoutes;
