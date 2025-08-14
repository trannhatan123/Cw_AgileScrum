import React from 'react';

export default function Hero() {
  return (
    <section
      className="relative h-96 bg-cover bg-center"
      style={{ backgroundImage: 'url(/assets/planets-hero.jpg)' }}
      role="img"
      aria-label="Solar System Hero"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl font-bold">About the Planets</h1>
        <p className="mt-2 text-lg">Our solar system has eight planets and five dwarf planets.</p>
      </div>
    </section>
  );
}