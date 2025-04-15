
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      <div className="lg:pl-64 pt-16">
        <main className="container mx-auto px-4 py-6">
          <div className="flex items-center lg:hidden mb-4">
            <MobileSidebar />
            <h1 className="text-xl font-bold ml-3">UPSELLerate</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
