
/* features/admin/layout/AdminHeader.jsx */
import React from 'react';

export default function AdminHeader() {
  return (
    <header className="header px-6 py-4 border-b border-light-100 bg-white">
      <article>
        <h1 className="p-30-bold">
          Welcome, Adrian <span role="img" aria-label="wave">👋</span>
        </h1>
        <p className="p-18-regular text-gray-500">
          Track activity, trends, and popular destinations in real time
        </p>
      </article>
      <button className="button-class">+ Create a trip</button>
    </header>
  );
}
