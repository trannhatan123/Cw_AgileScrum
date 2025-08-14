// src/features/Admin/Planets/AdminPlanetList.jsx
import React, { useEffect, useState } from 'react';
import { getAllPlanets, deletePlanet } from '../../../services/planetService';
import { useNavigate } from 'react-router-dom';

export default function AdminPlanetList() {
  const [planets, setPlanets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { fetchData(); }, []);
  const fetchData = async () => {
    try {
      const res = await getAllPlanets();
      setPlanets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this planet?')) {
      try {
        await deletePlanet(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="admin-content">
      {/* Page header */}
      <div className="header">
        <div>
          <h1 className="text-3xl font-bold text-black">Manage Planets</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Tạo, chỉnh sửa và quản lý các hành tinh của Solar System Explorer
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/planets/new')}
          className="button-primary"
        >
          + Add Planet
        </button>
      </div>

      {/* Planets Table */}
      <div className="list-card scrollable">
        <table className="min-w-full divide-y divide-[var(--color-border)]">
          <thead className="bg-[var(--color-bg)]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">Created At</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">Updated At</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">History</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[var(--color-border)]">
            {planets.map((p) => (
              <tr key={p._id}>
                <td className="px-6 py-4 whitespace-nowrap text-[var(--color-text)]">{p.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[var(--color-text)]">
                  {p.createdAt ? new Date(p.createdAt).toLocaleString() : '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[var(--color-text)]">
                  {p.updatedAt ? new Date(p.updatedAt).toLocaleString() : '—'}
                </td>
                <td className="px-6 py-4 whitespace-normal text-[var(--color-text)]">
                  {Array.isArray(p.history) && p.history.length > 0 ? (
                    <ul className="list-disc list-inside text-xs text-[var(--color-text-muted)]">
                      {p.history.map((h, i) => (
                        <li key={i}>
                          <span className="font-medium text-[var(--color-text)]">{h.slug}</span>{' '}
                          <span className="text-xs text-[var(--color-text-muted)]">
                            {h.updatedAt ? `(${new Date(h.updatedAt).toLocaleDateString()})` : '—'}
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
                    onClick={() => navigate(`/admin/planets/${p._id}/edit`)}
                    className="px-2 py-1 text-xs button-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-2 py-1 text-xs button-secondary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
