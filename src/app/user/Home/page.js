// Main Dashboard Component
'use client';

import React, { useState } from 'react';
import { Search, CreditCard,  Menu, AlertCircle } from 'lucide-react';
// import SearchForm from '@/app/components/customer/searchform';
import Analytics from '@/app/components/user/Analytics';

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-black">
      
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {/* <header className="bg-blue-500/25 border-b border-gray-950 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-200">Admin Dashboard</h1>
                <p className="text-sm text-gray-400">Welcome back!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add Credits
              </button>
            </div>
          </div>
        </header> */}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
           
          <Analytics/>
           
          </div>
        </main>
        
      </div>
    </div>
  );
};
            {/* Stats Cards */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-black rounded-xl shadow-sm border border-gray-600 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300">Total Scans</p>
                    <p className="text-3xl font-bold text-gray-200 mt-1">147</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-400/20 backdrop-blur-xs rounded-lg flex items-center justify-center">
                    <Search className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-black rounded-xl shadow-sm border border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300">Fakes Found</p>
                    <p className="text-3xl font-bold text-white mt-1">23</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100/10 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-black rounded-xl shadow-sm border border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Credits Left</p>
                    <p className="text-3xl font-bold text-white mt-1">250</p>
                  </div>
                  <div className="w-12 h-12 bg-green-200/15 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div> */}
            {/* Search Form */}
            {/* <SearchForm /> */}
            
export default HomePage;