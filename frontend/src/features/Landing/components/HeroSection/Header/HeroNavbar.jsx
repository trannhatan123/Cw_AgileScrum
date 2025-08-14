import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../Auth/AuthContext";

const LOGO = "/images/logo.png";
const ARROW_ICON = "/images/arrow-right.svg";
const ARROW_ICON_WHITE = "/images/arrow-right-white.svg";

function LoginButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="/login"
      className={`section-login-animate${hovered ? " hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
    >
      <span className="login-arrow">
        <img
          src={ARROW_ICON}
          alt="arrow right"
          style={{
            width: 26,
            height: 26,
            verticalAlign: "middle",
            display: "block",
          }}
        />
      </span>
      <span className="login-label">Login</span>
    </a>
  );
}

function ExploreButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="/explore"
      className={`section-explore-animate${hovered ? " hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
    >
      <span className="explore-arrow">
        <img
          src={ARROW_ICON_WHITE}
          alt="arrow right"
          style={{
            width: 26,
            height: 26,
            verticalAlign: "middle",
            display: "block",
          }}
        />
      </span>
      <span className="explore-label">Start exploring</span>
    </a>
  );
}

export default function HeroNavbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // Đặt class responsive cho container
  return (
    <nav className="section-navbar">
      {/* Left: Logo + Menu */}
      <div className="section-navbar-logo">
        <a href="/" className="flex items-center gap-2">
          <img src={LOGO} alt="Solar System Explorer" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 xl:w-20 xl:h-20" />
        </a>
        {/* Menu ngang (ẩn trên sm, hiện từ md) */}
        <ul className="section-navbar-menu ml-2 sm:ml-4 md:ml-8">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#planets">Planets</a>
          </li>
          <li>
            <a href="#events">Events</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
      {/* Right: Buttons group */}
      <div className="section-navbar-cta">
        {!user ? (
          <LoginButton />
        ) : (
          <button onClick={logout} className="section-btn-secondary">
            Logout
          </button>
        )}
        <ExploreButton />
        {/* Hamburger button, chỉ hiện trên sm */}
        <button
          className="md:hidden text-gray-900 focus:outline-none pointer-events-auto ml-2"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[99] bg-black/90 flex flex-col items-center justify-center md:hidden transition-all">
          <button
            className="absolute top-6 right-6 text-white text-4xl"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >×</button>
          <ul className="flex flex-col gap-8 text-white text-2xl font-bold">
            <li><a href="/" onClick={()=>setMenuOpen(false)}>Home</a></li>
            <li><a href="#planets" onClick={()=>setMenuOpen(false)}>Planets</a></li>
            <li><a href="#events" onClick={()=>setMenuOpen(false)}>Events</a></li>
            <li><a href="#about" onClick={()=>setMenuOpen(false)}>About</a></li>
            <li><a href="#contact" onClick={()=>setMenuOpen(false)}>Contact</a></li>
          </ul>
          <div className="flex flex-col gap-5 mt-12 w-4/5 max-w-xs">
            {!user ? <LoginButton /> :
              <button onClick={() => {logout();setMenuOpen(false)}} className="section-btn-secondary w-full">Logout</button>
            }
            <ExploreButton />
          </div>
        </div>
      )}
    </nav>
  );
}
