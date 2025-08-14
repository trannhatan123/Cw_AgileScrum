import React from 'react';

export default function Introduction() {
  return (
    <section id="introduction" className="container mx-auto px-6 py-12" role="region" aria-labelledby="intro-heading">
      <h2 id="intro-heading" className="text-3xl font-semibold mb-4">Introduction</h2>
      <p className="text-gray-700 leading-relaxed">
        What is a planet? The term comes from the ancient Greek “planētēs,” meaning “wanderer.”
        A planet is a celestial body that orbits the Sun, is spherical due to its own gravity,
        and has cleared its orbital neighborhood.&hellip;
      </p>
      <a
        href="/planets/overview"
        className="mt-4 inline-block text-blue-600 hover:underline"
      >
        Read More
      </a>
    </section>
  );
}