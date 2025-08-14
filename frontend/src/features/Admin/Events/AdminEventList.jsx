// src/features/Admin/Events/AdminEventList.jsx
import React, { useEffect, useState } from 'react';
import { getAllEvents, deleteEvent } from '../../../services/eventService';
import { useNavigate } from 'react-router-dom';

export default function AdminEventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { loadEvents(); }, []);
  const loadEvents = async () => {
    try {
      const res = await getAllEvents();
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onDelete = async id => {
    if (window.confirm('Delete this event?')) {
      try {
        await deleteEvent(id);
        loadEvents();
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
          <h1 className="text-3xl font-bold text-black">Manage Events</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Tạo, chỉnh sửa và quản lý các sự kiện thiên văn của Solar System Explorer
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/events/new')}
          className="button-primary"
        >
          + Add Event
        </button>
      </div>

      {/* Events Table */}
      <div className="list-card scrollable">
        <table className="min-w-full divide-y divide-[var(--color-border)]">
          <thead className="bg-[var(--color-bg)]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">Created At</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">Updated At</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">History</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--color-text-muted)]">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[var(--color-border)]">
            {events.map(ev => (
              <tr key={ev._id}>
                <td className="px-6 py-4 whitespace-nowrap text-[var(--color-text)]">{ev.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[var(--color-text)]">{ev.createdAt ? new Date(ev.createdAt).toLocaleString() : '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-[var(--color-text)]">{ev.updatedAt ? new Date(ev.updatedAt).toLocaleString() : '—'}</td>
                <td className="px-6 py-4 whitespace-normal text-[var(--color-text)]">
                  {Array.isArray(ev.history) && ev.history.length > 0 ? (
                    <ul className="list-disc list-inside text-xs text-[var(--color-text-muted)]">
                      {ev.history.map((h, i) => (
                        <li key={i}>
                          <span className="font-medium text-[var(--color-text)]">{h.title}</span>{' '}
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
                    onClick={() => navigate(`/admin/events/${ev._id}/edit`)}
                    className="px-2 py-1 text-xs button-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(ev._id)}
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
