// src/features/Admin/Users/AdminUserList.jsx
import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1 });
  const navigate = useNavigate();

  const load = async (page = 1) => {
    try {
      const res = await getUsers(page, 10);
      setUsers(res.data.data);
      setMeta(res.data.meta);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  const onDelete = async id => {
    if (window.confirm('Xóa người dùng này?')) {
      await deleteUser(id);
      load(meta.page);
    }
  };

  return (
    <div className="space-y-8 flex-1 p-6 overflow-hidden">
      {/* Page header */}
      <div className="header">
        <div>
          <h1 className="text-3xl font-bold text-black">Manage Users</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Tạo, chỉnh sửa, đặt lại mật khẩu và quản lý người dùng của hệ Solar System Explorer
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/users/new')}
          className="button-primary"
        >
          + Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="scrollable bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-[var(--color-border)]">
          <thead className="bg-[var(--color-bg)]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">History</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[var(--color-border)]">
            {users.map(u => (
              <tr key={u._id}>
                <td className="px-6 py-4 whitespace-nowrap text-[var(--color-text)]">{u.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[var(--color-text)]">{u.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[var(--color-text)]">{u.role}</td>
                <td className="px-6 py-4 whitespace-normal text-[var(--color-text)]">
                  {Array.isArray(u.history) && u.history.length > 0 ? (
                    <ul className="list-disc list-inside text-xs text-[var(--color-text-muted)]">
                      {u.history.map((h, i) => (
                        <li key={i}>
                          <span className="font-medium text-[var(--color-text)]">{h.field}</span>:
                          <span className="ml-1">
                            {String(h.oldValue)} → {String(h.newValue)}{' '}
                            <span className="text-[var(--color-text-muted)]">(
                              {h.updatedAt ? new Date(h.updatedAt).toLocaleDateString() : '—'}
                            )</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-[var(--color-text-muted)]">—</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => navigate(`/admin/users/${u._id}/edit`)}
                    className="px-2 py-1 text-xs button-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate(`/admin/users/${u._id}/password`)}
                    className="px-2 py-1 text-xs button-secondary"
                  >
                    Reset Password
                  </button>
                  <button
                    onClick={() => onDelete(u._id)}
                    className="px-2 py-1 text-xs button-secondary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between bg-white border-t border-[var(--color-border)]">
          <button
            disabled={meta.page <= 1}
            onClick={() => load(meta.page - 1)}
            className="px-3 py-1 rounded bg-[var(--color-border)] disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-[var(--color-text-muted)]">
            Page {meta.page} of {meta.pages}
          </span>
          <button
            disabled={meta.page >= meta.pages}
            onClick={() => load(meta.page + 1)}
            className="px-3 py-1 rounded bg-[var(--color-border)] disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
