import React from 'react';
import { Link } from 'react-router-dom';

export default function HeaderWithBreadcrumb({ crumbs }) {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex items-center text-sm text-gray-600">
        {crumbs.map((crumb, idx) => (
          <span key={idx} className="flex items-center">
            {idx > 0 && <span className="mx-2 text-gray-400">/</span>}
            {crumb.to ? (
              <Link
                to={crumb.to}
                className="hover:text-blue-600 hover:underline transition-colors duration-150"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-800">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>
    </header>
  );
}