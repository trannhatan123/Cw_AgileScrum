// src/features/PlanetDetail/components/GalleryPreview.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function GalleryPreview({ gallery }) {
  const { slug } = useParams();
  const preview = gallery.slice(0, 4);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {preview.map((url, idx) => (
          <img key={idx} src={url} alt={`Gallery ${idx + 1}`} className="w-full h-32 object-cover rounded-lg" />
        ))}
      </div>
      <Link to={`/planets/${slug}/gallery`} className="text-blue-400 underline">
        View full gallery
      </Link>
    </div>
  );
}