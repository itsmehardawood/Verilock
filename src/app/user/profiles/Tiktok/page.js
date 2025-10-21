'use client';
import StatsCard from '@/app/components/shared/StatsCard';
import TikTokProfile from '@/app/components/user/tiktokProfile';
import { useStats } from '@/app/hooks/useStats';
// import Facebook from '@/app/components/user/search_Profile'
import { AlertCircle, CreditCard, EyeOffIcon, Menu, Search } from 'lucide-react'
import React, { useState } from 'react'

export default function TikTokPage  () {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { stats, incrementStat, updateStat } = useStats('tiktok');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
    // Function to update when profiles are detected (call this when search returns results)
  const updateProfilesDetected = (count) => {
    updateStat('profilesDetected', count);
  };


  return (
    
    <div className="flex h-screen bg-black">
      
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
       

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
           {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {/* <div className="bg-black rounded-xl shadow-sm border border-gray-600 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300">Total Profiles detected</p>
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
                    <p className="text-sm text-gray-300">Total Takedown requests</p>
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
                    <p className="text-sm text-gray-400">Total pending</p>
                    <p className="text-3xl font-bold text-white mt-1">250</p>
                  </div>
                  <div className="w-12 h-12 bg-green-200/15 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-black rounded-xl shadow-sm border border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Ignored</p>
                    <p className="text-3xl font-bold text-white mt-1">250</p>
                  </div>
                  <div className="w-12 h-12 bg-green-200/15 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </div> */}
               <StatsCard
                title="Total Profiles detected"
                value={stats.profilesDetected}
                icon={Search}
                iconBgColor="bg-blue-400/20"
                iconColor="text-blue-600"
              />
              
              <StatsCard
                title="Total Takedown requests"
                value={stats.takedownRequests}
                icon={AlertCircle}
                iconBgColor="bg-red-100/10"
                iconColor="text-red-600"
              />
              
              <StatsCard
                title="Total pending"
                value={stats.pending}
                icon={CreditCard}
                iconBgColor="bg-green-200/15"
                iconColor="text-yellow-600"
              />

              <StatsCard
                title="Total Ignored"
                value={stats.ignored}
                icon={EyeOffIcon}
                iconBgColor="bg-green-200/15"
                iconColor="text-gray-600"
              />
            </div>
          <div >
          <TikTokProfile
          onProfilesDetected={updateProfilesDetected}
                onTakedownRequest={() => incrementStat('takedownRequests')}
                onPending={() => incrementStat('pending')}
                onIgnored={() => incrementStat('ignored')}
          
          />
          </div>
        </div>
        </main>
        
      </div>
    </div>
  )
}

