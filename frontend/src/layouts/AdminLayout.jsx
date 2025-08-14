/* features/admin/layout/AdminLayout.jsx */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../features/Admin/Layout/Sidebar'
import '../features/Admin/Layout/adminLayout.css'
export default function AdminLayout() {
  return (
    <div className="admin-layout flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
