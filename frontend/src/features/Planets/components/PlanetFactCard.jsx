import React from 'react';
import { motion } from 'framer-motion';

export default function PlanetFactCard({ planet }) {
  return (
    <motion.figure
      whileHover={{ scale: 1.02 }}
      className="group bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
    >
      <img
        src={planet.imageUrl}
        alt={planet.name}
        loading="lazy"
        className="w-full h-48 object-cover"
      />
      <figcaption className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
          {planet.name} Facts
        </h3>
        <p className="mt-2 text-gray-600">{planet.description.slice(0, 100)}&hellip;</p>
        <a
          href={`/planets/${planet.slug}`}
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Explore {planet.name}
        </a>
      </figcaption>
    </motion.figure>
  );
}