// // src/app/admin/layout.js

'use client';
import React, { useState } from 'react';
import Sidebar from '../components/shared/sidebar';
import { useRouter } from 'next/navigation';
import Header from '../components/shared/header';
// import { StatsProvider } from '../contexts/Statscontext';
// import { AuthProvider } from '../contexts/authContext';


export default function Dashboard({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const router = useRouter();

  // const user = {
  //   name: 'testadmin',
  //   avatar: 'https://i.pravatar.cc/150?img=3', // demo avatar

  // };

  const handleLogout = () => {
    // TODO: hook up to auth/logout logic
    console.log('Logging out...');
    localStorage.removeItem('userId');
    router.push('/');
  };


  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
       {/* Sidebar (sticky on large screens, drawer on small screens) */}
       {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
       {/* Main content area */}
       <div className="flex-1 flex flex-col overflow-hidden">
         {/* Header with logout */}
          <Header
           onMenuClick={() => setSidebarOpen(!sidebarOpen)}
           title="Admin Dashboard"
          //  user={user}
           onLogout={handleLogout}   // ✅ passing logout function
        />


         {/* Scrollable content area */}
         <main className="flex-1 overflow-y-auto">
            {children}

           {/* <StatsProvider>
           {children}
           </StatsProvider> */}
         </main>
       </div>
     </div>
   );
}



