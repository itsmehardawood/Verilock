
// 'use client';
// import React, { useState } from 'react';
// import { Search, Home, History, FileText, CreditCard, BarChart3, Settings, LogOut, Menu, X, AlertCircle, ChevronDown, ChevronRight, FacebookIcon } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import {FaFacebook, FaInstagram} from "react-icons/fa";
// export default function Sidebar ({ isOpen, toggleSidebar }) {
//   const [activeItem, setActiveItem] = useState('dashboard');
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const router = useRouter();

//   const menuItems = [
//     { id: 'dashboard', icon: Home, label: 'Home', href: '/user/Home' },
//     { 
//       id: 'search', 
//       icon: Search, 
//       label: 'Search Profiles', 
//       href: '/user/profiles',
//       hasDropdown: true,
//       dropdownItems: [
//         { id: 'facebook', icon: <FaFacebook/>, label: 'Facebook', href: '/user/profiles/facebook' },
//         { id: 'instagram', icon: <FaInstagram/>, label:'Instagram' , href: '/user/search/instagram' },
//         // { id: 'twitter', label: 'Twitter', href: '/user/search/twitter' },
//         { id: 'linkedin', label: 'LinkedIn', href: '/user/search/linkedin' },
//         // { id: 'tiktok', label: 'TikTok', href: '/user/search/tiktok' },
//       ]
//     },
//     { id: 'history', icon: History, label: 'Reported Profiles', href: '/user/history' },
//     { id: 'reports', icon: FileText, label: 'Reports', href: '/user/reports' },
//     // { id: 'analytics', icon: BarChart3, label: 'Analytics', href: '/user/Analytics' },
//     { id: 'billing', icon: CreditCard, label: 'Billing', href: '/user/Billing' },
//   ];

//   const handleNavigation = (href, itemId) => {
//     setActiveItem(itemId);
//     router.push(href);
//     toggleSidebar(); // close sidebar on mobile
//   };

//   const toggleDropdown = (itemId) => {
//     if (openDropdown === itemId) {
//       setOpenDropdown(null);
//     } else {
//       setOpenDropdown(itemId);
//     }
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
//         <div className="flex flex-col h-full">
//           {/* Logo */}
//           <div className="flex items-center justify-between py-5 px-4 border-b border-gray-950">
//             <div className="flex items-center space-x-2">
//               <span className="text-lg font-bold text-gray-200 pl-2">
//                 Social Profile Scrapper
//               </span>
//             </div>
//             <button onClick={toggleSidebar} className="lg:hidden">
//               <X className="w-6 h-6 text-gray-600" />
//             </button>
//           </div>

//           {/* User Info */}
//           <div className="p-4 border-b border-gray-950">
//             <div className="mt-3 rounded-lg p-2">
//               <div className="flex justify-between items-center">
//                 <span className="text-xs text-gray-200">Balance Remaining</span>
//                 <span className="text-sm font-bold text-green-600">$ 250</span>
//               </div>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 overflow-y-auto p-4">
//             <ul className="space-y-1">
//               {menuItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = activeItem === item.id;
//                 const isDropdownOpen = openDropdown === item.id;
                
//                 return (
//                   <li key={item.id}>
//                     {/* Main Menu Item */}
//                     <button
//                       onClick={() => {
//                         if (item.hasDropdown) {
//                           handleNavigation(item.href, item.id); // also navigate
//                           toggleDropdown(item.id);
//                         } else {
//                           handleNavigation(item.href, item.id);
//                         }
//                       }}
//                       className={`
//                         w-full flex items-center justify-between px-4 py-3 rounded-lg
//                         transition-colors duration-200
//                         ${isActive 
//                           ? 'bg-blue-500/15 text-red-500' 
//                           : 'text-red-500 hover:bg-gray-800/45'
//                         }
//                       `}
//                     >
//                       <div className="flex items-center space-x-3">
//                         <Icon className="w-5 h-5" />
//                         <span className="font-medium">{item.label}</span>
//                       </div>
//                       {item.hasDropdown && (
//                         isDropdownOpen ? 
//                           <ChevronDown className="w-4 h-4" /> : 
//                           <ChevronRight className="w-4 h-4" />
//                       )}
//                     </button>

//                     {/* Dropdown Items */}
//                     {item.hasDropdown && isDropdownOpen && (
//                       <ul className="mt-1 ml-4 space-y-1">
//                         {item.dropdownItems.map((dropdownItem) => (
//                           <li key={dropdownItem.id}>
//                             <button
//                               onClick={() => handleNavigation(dropdownItem.href, dropdownItem.id)}
//                               className={`
//                                 w-full flex items-center space-x-3 px-4 py-2 rounded-lg
//                                 transition-colors duration-200 text-sm
//                                 ${activeItem === dropdownItem.id
//                                   ? 'bg-blue-500/10 text-blue-400'
//                                   : 'text-gray-400 hover:bg-gray-800/35 hover:text-gray-300'
//                                 }
//                               `}
//                             >
//                               <span className="w-2 h-2 rounded-full bg-current"></span>
//                               <span className="font-medium">{dropdownItem.label}</span>
//                             </button>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                 );
//               })}
//             </ul>
//           </nav>

//           {/* Logout */}
//           <div className="p-4 border-t border-gray-700">
//             <button 
//               onClick={() => {
//                 router.push('/');
//               }}
//               className="w-full flex items-center space-x-3 px-6 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200"
//             >
//               <LogOut className="w-5 h-5" />
//               <span className="font-medium">Logout</span>
//             </button>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };


'use client';
import React, { useState } from 'react';
import { Search, Home, History, FileText, CreditCard, LogOut, X } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const router = useRouter();

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Home', href: '/user/Home' },
    {
      id: 'search',
      icon: Search,
      label: 'Social media channels',
      children: [
        { id: 'facebook', icon: <FaFacebook className="text-white font-medium" />, label: 'Facebook Channel', href: '/user/profiles/facebook' },
        { id: 'instagram', icon: <FaInstagram className="text-white font-semibold" />, label: 'Instagram Channel', href: '/user/profiles/instagram' },
        { id: 'x', icon: <FaTwitter className="text-white" />, label: 'Twitter(X) Channel', href: '/user/profiles/Twitter' },
        { id: 'linkedin', icon: <FaLinkedin className="text-white" />, label: 'LinkedIn Channel', href: '/user/profiles/linkedIn' },
        { id: 'tiktok', icon: <FaTiktok className="text-white" />, label: 'Tiktok Channel', href: '/user/profiles/Tiktok' },
      ]
    },
    { id: 'history', icon: History, label: 'Takedown Profiles', href: '/user/history' },
    { id: 'reports', icon: FileText, label: 'Reports', href: '/user/reports' },
    { id: 'billing', icon: CreditCard, label: 'Payment Management', href: '/user/Billing' },
  ];

  const handleNavigation = (href, id) => {
    setActiveItem(id);
    router.push(href);
    toggleSidebar();
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
          w-72 bg-slate-900 border-r border-gray-950
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between py-5 px-4 border-b border-gray-700">
            <span className="text-lg font-bold text-gray-200 pl-2">
              Verilock
            </span>
            <button onClick={toggleSidebar} className="lg:hidden">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          <div className="p-4 border-b border-gray-600">
  <div className="mt-3 rounded-lg p-2">
    <div
      className="flex justify-between items-center rounded-2xl p-3
                 bg-gray-400/10 backdrop-blur-md border border-white/10 
                 shadow-md hover:bg-gray-400/20 transition-colors"
    >
      <span className="text-md text-white font-medium">Balance Remaining</span>
      <span className="text-sm font-bold text-gray-200">$250</span>
    </div>
  </div>
</div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  {/* Main Item */}
                  <button
                    onClick={() => !item.children && handleNavigation(item.href, item.id)}
                    className={`
                      w-full flex font-semibold items-center space-x-3 px-4 py-3 rounded-lg
                      transition-colors duration-200
                      ${activeItem === item.id ? 'bg-blue-500/15 text-red-500' : 'text-white hover:bg-gray-600/45'}
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-semibold">{item.label}</span>
                  </button>

                  {/* Submenu (if exists) */}
                  {item.children && (
                    <ul className="ml-1 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <button
                            onClick={() => handleNavigation(child.href, child.id)}
                            className={`
                              w-full flex font-semibold items-center space-x-2 px-4 py-3 rounded-lg text-md
                              ${activeItem === child.id ? 'bg-blue-500/10 text-red-500' : 'text-gray-300 hover:bg-gray-700/35'}
                            `}
                          >
                            {child.icon}
                            <span>{child.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-700">
            <button 
              onClick={() => router.push('/')}
              className="w-full flex items-center space-x-3 px-6 py-3 rounded-lg text-red-500 hover:bg-slate-700 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
