// src/features/PlanetDetail/components/NewsFeed.jsx
import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';

export default function NewsFeed({ news }) {
  return (
    <div className="space-y-4">
      {news.map((item) => (
        <div key={item.url} className="bg-white/5 p-4 rounded-lg">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-white">
            {item.title}
          </a>
          <p className="text-sm text-gray-300">
            {formatDistanceToNow(parseISO(item.publishedAt), { addSuffix: true })}
          </p>
          {item.summary && <p className="mt-2 text-white">{item.summary}</p>}
        </div>
      ))}
    </div>
  );
}