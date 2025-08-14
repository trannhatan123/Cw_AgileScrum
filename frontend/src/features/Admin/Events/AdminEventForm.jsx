// src/features/Admin/Events/AdminEventForm.jsx
import React, { useState, useEffect } from 'react';
import { createEvent, updateEvent, getEventById } from '../../../services/eventService';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdminEventForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ title: '', date: '', description: '', image: null });
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      getEventById(id).then(res => setForm({ ...res.data, image: null }));
    }
  }, [id, isEdit]);

  const onChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('date', form.date);
    fd.append('description', form.description);
    if (form.image) fd.append('image', form.image);

    if (isEdit) await updateEvent(id, fd);
    else await createEvent(fd);
    navigate('/admin/events');
  };

  return (
    <div className="admin-content">
      <div className="header">
        <div>
          <h1 className="text-3xl font-bold text-black">
            {isEdit ? 'Edit Event' : 'Create Event'}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {isEdit
              ? 'Cập nhật thông tin sự kiện thiên văn'
              : 'Thêm mới một sự kiện thiên văn cho hệ Mặt Trời'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin/events')}
          className="button-secondary"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={onSubmit} encType="multipart/form-data" className="form-card max-w-2xl mx-auto">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={onChange}
            required
            placeholder="Enter event title"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date.split('T')[0] || ''}
            onChange={onChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Enter event description"
            className="form-input h-32 resize-none"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={onChange}
            className="form-input"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="button-primary">
            {isEdit ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
}
