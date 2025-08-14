// src/features/Admin/Layout/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SidebarFooter from './SidebarFooter';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '/icons/dashboard.svg' },
  { to: '/admin/planets',   label: 'Planets',   icon: '/icons/planet.svg' },
  { to: '/admin/events',    label: 'Events',    icon: '/icons/events.svg' },
  { to: '/admin/quizzes',   label: 'Quizzes',   icon: '/icons/quiz.svg' },
  { to: '/admin/users',     label: 'Users',     icon: '/icons/users.svg' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button (visible on mobile) */}
      <button
        className="md:hidden p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-[var(--color-text)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar, toggles on mobile */}
      <aside className={`${isOpen ? 'block' : 'hidden'} md:flex admin-sidebar`}>
        <div>
          <NavLink to="/admin/dashboard" className="link-logo">
            <img src="/images/earth.png" alt="Logo" className="w-8 h-8" />
            <span className="ml-2 text-2xl font-bold text-[var(--color-primary)]">SSE</span>
          </NavLink>
          <nav className="nav-items">
            <ul>
              {navItems.map(item => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `nav-item ${isActive ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text)]'}`
                    }
                  >
                    <img src={item.icon} alt={item.label} className="w-5 h-5" />
                    <span className="ml-3">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <SidebarFooter />
      </aside>
    </>
  );
}
