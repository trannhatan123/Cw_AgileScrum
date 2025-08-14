import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../features/Auth/AuthContext";
import GoogleCallback from "../features/Auth/GoogleCallback";

// Layouts
import MainLayout from "../layouts/MainLayout";
import HomeLayout from "../layouts/HomeLayout";
import AdminLayout from "../layouts/AdminLayout";

// Pages
import Home from "../features/Landing/Landing";
import Register from "../features/Auth/Register";
import Login from "../features/Auth/Login";
import ConfirmEmail from "../features/Auth/ConfirmEmail";
import ForgotPassword from "../features/Auth/ForgotPassword";
import ResetPassword from "../features/Auth/ResetPassword";
import AdminLogin from "../features/Admin/Auth/AdminLogin";

// Admin
import AdminPrivateRoute from "../components/middleware/AdminPrivateRoute";
import AdminPlanetList from "../features/Admin/Planets/AdminPlanetList";
import AdminPlanetForm from "../features/Admin/Planets/AdminPlanetForm";
import AdminQuizList from "../features/Admin/Quizzes/AdminQuizList";
import AdminQuizForm from "../features/Admin/Quizzes/AdminQuizForm";
import AdminEventList from "../features/Admin/Events/AdminEventList";
import AdminEventForm from "../features/Admin/Events/AdminEventForm";
import AdminUserList from "../features/Admin/AdminUserList";
import AdminUserForm from "../features/Admin/AdminUserForm";
import AdminUserPasswordForm from "../features/Admin/AdminUserPasswordForm";
import AdminDashboard from "../features/Admin/Dashboard/AdminDashboard";


import PlanetsPage from '../features/Planets/PlanetsPage';
import PlanetDetailPage from "../features/Planets/PlanetDetail/PlanetDetailPage";
export default function AppRouter() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Admin Login - public */}
      <Route
        path="/admin/login"
        element={
          user && user.role === "admin" ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <AdminLogin />
          )
        }
      />

      {/* Admin Routes Grouped under private and layout */}
      <Route element={<AdminPrivateRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="planets/new" element={<AdminPlanetForm />} />
          <Route path="planets/:id/edit" element={<AdminPlanetForm />} />
          <Route path="quizzes" element={<AdminQuizList />} />
          <Route path="quizzes/new" element={<AdminQuizForm />} />
          <Route path="quizzes/:id/edit" element={<AdminQuizForm />} />
          <Route path="events" element={<AdminEventList />} />
          <Route path="events/new" element={<AdminEventForm />} />
          <Route path="events/:id/edit" element={<AdminEventForm />} />
          <Route path="users" element={<AdminUserList />} />
          <Route path="users/new" element={<AdminUserForm />} />
          <Route path="users/:id/edit" element={<AdminUserForm />} />
          <Route
            path="users/:id/password"
            element={<AdminUserPasswordForm />}
          />
          {/* Default admin path */}
          <Route index element={<Navigate to="dashboard" />} />
        </Route>
      </Route>

      {/* Xác nhận email, quên mật khẩu, reset sử dụng AuthLayout */}

      {/* Home Layout */}
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Main Layout */}
      <Route element={<MainLayout />}>
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        {/* Google OAuth callback */}
        <Route path="/auth/success" element={<GoogleCallback />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/confirm-email/:token" element={<ConfirmEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/planets" element={<PlanetsPage />} />
        <Route path="/planets/:slug" element={<PlanetDetailPage />} />
        {/* Catch-all for unknown routes in MainLayout */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
