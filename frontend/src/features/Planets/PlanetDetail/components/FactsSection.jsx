// src/features/PlanetDetail/components/FactsSection.jsx
import React from 'react';

export default function FactsSection({ stats }) {
  const items = [
    { label: 'Radius (km)', value: stats.radius },
    { label: 'Mass (10^24 kg)', value: stats.mass },
    { label: 'Distance from Sun (10^6 km)', value: stats.distanceFromSun },
    { label: 'Orbital Period (days)', value: stats.orbitalPeriod },
    { label: 'Rotation Period (hours)', value: stats.rotationPeriod },
    { label: 'Avg. Temp (°C)', value: stats.averageTemperature },
    { label: 'Number of Moons', value: stats.numOfMoons },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(({ label, value }) => (
        <div key={label} className="bg-white/10 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-white">{label}</h3>
          <p className="mt-2 text-2xl font-bold text-white">{value}</p>
        </div>
      ))}
    </div>
  );
}