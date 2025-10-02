
// import React, { useState } from 'react';
// import { Search, Home, History, FileText, CreditCard, BarChart3, Settings, LogOut, Menu, X, AlertCircle } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// // import Dashboard from './../../customer/layout';


// export default function Sidebar ({ isOpen, toggleSidebar }) {
//   const [activeItem, setActiveItem] = useState('dashboard');
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const router = useRouter();

//   const menuItems = [
//     { id: 'dashboard', icon: Home, label: 'Home', href: '/customer/Home' },
//     { id: 'search', icon: Search, label: 'Search Profiles', href: '/customer/search' },
//     { id: 'history', icon: History, label: 'Reported Profiles', href: '/customer/history' },
//     { id: 'reports', icon: FileText, label: 'Reports', href: '/customer/reports' },
//     { id: 'analytics', icon: BarChart3, label: 'Analytics', href: '/customer/Analytics' },
//     { id: 'billing', icon: CreditCard, label: 'Billing', href: '/customer/Billing' },
//     // { id: 'settings', icon: Settings, label: 'Settings', href: '/settings' },
//   ];

//   const handleNavigation = (href) => {
//     router.push(href);
//     toggleSidebar(); // close sidebar on mobile
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 z-20 lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}
      
//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed lg:static inset-y-0 left-0 z-30
//           w-68 bg-slate-900 border-r border-gray-950
//           transform transition-transform duration-300 ease-in-out
//           ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//         `}
//       >
//       <div className="flex flex-col h-full">
//         {/* Logo */}
//         <div className="flex items-center justify-between py-5 px-4 border-b border-gray-950">
//           <div className="flex items-center space-x-2">
//             {/* <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
//               <AlertCircle className="w-5 h-5 text-white" />
//             </div> */}
//             <span className="text-lg font-bold text-gray-200 pl-2">
//               Social Profile Scrapper
//             </span>
//           </div>
//           <button onClick={toggleSidebar} className="lg:hidden">
//             <X className="w-6 h-6 text-gray-600" />
//           </button>
//         </div>

//         {/* User Info */}
//         <div className="p-4  border-b border-gray-950">
//           <div className="mt-3 rounded-lg p-2">
//             <div className="flex justify-between items-center">
//               <span className="text-xs text-gray-200">Credits available</span>
//               <span className="text-sm font-bold text-green-600">$ 250</span>
//             </div>
//           </div>
//         </div>

//               {/* Navigation */}
//               <nav className="flex-1 overflow-y-auto p-4">
//                 <ul className="space-y-1">
//                   {menuItems.map((item) => {
//                     const Icon = item.icon;
//                     const isActive = activeItem === item.id;
//                     return (
//                       <li key={item.id}>
//                         <button
//                           // onClick={() => setActiveItem(item.id)}
//                           onClick={() => {
//                             setActiveItem(item.id);
//                             router.push(item.href);  // ✅ navigate to route
//                             toggleSidebar();         // close sidebar on mobile
//                           }}
//                           className={`
//                             w-full flex items-center space-x-3 px-4 py-3 rounded-lg
//                             transition-colors duration-200
//                             ${isActive 
//                               ? 'bg-blue-500/15 text-red-500' 
//                               : 'text-red-500 hover:bg-gray-800/45'
//                             }
//                           `}
//                         >
//                           <Icon className="w-5 h-5" />
//                           <span className="font-medium">{item.label}</span>
//                         </button>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </nav>

//               {/* Logout */}
//               <div className="p-4 border-t border-gray-700">
//                 <button onClick={() => {
//                     // localStorage.removeItem('token');   // clear auth token
//                     router.push('/');                   // redirect to login/home page
//                   }}
//                   className="w-full flex items-center space-x-3 px-6 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200">
//                   <LogOut className="w-5 h-5" />
//                   <span className="font-medium">Logout</span>
//                 </button>
//               </div>
//             </div>
//       </aside>
//     </>
//   );
// };

'use client';
import React, { useState } from 'react';
import { Search, Home, History, FileText, CreditCard, BarChart3, Settings, LogOut, Menu, X, AlertCircle, ChevronDown, ChevronRight, FacebookIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Sidebar ({ isOpen, toggleSidebar }) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [openDropdown, setOpenDropdown] = useState(false);
  const router = useRouter();

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Home', href: '/customer/Home' },
    { 
      id: 'search', 
      icon: Search, 
      label: 'Search Profiles', 
      href: '/customer/profiles',
      hasDropdown: true,
      dropdownItems: [
        { id: 'facebook', icon: FacebookIcon, label: 'Facebook', href: '/customer/profiles/facebook' },
        { id: 'instagram', label: 'Instagram', href: '/customer/search/instagram' },
        // { id: 'twitter', label: 'Twitter', href: '/customer/search/twitter' },
        { id: 'linkedin', label: 'LinkedIn', href: '/customer/search/linkedin' },
        // { id: 'tiktok', label: 'TikTok', href: '/customer/search/tiktok' },
      ]
    },
    { id: 'history', icon: History, label: 'Reported Profiles', href: '/customer/history' },
    { id: 'reports', icon: FileText, label: 'Reports', href: '/customer/reports' },
    // { id: 'analytics', icon: BarChart3, label: 'Analytics', href: '/customer/Analytics' },
    { id: 'billing', icon: CreditCard, label: 'Billing', href: '/customer/Billing' },
  ];

  const handleNavigation = (href, itemId) => {
    setActiveItem(itemId);
    router.push(href);
    toggleSidebar(); // close sidebar on mobile
  };

  const toggleDropdown = (itemId) => {
    if (openDropdown === itemId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(itemId);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-68 bg-slate-900 border-r border-gray-950
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between py-5 px-4 border-b border-gray-950">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-200 pl-2">
                Social Profile Scrapper
              </span>
            </div>
            <button onClick={toggleSidebar} className="lg:hidden">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-950">
            <div className="mt-3 rounded-lg p-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-200">Credits available</span>
                <span className="text-sm font-bold text-green-600">$ 250</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                const isDropdownOpen = openDropdown === item.id;
                
                return (
                  <li key={item.id}>
                    {/* Main Menu Item */}
                    <button
                      onClick={() => {
                        if (item.hasDropdown) {
                          handleNavigation(item.href, item.id); // also navigate
                          toggleDropdown(item.id);
                        } else {
                          handleNavigation(item.href, item.id);
                        }
                      }}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 rounded-lg
                        transition-colors duration-200
                        ${isActive 
                          ? 'bg-blue-500/15 text-red-500' 
                          : 'text-red-500 hover:bg-gray-800/45'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.hasDropdown && (
                        isDropdownOpen ? 
                          <ChevronDown className="w-4 h-4" /> : 
                          <ChevronRight className="w-4 h-4" />
                      )}
                    </button>

                    {/* Dropdown Items */}
                    {item.hasDropdown && isDropdownOpen && (
                      <ul className="mt-1 ml-4 space-y-1">
                        {item.dropdownItems.map((dropdownItem) => (
                          <li key={dropdownItem.id}>
                            <button
                              onClick={() => handleNavigation(dropdownItem.href, dropdownItem.id)}
                              className={`
                                w-full flex items-center space-x-3 px-4 py-2 rounded-lg
                                transition-colors duration-200 text-sm
                                ${activeItem === dropdownItem.id
                                  ? 'bg-blue-500/10 text-blue-400'
                                  : 'text-gray-400 hover:bg-gray-800/35 hover:text-gray-300'
                                }
                              `}
                            >
                              <span className="w-2 h-2 rounded-full bg-current"></span>
                              <span className="font-medium">{dropdownItem.label}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-700">
            <button 
              onClick={() => {
                router.push('/');
              }}
              className="w-full flex items-center space-x-3 px-6 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};


