import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';



export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar luôn hiện trên đầu */}
      
      {/* Phần content sẽ được render ở đây */}
      <div className="flex-grow pt-16">
        {/* Nếu Navbar dùng position: fixed, cần thêm pt-16 (4rem) để tránh che lấp */}
        
        <Outlet />
      </div>

      {/* Footer xuất hiện cuối trang */}
      
    </div>
  );
}
