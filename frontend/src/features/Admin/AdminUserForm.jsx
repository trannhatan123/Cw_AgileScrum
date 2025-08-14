// src/features/Admin/Users/AdminUserForm.jsx
import React, { useState, useEffect } from 'react';
import { getUserById, updateUser, createUser } from '../../services/userService';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdminUserForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ name: '', email: '', role: 'user', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      getUserById(id).then(res => {
        setForm({ name: res.data.name, email: res.data.email, role: res.data.role, password: '' });
      });
    }
  }, [id, isEdit]);

  const onChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (isEdit) {
      await updateUser(id, { name: form.name, email: form.email, role: form.role });
    } else {
      await createUser({ name: form.name, email: form.email, role: form.role, password: form.password });
    }
    navigate('/admin/users');
  };

  return (
    <div className="admin-content">
      {/* Page header */}
      <div className="header">
        <div>
          <h1 className="text-3xl font-bold text-black">{isEdit ? 'Edit User' : 'Create User'}</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {isEdit ? 'Cập nhật thông tin người dùng' : 'Tạo mới tài khoản người dùng'}
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

      {/* Form card */}
      <form onSubmit={onSubmit} className="form-card">
        {/* Name field */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={onChange}
            required
            className="form-input"
            placeholder="Enter full name"
          />
        </div>

        {/* Email field */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            className="form-input"
            placeholder="Enter email address"
          />
        </div>

        {/* Password field (create only) */}
        {!isEdit && (
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              required
              className="form-input"
              placeholder="Enter a secure password"
            />
          </div>
        )}

        {/* Role field */}
        <div className="form-group">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={onChange}
            className="form-select"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Form actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/users')}
            className="button-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="button-primary">
            {isEdit ? 'Save Changes' : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );
}
