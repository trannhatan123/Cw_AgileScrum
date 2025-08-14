// src/components/ui/Navbar.jsx
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../features/Auth/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar pointer-events-auto">
      <div className="inner padding-x flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="logo">
          Solar System Explorer
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-8">
          <Link to="/" className="text-white-50 hover:text-white transition-colors duration-300">
            Home
          </Link>
          <Link to="/planets" className="text-white-50 hover:text-white transition-colors duration-300">
            Planets
          </Link>
          <Link to="/events" className="text-white-50 hover:text-white transition-colors duration-300">
            Events
          </Link>
          {!user ? (
            <>
              <Link to="/login" className="text-white-50 hover:text-white transition-colors duration-300">
                Login
              </Link>
              <Link to="/register" className="text-white-50 hover:text-white transition-colors duration-300">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-white-50 hover:text-white transition-colors duration-300 focus:outline-none"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Links */}
      {mobileOpen && (
        <div className="lg:hidden bg-black-100 text-center py-4">
          <Link
            to="/"
            className="block py-2 text-white-50 hover:text-white transition-colors duration-300"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/planets"
            className="block py-2 text-white-50 hover:text-white transition-colors duration-300"
            onClick={() => setMobileOpen(false)}
          >
            Planets
          </Link>
          <Link
            to="/events"
            className="block py-2 text-white-50 hover:text-white transition-colors duration-300"
            onClick={() => setMobileOpen(false)}
          >
            Events
          </Link>
          {!user ? (
            <>
              <Link
                to="/login"
                className="block py-2 text-white-50 hover:text-white transition-colors duration-300"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block py-2 text-white-50 hover:text-white transition-colors duration-300"
                onClick={() => setMobileOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="w-full py-2 text-white-50 hover:text-white transition-colors duration-300 focus:outline-none"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
