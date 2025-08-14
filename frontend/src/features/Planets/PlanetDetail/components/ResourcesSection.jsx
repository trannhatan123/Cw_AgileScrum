// src/features/PlanetDetail/components/ResourcesSection.jsx
import React from 'react';

export default function ResourcesSection({ resources }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {resources.map((res) => (
        <div key={res.url} className="bg-white/5 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-white">{res.title}</h3>
          <p className="text-sm text-gray-300">Type: {res.type}</p>
          <a href={res.url} target="_blank" rel="noopener noreferrer" className="mt-2 block text-blue-400 underline">
            Open
          </a>
        </div>
      ))}
    </div>
  );
}