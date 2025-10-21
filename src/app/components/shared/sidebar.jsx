
// // 'use client';
// // import React, { useState } from 'react';
// // import { Search, Home, History, FileText, CreditCard, BarChart3, Settings, LogOut, Menu, X, AlertCircle, ChevronDown, ChevronRight, FacebookIcon } from 'lucide-react';
// // import { useRouter } from 'next/navigation';
// // import {FaFacebook, FaInstagram} from "react-icons/fa";
// // export default function Sidebar ({ isOpen, toggleSidebar }) {
// //   const [activeItem, setActiveItem] = useState('dashboard');
// //   const [openDropdown, setOpenDropdown] = useState(false);
// //   const router = useRouter();

// //   const menuItems = [
// //     { id: 'dashboard', icon: Home, label: 'Home', href: '/user/Home' },
// //     { 
// //       id: 'search', 
// //       icon: Search, 
// //       label: 'Search Profiles', 
// //       href: '/user/profiles',
// //       hasDropdown: true,
// //       dropdownItems: [
// //         { id: 'facebook', icon: <FaFacebook/>, label: 'Facebook', href: '/user/profiles/facebook' },
// //         { id: 'instagram', icon: <FaInstagram/>, label:'Instagram' , href: '/user/search/instagram' },
// //         // { id: 'twitter', label: 'Twitter', href: '/user/search/twitter' },
// //         { id: 'linkedin', label: 'LinkedIn', href: '/user/search/linkedin' },
// //         // { id: 'tiktok', label: 'TikTok', href: '/user/search/tiktok' },
// //       ]
// //     },
// //     { id: 'history', icon: History, label: 'Reported Profiles', href: '/user/history' },
// //     { id: 'reports', icon: FileText, label: 'Reports', href: '/user/reports' },
// //     // { id: 'analytics', icon: BarChart3, label: 'Analytics', href: '/user/Analytics' },
// //     { id: 'billing', icon: CreditCard, label: 'Billing', href: '/user/Billing' },
// //   ];

// //   const handleNavigation = (href, itemId) => {
// //     setActiveItem(itemId);
// //     router.push(href);
// //     toggleSidebar(); // close sidebar on mobile
// //   };

// //   const toggleDropdown = (itemId) => {
// //     if (openDropdown === itemId) {
// //       setOpenDropdown(null);
// //     } else {
// //       setOpenDropdown(itemId);
// //     }
// //   };

// //   return (
// //     <>
// //       {/* Mobile Overlay */}
// //       {isOpen && (
// //         <div 
// //           className="fixed inset-0 z-20 lg:hidden"
// //           onClick={toggleSidebar}
// //         />
// //       )}
      
// //       {/* Sidebar */}
// //       <aside
// //         className={`
// //           fixed lg:static inset-y-0 left-0 z-30
// //           w-68 bg-slate-900 border-r border-gray-950
// //           transform transition-transform duration-300 ease-in-out
// //           ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
// //         `}
// //       >
// //         <div className="flex flex-col h-full">
// //           {/* Logo */}
// //           <div className="flex items-center justify-between py-5 px-4 border-b border-gray-950">
// //             <div className="flex items-center space-x-2">
// //               <span className="text-lg font-bold text-gray-200 pl-2">
// //                 Social Profile Scrapper
// //               </span>
// //             </div>
// //             <button onClick={toggleSidebar} className="lg:hidden">
// //               <X className="w-6 h-6 text-gray-600" />
// //             </button>
// //           </div>

// //           {/* User Info */}
// //           <div className="p-4 border-b border-gray-950">
// //             <div className="mt-3 rounded-lg p-2">
// //               <div className="flex justify-between items-center">
// //                 <span className="text-xs text-gray-200">Balance Remaining</span>
// //                 <span className="text-sm font-bold text-green-600">$ 250</span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Navigation */}
// //           <nav className="flex-1 overflow-y-auto p-4">
// //             <ul className="space-y-1">
// //               {menuItems.map((item) => {
// //                 const Icon = item.icon;
// //                 const isActive = activeItem === item.id;
// //                 const isDropdownOpen = openDropdown === item.id;
                
// //                 return (
// //                   <li key={item.id}>
// //                     {/* Main Menu Item */}
// //                     <button
// //                       onClick={() => {
// //                         if (item.hasDropdown) {
// //                           handleNavigation(item.href, item.id); // also navigate
// //                           toggleDropdown(item.id);
// //                         } else {
// //                           handleNavigation(item.href, item.id);
// //                         }
// //                       }}
// //                       className={`
// //                         w-full flex items-center justify-between px-4 py-3 rounded-lg
// //                         transition-colors duration-200
// //                         ${isActive 
// //                           ? 'bg-blue-500/15 text-red-500' 
// //                           : 'text-red-500 hover:bg-gray-800/45'
// //                         }
// //                       `}
// //                     >
// //                       <div className="flex items-center space-x-3">
// //                         <Icon className="w-5 h-5" />
// //                         <span className="font-medium">{item.label}</span>
// //                       </div>
// //                       {item.hasDropdown && (
// //                         isDropdownOpen ? 
// //                           <ChevronDown className="w-4 h-4" /> : 
// //                           <ChevronRight className="w-4 h-4" />
// //                       )}
// //                     </button>

// //                     {/* Dropdown Items */}
// //                     {item.hasDropdown && isDropdownOpen && (
// //                       <ul className="mt-1 ml-4 space-y-1">
// //                         {item.dropdownItems.map((dropdownItem) => (
// //                           <li key={dropdownItem.id}>
// //                             <button
// //                               onClick={() => handleNavigation(dropdownItem.href, dropdownItem.id)}
// //                               className={`
// //                                 w-full flex items-center space-x-3 px-4 py-2 rounded-lg
// //                                 transition-colors duration-200 text-sm
// //                                 ${activeItem === dropdownItem.id
// //                                   ? 'bg-blue-500/10 text-blue-400'
// //                                   : 'text-gray-400 hover:bg-gray-800/35 hover:text-gray-300'
// //                                 }
// //                               `}
// //                             >
// //                               <span className="w-2 h-2 rounded-full bg-current"></span>
// //                               <span className="font-medium">{dropdownItem.label}</span>
// //                             </button>
// //                           </li>
// //                         ))}
// //                       </ul>
// //                     )}
// //                   </li>
// //                 );
// //               })}
// //             </ul>
// //           </nav>

// //           {/* Logout */}
// //           <div className="p-4 border-t border-gray-700">
// //             <button 
// //               onClick={() => {
// //                 router.push('/');
// //               }}
// //               className="w-full flex items-center space-x-3 px-6 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200"
// //             >
// //               <LogOut className="w-5 h-5" />
// //               <span className="font-medium">Logout</span>
// //             </button>
// //           </div>
// //         </div>
// //       </aside>
// //     </>
// //   );
// // };


// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Home, Search, History, FileText, CreditCard, LogOut, X, Archive } from 'lucide-react';
// import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaTiktok } from 'react-icons/fa';
// import { useBalance } from '@/app/hooks/usebalance';

// export default function Sidebar({ isOpen, toggleSidebar }) {
//   const [activeItem, setActiveItem] = useState('dashboard');
//   const router = useRouter();
  
//   // Use balance hook to get current balance
//   const { balance, isLoading: balanceLoading } = useBalance(250);

//   const menuItems = [
//     { id: 'dashboard', icon: Home, label: 'Home', href: '/user/Home' },
//     {
//       id: 'search',
//       icon: Search,
//       label: 'Social media channels',
//       children: [
//         { id: 'facebook', icon: <FaFacebook className="text-white font-medium" />, label: 'Facebook Channel', href: '/user/profiles/facebook' },
//         { id: 'instagram', icon: <FaInstagram className="text-white font-semibold" />, label: 'Instagram Channel', href: '/user/profiles/instagram' },
//         { id: 'x', icon: <FaTwitter className="text-white" />, label: 'Twitter(X) Channel', href: '/user/profiles/Twitter' },
//         // { id: 'linkedin', icon: <FaLinkedin className="text-white" />, label: 'LinkedIn Channel', href: '/user/profiles/linkedIn' },
//         { id: 'tiktok', icon: <FaTiktok className="text-white" />, label: 'Tiktok Channel', href: '/user/profiles/Tiktok' },
//       ]
//     },
//     { id: 'history', icon: History, label: 'Takedown Profiles', href: '/user/history' },
//     { id: 'Reviewlater', icon: Archive, label: 'Review Later', href: '/user/reviewlater' },
//     // { id: 'reports', icon: FileText, label: 'Reports', href: '/user/reports' },
//     { id: 'billing', icon: CreditCard, label: 'Payment Management', href: '/user/Billing' },
//   ];

//   const handleNavigation = (href, id) => {
//     setActiveItem(id);
//     router.push(href);
//     toggleSidebar();
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
//           w-72 bg-slate-900 border-r border-gray-950
//           transform transition-transform duration-300 ease-in-out
//           ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//         `}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo */}
//           <div className="flex items-center justify-between py-5 px-4 border-b border-gray-700">
//             <span className="text-lg font-bold text-gray-200 pl-2">
//               Verilock
//             </span>
//             <button onClick={toggleSidebar} className="lg:hidden">
//               <X className="w-6 h-6 text-gray-500" />
//             </button>
//           </div>
          
//           {/* Balance Display */}
//           <div className="p-4 border-b border-gray-600">
//             <div className="mt-3 rounded-lg p-2">
//               <div
//                 className="flex justify-between items-center rounded-2xl p-3
//                            bg-gray-400/10 backdrop-blur-md border border-white/10 
//                            shadow-md hover:bg-gray-400/20 transition-colors"
//               >
//                 <span className="text-md text-white font-medium">Balance Remaining</span>
//                 <div className="flex items-center space-x-2">
//                   {balanceLoading ? (
//                     <div className="flex items-center space-x-2">
//                       <div className="w-3 h-3 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
//                       <span className="text-sm text-gray-300">Loading...</span>
//                     </div>
//                   ) : (
//                     <>
//                       <span className="text-sm font-bold text-gray-200">
//                         ${balance} {balance !== 1 ? 's' : ''}
//                       </span>
//                       {balance === 0 && (
//                         <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" title="Low balance"></div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
              
//               {/* Low Balance Warning */}
//               {balance <= 10 && balance > 0 && !balanceLoading && (
//                 <div className="mt-2 p-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
//                   <p className="text-xs text-yellow-300 text-center">
//                     Low balance! Only {balance} credit{balance !== 1 ? 's' : ''} remaining
//                   </p>
//                 </div>
//               )}
              
//               {/* Zero Balance Warning */}
//               {balance === 0 && !balanceLoading && (
//                 <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded-lg">
//                   <p className="text-xs text-red-300 text-center">
//                     No credits remaining. Please add credits to continue searching.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 overflow-y-auto p-4">
//             <ul className="space-y-2">
//               {menuItems.map((item) => (
//                 <li key={item.id}>
//                   {/* Main Item */}
//                   <button
//                     onClick={() => !item.children && handleNavigation(item.href, item.id)}
//                     className={`
//                       w-full flex font-semibold items-center space-x-3 px-4 py-3 rounded-lg
//                       transition-colors duration-200
//                       ${activeItem === item.id ? 'bg-blue-500/15 text-red-500' : 'text-white hover:bg-gray-600/45'}
//                     `}
//                   >
//                     <item.icon className="w-5 h-5" />
//                     <span className="font-semibold">{item.label}</span>
//                   </button>

//                   {/* Submenu (if exists) */}
//                   {item.children && (
//                     <ul className="ml-1 mt-2 space-y-1">
//                       {item.children.map((child) => (
//                         <li key={child.id}>
//                           <button
//                             onClick={() => handleNavigation(child.href, child.id)}
//                             className={`
//                               w-full flex font-semibold items-center space-x-2 px-4 py-3 rounded-lg text-md
//                               ${activeItem === child.id ? 'bg-blue-500/10 text-red-500' : 'text-gray-300 hover:bg-gray-700/35'}
//                             `}
//                           >
//                             {child.icon}
//                             <span>{child.label}</span>
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Logout */}
//           <div className="p-4 border-t border-gray-700">
//             <button 
//               onClick={() => router.push('/')}
//               className="w-full flex items-center space-x-3 px-6 py-3 rounded-lg text-red-500 hover:bg-slate-700 transition-colors duration-200"
//             >
//               <LogOut className="w-5 h-5" />
//               <span className="font-medium">Logout</span>
//             </button>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Search, History, FileText, CreditCard, LogOut, X, Archive } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaTiktok } from 'react-icons/fa';
import { useBalance } from '@/app/hooks/usebalance';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  
  // Use balance hook to get current balance
  const { balance, isLoading: balanceLoading } = useBalance(250);

  // Get user info from localStorage on component mount
  useEffect(() => {
    const getUserInfo = () => {
      try {
        if (typeof window !== 'undefined') {
          // Read from "userData" as stored in your login page
          const userData = localStorage.getItem('userData');
          console.log('Retrieved userData from localStorage:', userData);
          
          if (userData) {
            const parsedUser = JSON.parse(userData);
            setUserInfo(parsedUser);
            console.log('Parsed user info:', parsedUser);
          } else {
            console.log('No userData found in localStorage');
            
            // Fallback: Check if user info is stored as "user" (for backward compatibility)
            const fallbackUserData = localStorage.getItem('user');
            if (fallbackUserData) {
              const parsedUser = JSON.parse(fallbackUserData);
              setUserInfo(parsedUser);
              console.log('Found fallback user data:', parsedUser);
            }
          }
        }
      } catch (error) {
        console.error('Error getting user info from localStorage:', error);
      }
    };

    getUserInfo();
  }, []);

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
        // { id: 'linkedin', icon: <FaLinkedin className="text-white" />, label: 'LinkedIn Channel', href: '/user/profiles/linkedIn' },
        { id: 'tiktok', icon: <FaTiktok className="text-white" />, label: 'Tiktok Channel', href: '/user/profiles/Tiktok' },
      ]
    },
    { id: 'history', icon: History, label: 'Takedown Profiles', href: '/user/history' },
    { id: 'Reviewlater', icon: Archive, label: 'Review Later', href: '/user/reviewlater' },
    // { id: 'reports', icon: FileText, label: 'Reports', href: '/user/reports' },
    { id: 'billing', icon: CreditCard, label: 'Payment Management', href: '/user/Billing' },
  ];

  const handleNavigation = (href, id) => {
    setActiveItem(id);
    router.push(href);
    toggleSidebar();
  };

  const handleLogout = () => {
    // Clear all user data from localStorage (matching your login page storage)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userData');
      localStorage.removeItem('userId');
      localStorage.removeItem('user_id');
      localStorage.removeItem('role');
      localStorage.removeItem('user'); // for backward compatibility
      localStorage.removeItem('token');
    }
    router.push('/');
  };

  // Get first letter of email for avatar
  const getAvatarLetter = () => {
    if (!userInfo?.email) return 'U';
    return userInfo.email.charAt(0).toUpperCase();
  };

  // Format role for display
  const formatRole = (role) => {
    if (!role) return 'User';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  // Get display email
  const getDisplayEmail = () => {
    if (!userInfo?.email) return 'Not available';
    return userInfo.email;
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
          
          {/* Balance Display */}
          <div className="p-4 border-b border-gray-600">
            <div className="mt-3 rounded-lg p-2">
              <div
                className="flex justify-between items-center rounded-2xl p-3
                           bg-gray-400/10 backdrop-blur-md border border-white/10 
                           shadow-md hover:bg-gray-400/20 transition-colors"
              >
                <span className="text-md text-white font-medium">Balance Remaining</span>
                <div className="flex items-center space-x-2">
                  {balanceLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm text-gray-300">Loading...</span>
                    </div>
                  ) : (
                    <>
                      <span className="text-sm font-bold text-gray-200">
                        ${balance} {balance !== 1 ? 's' : ''}
                      </span>
                      {balance === 0 && (
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" title="Low balance"></div>
                      )}
                    </>
                  )}
                </div>
              </div>
              
              {/* Low Balance Warning */}
              {balance <= 10 && balance > 0 && !balanceLoading && (
                <div className="mt-2 p-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                  <p className="text-xs text-yellow-300 text-center">
                    Low balance! Only {balance} credit{balance !== 1 ? 's' : ''} remaining
                  </p>
                </div>
              )}
              
              {/* Zero Balance Warning */}
              {balance === 0 && !balanceLoading && (
                <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-xs text-red-300 text-center">
                    No credits remaining. Please add credits to continue searching.
                  </p>
                </div>
              )}
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

          {/* User Info Section - Replaced Logout */}
          <div className="p-4 border-t border-gray-700">
            {userInfo ? (
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                {/* Avatar with first letter of email */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">
                      {getAvatarLetter()}
                    </span>
                  </div>
                </div>
                
                {/* User Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {formatRole(userInfo.role)}
                  </p>
                  <p className="text-xs text-gray-300 truncate" title={getDisplayEmail()}>
                    {getDisplayEmail()}
                  </p>
                </div>
                
                {/* Logout Button - Smaller and integrated */}
                <button 
                  onClick={handleLogout}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              // Fallback if user info is not available
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 font-bold text-sm">U</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400">User</p>
                  <p className="text-xs text-gray-500">Not available</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}