// src/features/Admin/Planets/AdminPlanetForm.jsx
import React, { useState, useEffect } from 'react';
import { createPlanet, updatePlanet, getPlanetById } from '../../../services/planetService';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdminPlanetForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    radius: '',
    mass: '',
    distanceFromSun: '',
    orbitalPeriod: '',
    rotationPeriod: '',
    averageTemperature: '',
    numOfMoons: '',
    image: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const res = await getPlanetById(id);
          const p = res.data;
          setFormData({
            name: p.name || '',
            description: p.description || '',
            radius: p.radius || '',
            mass: p.mass || '',
            distanceFromSun: p.distanceFromSun || '',
            orbitalPeriod: p.orbitalPeriod || '',
            rotationPeriod: p.rotationPeriod || '',
            averageTemperature: p.averageTemperature || '',
            numOfMoons: p.numOfMoons || '',
            image: null,
          });
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null && val !== '') data.append(key, val);
    });
    try {
      if (isEdit) await updatePlanet(id, data);
      else await createPlanet(data);
      navigate('/admin/planets');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-content">
      {/* Page header */}
      <div className="header">
        <div>
          <h1 className="text-3xl font-bold text-black">
            {isEdit ? 'Edit Planet' : 'Create Planet'}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {isEdit
              ? 'Cập nhật thông tin hành tinh'
              : 'Thêm mới một hành tinh cho hệ Mặt Trời'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin/planets')}
          className="button-secondary"
        >
          Cancel
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="form-card max-w-2xl mx-auto"
      >
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter planet name"
            className="form-input"
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter planet description"
            className="form-input h-32 resize-none"
          />
        </div>

        {/* Numeric fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['radius','mass','distanceFromSun','orbitalPeriod','rotationPeriod','averageTemperature','numOfMoons'].map(field => (
            <div className="form-group" key={field}>
              <label htmlFor={field} className="form-label">
                {field.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
              </label>
              <input
                id={field}
                name={field}
                type="number"
                step="any"
                value={formData[field]}
                onChange={handleChange}
                required
                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                className="form-input"
              />
            </div>
          ))}
        </div>

        {/* Image upload */}
        <div className="form-group">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Form actions */}
        <div className="form-actions">
          <button type="submit" className="button-primary">
            {isEdit ? 'Save Changes' : 'Create Planet'}
          </button>
        </div>
      </form>
    </div>
  );
}
