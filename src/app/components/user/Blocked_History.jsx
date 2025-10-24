// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Shield, Trash2, AlertCircle, Search, Filter, Calendar, ExternalLink, UserX, Clock, BarChart, Loader2 } from 'lucide-react';


// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// const BlockedHistory = () => {
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedPlatform, setSelectedPlatform] = useState('all');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProfile, setSelectedProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [blockedProfiles, setBlockedProfiles] = useState([]);
//   const [stats, setStats] = useState({
//     totalTakedowns: 0,
//     thisMonth: 0,
//     pending: 0
//   });
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 0
//   });

//   // Fetch reported profiles on component mount and when filters change
//   useEffect(() => {
//     fetchReportedProfiles();
//   }, [selectedFilter, selectedPlatform, searchQuery, pagination.page]);

//   const fetchReportedProfiles = async () => {
//     setLoading(true);
//     try {
//       // Get user_id from localStorage
//       const user_id = localStorage.getItem('user_id') || localStorage.getItem('userId');
      
//       if (!user_id) {
//         throw new Error('User not found. Please login again.');
//       }

//       // Build query parameters
//       const params = new URLSearchParams({
//         user_id: user_id,
//         page: pagination.page.toString(),
//         limit: pagination.limit.toString()
//       });
      
//       // Add status filter if not 'all'
//       if (selectedFilter !== 'all') {
//         params.append('status', selectedFilter);
//       }
      
//       // Add platform filter if not 'all'
//       if (selectedPlatform !== 'all') {
//         params.append('platform', selectedPlatform);
//       }
      
//       // Add search query if provided
//       if (searchQuery.trim()) {
//         params.append('search', searchQuery.trim());
//       }

//       console.log('📡 Fetching reports with params:', Object.fromEntries(params));
      
//       const response = await fetch(`${BASE_URL}/api/takedown?${params}`);
//       const data = await response.json();

//       if (response.ok) {
//         console.log('✅ API Response:', data);
//         setBlockedProfiles(data.reports || []);
//         setStats(data.stats || {
//           totalTakedowns: 0,
//           thisMonth: 0,
//           pending: 0
//         });
//         setPagination(prev => ({
//           ...prev,
//           ...data.pagination
//         }));
//       } else {
//         console.error('Failed to fetch reports:', data.error);
//         setBlockedProfiles([]);
//         setStats({ totalTakedowns: 0, thisMonth: 0, pending: 0 });
//       }
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//       setBlockedProfiles([]);
//       setStats({ totalTakedowns: 0, thisMonth: 0, pending: 0 });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reset to page 1 when filters change
//   const handleFilterChange = (filterType, value) => {
//     if (filterType === 'status') {
//       setSelectedFilter(value);
//     } else if (filterType === 'platform') {
//       setSelectedPlatform(value);
//     }
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   // Handle search with debounce
//   const handleSearchChange = (value) => {
//     setSearchQuery(value);
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   const handleRemoveProfile = async (reportId) => {
//     if (!confirm('Are you sure you want to remove this profile from takedown list?')) {
//       return;
//     }

//     try {
//       // Note: You'll need to implement DELETE API for this
//       // For now, we'll just remove from local state
//       setBlockedProfiles(prev => prev.filter(profile => profile.reportId !== reportId));
      
//       // Refresh data to update stats
//       fetchReportedProfiles();
      
//     } catch (error) {
//       console.error('Error removing profile:', error);
//       alert('Error removing profile');
//     }
//   };

//   const getStatusBadge = (status) => {
//     const styles = {
//       takedown_complete: { 
//         bg: 'bg-blue-900/30', 
//         text: 'text-blue-400', 
//         icon: Shield, 
//         label: 'TAKEDOWN COMPLETE' 
//       },
//       pending: { 
//         bg: 'bg-yellow-900/30', 
//         text: 'text-yellow-400', 
//         icon: Clock, 
//         label: 'PENDING' 
//       },
//       reported: { 
//         bg: 'bg-red-900/30', 
//         text: 'text-red-400', 
//         icon: AlertCircle, 
//         label: 'REPORTED' 
//       }
//     };
//     return styles[status] || styles.pending;
//   };

//   const openProfileWindow = (url) => {
//     const width = 450;
//     const height = 700;
//     const left = window.screenX + (window.outerWidth - width) / 2;
//     const top = window.screenY + (window.outerHeight - height) / 2;
    
//     const features = `
//       width=${width},
//       height=${height},
//       left=${left},
//       top=${top},
//       resizable,
//       scrollbars,
//       status=no,
//       toolbar=no,
//       menubar=no,
//       noopener,
//       noreferrer
//     `.replace(/\s+/g, "");

//     window.open(url, "_blank", features);
//   };

//   const handleViewDetails = (profile) => {
//     setSelectedProfile(profile);
//     setIsModalOpen(true);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       setPagination(prev => ({ ...prev, page: newPage }));
//     }
//   };

//   // REMOVED LOCAL FILTERING - Now relying solely on API filters
//   // The API should handle all filtering based on the query parameters

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-black min-h-screen">
//       {/* Title */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-white">TakeDown Profiles History</h1>
//         <p className="text-gray-400 mt-1">Track and manage TakeDown profiles</p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-gray-900/10 rounded-lg shadow border border-gray-800 p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-400">Total Takedown</p>
//               <p className="text-2xl font-bold text-white mt-1">{stats.totalTakedowns}</p>
//             </div>
//             <Shield className="w-8 h-8 text-red-500" />
//           </div>
//         </div>
        
//         <div className="bg-gray-900/10 rounded-lg shadow border border-gray-800 p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-400">This Month</p>
//               <p className="text-2xl font-bold text-blue-400 mt-1">{stats.thisMonth}</p>
//             </div>
//             <BarChart className="w-8 h-8 text-blue-400" />
//           </div>
//         </div>
        
//         <div className="bg-gray-900/10 rounded-lg shadow border border-gray-800 p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-400">Pending</p>
//               <p className="text-2xl font-bold text-yellow-400 mt-1">{stats.pending}</p>
//             </div>
//             <Clock className="w-8 h-8 text-yellow-400" />
//           </div>
//         </div>
//       </div>

//       {/* Filters + Search */}
//       <div className="bg-gray-900/15 rounded-lg shadow border border-gray-800 p-6">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//             <div className="flex items-center space-x-2">
//               <Filter className="w-5 h-5 text-gray-400" />
//               <select
//                 value={selectedFilter}
//                 onChange={(e) => handleFilterChange('status', e.target.value)}
//                 className="px-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//               >
//                 <option value="all">All Status</option>
//                 <option value="takedown_complete">Takedown Complete</option>
//                 <option value="pending">Pending</option>
//                 <option value="reported">Reported</option>
//               </select>
//             </div>

//             <select
//               value={selectedPlatform}
//               onChange={(e) => handleFilterChange('platform', e.target.value)}
//               className="px-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             >
//               <option value="all">All Platforms</option>
//               <option value="Instagram">Instagram</option>
//               <option value="Facebook">Facebook</option>
//               <option value="Twitter">Twitter</option>
//               <option value="TikTok">TikTok</option>
//             </select>
//           </div>

//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => handleSearchChange(e.target.value)}
//               placeholder="Search profiles..."
//               className="w-full pl-10 pr-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             />
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex justify-center py-8">
//             <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
//             <span className="ml-2 text-gray-400">Loading profiles...</span>
//           </div>
//         )}

//         {/* Profile Cards */}
//         {!loading && (
//           <div className="space-y-4">
//             {blockedProfiles.map((profile) => {
//               const statusInfo = getStatusBadge(profile.status);
//               const StatusIcon = statusInfo.icon;
              
//               return (
//                 <div key={profile.reportId} className="border border-gray-800 bg-gray-900/20 rounded-lg p-5 hover:shadow-md transition-shadow">
//                   <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <h3 className="text-lg font-semibold text-white">{profile.fakeProfileName}</h3>
//                             <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.bg} ${statusInfo.text} flex items-center gap-1`}>
//                               <StatusIcon className="w-3 h-3" />
//                               {statusInfo.label}
//                             </span>
//                           </div>
//                           <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
//                             <span className="flex items-center gap-1">
//                               <span className="font-medium">ID:</span> {profile.reportId}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <span className="font-medium">Platform:</span> {profile.platform}
//                             </span>
//                             <span className="flex items-center gap-1">
//                               <Calendar className="w-4 h-4" />
//                               {profile.takedownDate}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-3">
//                         <div className="bg-red-900/20 rounded-lg p-3 border border-red-800">
//                           <p className="text-xs text-gray-400 mb-1">Reported Profile</p>
//                           <div className="flex items-center justify-between">
//                             {/* <p className="text-sm font-medium text-white">{profile.fakeProfileUrl}</p> */}
//                             <button 
      
//                                                         onClick={(e) => openProfileWindow(profile.fakeProfileUrl, e)}
//                                                         className="inline-flex text-white hover:text-blue-300 flex-shrink-0 ml-2 gap-4"
//                                                       >
                                                        
//                                                         <span>Open Profile Details</span>
//                                                         <ExternalLink className="w-4 h-4" />
//                                                       </button>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex flex-wrap items-center gap-4">
//                         <div className="flex items-center gap-2">
//                           <span className="text-sm text-gray-400">Reason:</span>
//                           <span className="px-3 py-1 bg-gray-800 text-gray-200 text-sm rounded-full font-medium">
//                             {profile.reason}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex lg:flex-col gap-2">
//                       <button 
//                         onClick={() => handleViewDetails(profile)}
//                         className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium whitespace-nowrap"
//                       >
//                         View Details
//                       </button>
//                       {/* <button 
//                         onClick={() => handleRemoveProfile(profile.reportId)}
//                         className="px-4 py-2 border border-red-600 text-red-500 rounded-lg hover:bg-red-900/40 transition-colors text-sm font-medium whitespace-nowrap flex items-center gap-2"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                         Remove
//                       </button> */}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {!loading && blockedProfiles.length === 0 && (
//           <div className="text-center py-12">
//             <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-white mb-2">No Takedown profiles found</h3>
//             <p className="text-gray-400">
//               {selectedFilter !== 'all' || selectedPlatform !== 'all' || searchQuery 
//                 ? 'Try adjusting your search or filter criteria' 
//                 : 'No profiles have been reported yet'
//               }
//             </p>
//           </div>
//         )}

//         {/* Pagination */}
//         {!loading && pagination.totalPages > 1 && (
//           <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
//             <p className="text-sm text-gray-400">
//               Showing {blockedProfiles.length} of {pagination.total} blocked profiles
//             </p>
//             <div className="flex items-center space-x-2">
//               <button 
//                 onClick={() => handlePageChange(pagination.page - 1)}
//                 disabled={pagination.page === 1}
//                 className="px-4 py-2 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Previous
//               </button>
//               <span className="px-3 py-2 text-sm text-gray-400">
//                 Page {pagination.page} of {pagination.totalPages}
//               </span>
//               <button 
//                 onClick={() => handlePageChange(pagination.page + 1)}
//                 disabled={pagination.page === pagination.totalPages}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Show pagination info even if only one page */}
//         {!loading && pagination.totalPages <= 1 && blockedProfiles.length > 0 && (
//           <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
//             <p className="text-sm text-gray-400">
//               Showing {blockedProfiles.length} of {pagination.total} blocked profiles
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlockedHistory;


'use client';
import React, { useState, useEffect } from 'react';
import { Shield, Trash2, AlertCircle, Search, Filter, Calendar, ExternalLink, UserX, Clock, BarChart, Loader2 } from 'lucide-react';
import ProfileDetailsModal from './modal';
// import ProfileDetailsModal from '@/app/components/ProfileDetailsModal'; // Import the modal

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const BlockedHistory = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blockedProfiles, setBlockedProfiles] = useState([]);
  const [stats, setStats] = useState({
    totalTakedowns: 0,
    thisMonth: 0,
    pending: 0
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  // Fetch reported profiles on component mount and when filters change
  useEffect(() => {
    fetchReportedProfiles();
  }, [selectedFilter, selectedPlatform, searchQuery, pagination.page]);

  const fetchReportedProfiles = async () => {
    setLoading(true);
    try {
      // Get user_id from localStorage
      const user_id = localStorage.getItem('user_id') || localStorage.getItem('userId');
      
      if (!user_id) {
        throw new Error('User not found. Please login again.');
      }

      // Build query parameters
      const params = new URLSearchParams({
        user_id: user_id,
        page: pagination.page.toString(),
        limit: pagination.limit.toString()
      });
      
      // Add status filter if not 'all'
      if (selectedFilter !== 'all') {
        params.append('status', selectedFilter);
      }
      
      // Add platform filter if not 'all'
      if (selectedPlatform !== 'all') {
        params.append('platform', selectedPlatform);
      }
      
      // Add search query if provided
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }

      console.log('📡 Fetching reports with params:', Object.fromEntries(params));
      
      const response = await fetch(`${BASE_URL}/api/takedown?${params}`);
      const data = await response.json();

      if (response.ok) {
        console.log('✅ API Response:', data);
        setBlockedProfiles(data.reports || []);
        setStats(data.stats || {
          totalTakedowns: 0,
          thisMonth: 0,
          pending: 0
        });
        setPagination(prev => ({
          ...prev,
          ...data.pagination
        }));
      } else {
        console.error('Failed to fetch reports:', data.error);
        setBlockedProfiles([]);
        setStats({ totalTakedowns: 0, thisMonth: 0, pending: 0 });
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setBlockedProfiles([]);
      setStats({ totalTakedowns: 0, thisMonth: 0, pending: 0 });
    } finally {
      setLoading(false);
    }
  };

  // Reset to page 1 when filters change
  const handleFilterChange = (filterType, value) => {
    if (filterType === 'status') {
      setSelectedFilter(value);
    } else if (filterType === 'platform') {
      setSelectedPlatform(value);
    }
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Handle search with debounce
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleRemoveProfile = async (reportId) => {
    if (!confirm('Are you sure you want to remove this profile from takedown list?')) {
      return;
    }

    try {
      // Note: You'll need to implement DELETE API for this
      // For now, we'll just remove from local state
      setBlockedProfiles(prev => prev.filter(profile => profile.reportId !== reportId));
      
      // Refresh data to update stats
      fetchReportedProfiles();
      
    } catch (error) {
      console.error('Error removing profile:', error);
      alert('Error removing profile');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      takedown_complete: { 
        bg: 'bg-blue-900/30', 
        text: 'text-blue-400', 
        icon: Shield, 
        label: 'TAKEDOWN COMPLETE' 
      },
      pending: { 
        bg: 'bg-yellow-900/30', 
        text: 'text-yellow-400', 
        icon: Clock, 
        label: 'PENDING' 
      },
      reported: { 
        bg: 'bg-red-900/30', 
        text: 'text-red-400', 
        icon: AlertCircle, 
        label: 'REPORTED' 
      }
    };
    return styles[status] || styles.pending;
  };

  const openProfileWindow = (url) => {
    const width = 450;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const features = `
      width=${width},
      height=${height},
      left=${left},
      top=${top},
      resizable,
      scrollbars,
      status=no,
      toolbar=no,
      menubar=no,
      noopener,
      noreferrer
    `.replace(/\s+/g, "");

    window.open(url, "_blank", features);
  };

  const handleViewDetails = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProfile(null);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-black min-h-screen">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">TakeDown Profiles History</h1>
        <p className="text-gray-400 mt-1">Track and manage TakeDown profiles</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900/10 rounded-lg shadow border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Takedown</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.totalTakedowns}</p>
            </div>
            <Shield className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-gray-900/10 rounded-lg shadow border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-blue-400 mt-1">{stats.thisMonth}</p>
            </div>
            <BarChart className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gray-900/10 rounded-lg shadow border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-400 mt-1">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="bg-gray-900/15 rounded-lg shadow border border-gray-800 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="takedown_complete">Takedown Complete</option>
                <option value="pending">Pending</option>
                <option value="reported">Reported</option>
              </select>
            </div>

            <select
              value={selectedPlatform}
              onChange={(e) => handleFilterChange('platform', e.target.value)}
              className="px-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Platforms</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Twitter">Twitter</option>
              <option value="TikTok">TikTok</option>
            </select>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search profiles..."
              className="w-full pl-10 pr-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
            <span className="ml-2 text-gray-400">Loading profiles...</span>
          </div>
        )}

        {/* Profile Cards */}
        {!loading && (
          <div className="space-y-4">
            {blockedProfiles.map((profile) => {
              const statusInfo = getStatusBadge(profile.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <div key={profile.reportId} className="border border-gray-800 bg-gray-900/20 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-white">{profile.fakeProfileName}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.bg} ${statusInfo.text} flex items-center gap-1`}>
                              <StatusIcon className="w-3 h-3" />
                              {statusInfo.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <span className="font-medium">ID:</span> {profile.reportId}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="font-medium">Platform:</span> {profile.platform}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(profile.takedownDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-3">
                        <div className="bg-red-900/20 rounded-lg p-3 border border-red-800">
                          <p className="text-xs text-gray-400 mb-1">Reported Profile</p>
                          <div className="flex items-center justify-between">
                            <button 
                              onClick={(e) => openProfileWindow(profile.fakeProfileUrl, e)}
                              className="inline-flex text-white hover:text-blue-300 flex-shrink-0 ml-2 gap-4"
                            >
                              <span>Open Profile Details</span>
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">Reason:</span>
                          <span className="px-3 py-1 bg-gray-800 text-gray-200 text-sm rounded-full font-medium">
                            {profile.reason}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex lg:flex-col gap-2">
                      <button 
                        onClick={() => handleViewDetails(profile)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium whitespace-nowrap"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && blockedProfiles.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Takedown profiles found</h3>
            <p className="text-gray-400">
              {selectedFilter !== 'all' || selectedPlatform !== 'all' || searchQuery 
                ? 'Try adjusting your search or filter criteria' 
                : 'No profiles have been reported yet'
              }
            </p>
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-400">
              Showing {blockedProfiles.length} of {pagination.total} blocked profiles
            </p>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-4 py-2 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-2 text-sm text-gray-400">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button 
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Show pagination info even if only one page */}
        {!loading && pagination.totalPages <= 1 && blockedProfiles.length > 0 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-400">
              Showing {blockedProfiles.length} of {pagination.total} blocked profiles
            </p>
          </div>
        )}
      </div>

      {/* Profile Details Modal */}
      <ProfileDetailsModal
        isOpen={isModalOpen}
        profile={selectedProfile}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default BlockedHistory;