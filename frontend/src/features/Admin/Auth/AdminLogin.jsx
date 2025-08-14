// src/features/Auth/AdminLogin.jsx
import React, { useState } from 'react';
import { useAuth } from '../../Auth/AuthContext';
import apiClient from '../../../services/apiClient';
import { useNavigate, Navigate, Link } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user && user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { data } = await apiClient.post('/auth/admin/login', { email, password });
      login({ token: data.token, user: data.user });
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleSubmit} className="admin-login-form">
        <div className="login-logo-container">
          <img src="/images/earth.png" alt="Logo" className="login-logo-icon" />
          <span className="login-logo-text">Solar System Explorer</span>
        </div>
        <h2 className="login-title">Admin Login</h2>
       
        {error && <div className="login-error">{error}</div>}

        <div className="login-form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={submitting}
          />
        </div>

        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={submitting}
          />
        </div>

        <div className="remember-group">
          <input
            id="remember"
            type="checkbox"
            className="remember-checkbox"
            disabled={submitting}
          />
          <label htmlFor="remember" className="remember-label">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="login-submit"
          disabled={submitting}
        >
          {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>

        <div className="login-links">
          <Link to="/admin/forgot-password" className="text-blue">
            Forgot password?
          </Link>
          <Link to="/login" className="text-gray">
            User login
          </Link>
        </div>
      </form>
    </div>
  );
}
