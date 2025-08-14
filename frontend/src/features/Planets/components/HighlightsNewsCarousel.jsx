import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getHighlights } from '../../../services/planetService';

export default function HighlightsNewsCarousel() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getHighlights().then(res => setArticles(res.data)).catch(console.error);
  }, []);

  return (
    <div className="overflow-x-auto scrollbar-hide whitespace-nowrap py-6 px-6 bg-white">
      {articles.map(a => (
        <motion.div
          key={a.id}
          className="inline-block mr-6 w-64 rounded-xl shadow-md bg-gray-50 overflow-hidden group"
          whileHover={{ scale: 1.03 }}
        >
          <img
            src={a.thumbnailUrl}
            alt={a.title}
            className="w-full h-36 object-cover"
            loading="lazy"
          />
          <div className="p-4">
            <h4 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
              {a.title}
            </h4>
            <p className="mt-1 text-sm text-gray-500">{new Date(a.publishedAt).toLocaleDateString()}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}