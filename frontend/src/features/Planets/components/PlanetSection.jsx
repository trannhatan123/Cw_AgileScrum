import React from 'react';
import PlanetFactCard from './PlanetFactCard';

export default function PlanetSection({ id, title, items, onSelect }) {
  return (
    <section id={id} className="mb-12" role="region" aria-labelledby={`${id}-heading`}>
      <h3 id={`${id}-heading`} className="text-2xl font-semibold mb-6">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(planet => (
          <PlanetFactCard
            key={planet._id}
            planet={planet}
            onClick={() => onSelect(planet.slug)}
          />
        ))}
      </div>
    </section>
  );
}
