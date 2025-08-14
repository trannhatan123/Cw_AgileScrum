import React, { useState } from 'react';

export default function StickySidebar({ planets }) {
  const [open, setOpen] = useState(false);
  return (
    <aside
      role="complementary"
      aria-label="Explore This Section"
      className="sticky top-20 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      <h4 className="mb-4 text-base font-semibold text-gray-700">Explore This Section</h4>
      <ul role="list" className="space-y-2">
        <li role="listitem"><a href="#overview" className="text-gray-600 hover:text-blue-600">Overview</a></li>
        <li role="listitem"><a href="#introduction" className="text-gray-600 hover:text-blue-600">What is a Planet?</a></li>
        <li role="listitem">
          <button
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="w-full text-left text-gray-600 hover:text-blue-600 flex justify-between items-center"
          >
            All Planets
            <span className="ml-2">{open ? '−' : '+'}</span>
          </button>
          {open && (
            <ul role="list" className="mt-2 ml-4 space-y-1">
              {planets.map(p => (
                <li key={p.slug} role="listitem">
                  <a href={`#${p.slug}`} className="text-gray-600 hover:text-blue-600">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}