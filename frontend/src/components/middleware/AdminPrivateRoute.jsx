// src/components/middleware/AdminPrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../features/Auth/AuthContext";

export default function AdminPrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    // Chờ profile load xong; bạn có thể trả spinner ở đây nếu muốn
    return null;
  }

  console.log("AdminPrivateRoute user:", user);
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  // Nếu là admin, render Outlet
  return <Outlet />;
}
