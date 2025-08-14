// src/features/Admin/Layout/SidebarFooter.jsx
import React from 'react';

export default function SidebarFooter() {
  return (
    <div className="nav-footer flex items-center justify-between p-4 border-t border-[var(--color-border)]">
      <div className="flex items-center gap-3">
        <img
          src="/assets/images/admin-avatar.png"
          alt="Admin Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="text-sm font-semibold text-[var(--color-text)] truncate">Adrian Hajdin</h2>
          <p className="text-xs text-[var(--color-text-muted)] truncate">adrian@site.com</p>
        </div>
      </div>
      <img
        src="/icons/logout.svg"
        alt="Logout Icon"
        className="w-8 h-8 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
      />
    </div>
  );
}
