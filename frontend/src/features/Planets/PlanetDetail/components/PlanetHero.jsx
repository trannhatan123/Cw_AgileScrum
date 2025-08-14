import React from 'react';

export default function PlanetHero({ planet }) {
  return (
    <div className="relative h-64 md:h-96 overflow-hidden rounded-2xl mb-6">
      <img
        src={planet.imageUrl}
        alt={planet.name}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-4xl md:text-6xl text-white font-bold">{planet.name}</h1>
        {planet.description && (
          <p className="mt-2 text-white max-w-xl">
            {planet.description}
          </p>
        )}
      </div>
    </div>
  );
}