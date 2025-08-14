import React from 'react';
import { motion } from 'framer-motion';

export default function HighlightsCarousel({ items }) {
  return (
    <div className="overflow-x-auto scrollbar-hide whitespace-nowrap py-6 px-6 bg-gray-50">
      {items.map(item => (
        <motion.div
          key={item._id}
          className="inline-block mr-6 w-60 rounded-xl shadow-lg bg-white overflow-hidden group transition-transform duration-200 ease-out"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-40 object-cover"
            loading="lazy"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">Learn more &rarr;</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}