// src/features/Admin/Users/AdminUserPasswordForm.jsx
import React, { useState } from 'react';
import { updateUserPassword } from '../../services/userService';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdminUserPasswordForm() {
  const { id } = useParams();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateUserPassword(id, { password });
    alert('Đặt lại mật khẩu thành công');
    navigate('/admin/users');
  };

  return (
    <div className="admin-content">
      {/* Page header */}
      <div className="header">
        <div>
          <h1 className="text-3xl font-bold text-black">Reset User Password</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Đặt lại mật khẩu cho tài khoản người dùng
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin/users')}
          className="button-secondary"
        >
          Cancel
        </button>
      </div>

      {/* Password Reset Form */}
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-group">
          <label htmlFor="password" className="form-label">New Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="form-input"
            placeholder="Enter new password"
          />
        </div>
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/users')}
            className="button-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="button-primary"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}
