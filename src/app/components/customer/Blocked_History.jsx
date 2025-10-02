// 'use client';
// import React, { useState } from 'react';
// import { Shield, Trash2, AlertCircle, Search, Filter, Calendar, ExternalLink, UserX, Clock, BarChart } from 'lucide-react';
// import { ProfileDetailModal } from './modal';
// // import { ProfileDetailModal } from './Modal';

// const BlockedHistory = () => {
//   const [selectedFilter, setSelectedFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedPlatform, setSelectedPlatform] = useState('all');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProfile, setSelectedProfile] = useState(null);

//   const blockedProfiles = [
//     {
//       id: 'BLK-001',
//       fakeProfileName: 'John Smith Official',
//       fakeProfileUrl: '@johnsmith_fake_official',
//       originalProfile: '@johnsmith_official',
//       platform: 'Instagram',
//       reportedDate: '2024-09-28',
//       reason: 'Impersonation',
//       // similarity: 95,
//       status: 'reported',
//       followers: '12.5K'
//     },
//     {
//       id: 'BLK-002',
//       fakeProfileName: 'Sarah J',
//       fakeProfileUrl: 'sarah.johnson.fake',
//       originalProfile: 'sarah.johnson.1990',
//       platform: 'Facebook',
//       reportedDate: '2024-09-27',
//       reason: 'Identity Theft',
//       // similarity: 88,
//       status: 'reported',
//       followers: '3.2K'
//     },
//     {
//       id: 'BLK-003',
//       fakeProfileName: 'Mike Davis Pro',
//       fakeProfileUrl: '@mike_davis_pro',
//       originalProfile: '@mikedavis',
//       platform: 'LinkedIn',
//       reportedDate: '2024-09-26',
//       reason: 'Fake Verification',
//       // similarity: 92,
//       status: 'reported',
//       followers: '8.9K'
//     },
//     {
//       id: 'BLK-004',
//       fakeProfileName: 'Emily Chen Marketing Expert',
//       fakeProfileUrl: 'emily-chen-expert',
//       originalProfile: 'emily-chen-marketing',
//       platform: 'LinkedIn',
//       reportedDate: '2024-09-25',
//       reason: 'Impersonation',
//       similarity: 78,
//       status: 'reported',
//       followers: '5.6K'
//     },
//     {
//       id: 'BLK-005',
//       fakeProfileName: 'Robert Wilson Official',
//       fakeProfileUrl: '@robertwilson_official',
//       originalProfile: '@robertwilson',
//       platform: 'Instagram',
//       reportedDate: '2024-09-24',
//       reason: 'Scam Account',
//       similarity: 97,
//       status: 'reported',
//       followers: '15.3K'
//     },
//     {
//       id: 'BLK-006',
//       fakeProfileName: 'Mike D',
//       fakeProfileUrl: '@miked_real',
//       originalProfile: '@mikedavis',
//       platform: 'LinkedIn',
//       reportedDate: '2024-09-23',
//       reason: 'Impersonation',
//       similarity: 85,
//       status: 'pending',
//       followers: '4.7K'
//     }
//   ];

//   const getStatusBadge = (status) => {
//     const styles = {
//       blocked: { bg: 'bg-red-100', text: 'text-red-800', icon: UserX },
//       reported: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertCircle },
//       pending: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock }
//     };
//     return styles[status] || styles.pending;
//   };

//   // const getSimilarityColor = (similarity) => {
//   //   if (similarity >= 90) return 'text-red-600';
//   //   if (similarity >= 75) return 'text-yellow-600';
//   //   return 'text-green-600';
//   // };

//   const handleViewDetails = (profile) => {
//     setSelectedProfile(profile);
//     setIsModalOpen(true);
//   };

//   const filteredProfiles = blockedProfiles.filter(profile => {
//     const matchesStatus = selectedFilter === 'all' || profile.status === selectedFilter;
//     const matchesPlatform = selectedPlatform === 'all' || profile.platform === selectedPlatform;
//     const matchesSearch = 
//       profile.fakeProfileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       profile.fakeProfileUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       profile.originalProfile.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       profile.id.toLowerCase().includes(searchQuery.toLowerCase());
    
//     return matchesStatus && matchesPlatform && matchesSearch;
//   });

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Reported Profiles History</h1>
//         <p className="text-gray-600 mt-1">Track and manage reported fake profiles</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Total Reported</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">156</p>
//             </div>
//             <Shield className="w-8 h-8 text-red-600" />
//           </div>
//         </div>
        
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">This Month</p>
//               <p className="text-2xl font-bold text-blue-600 mt-1">23</p>
//             </div>
//             <BarChart className="w-8 h-8 text-blue-600" />
//           </div>
//         </div>
        
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Pending</p>
//               <p className="text-2xl font-bold text-yellow-600 mt-1">8</p>
//             </div>
//             <Clock className="w-8 h-8 text-yellow-600" />
//           </div>
//         </div>
        
//         {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-600">Avg Similarity</p>
//               <p className="text-2xl font-bold text-red-600 mt-1">89%</p>
//             </div>
//             <AlertCircle className="w-8 h-8 text-red-600" />
//           </div>
//         </div> */}
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//             <div className="flex items-center space-x-2">
//               <Filter className="w-5 h-5 text-gray-500" />
//               <select
//                 value={selectedFilter}
//                 onChange={(e) => setSelectedFilter(e.target.value)}
//                 className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//               >
//                 <option value="all">All Status</option>
//                 {/* <option value="blocked">Blocked</option> */}
//                 <option value="reported">Reported</option>
//                 <option value="pending">Pending</option>
//               </select>
//             </div>

//             <select
//               value={selectedPlatform}
//               onChange={(e) => setSelectedPlatform(e.target.value)}
//               className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             >
//               <option value="all">All Platforms</option>
//               <option value="Instagram">Instagram</option>
//               <option value="Facebook">Facebook</option>
//               {/* <option value="Twitter">Twitter</option> */}
//               <option value="LinkedIn">LinkedIn</option>
//             </select>
//           </div>

//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search profiles..."
//               className="w-full pl-10 pr-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             />
//           </div>
//         </div>

//         <div className="space-y-4">
//           {filteredProfiles.map((profile) => {
//             const statusInfo = getStatusBadge(profile.status);
//             const StatusIcon = statusInfo.icon;
            
//             return (
//               <div key={profile.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-2">
//                           <h3 className="text-lg font-semibold text-gray-900">{profile.fakeProfileName}</h3>
//                           <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.bg} ${statusInfo.text} flex items-center gap-1`}>
//                             <StatusIcon className="w-3 h-3" />
//                             {profile.status.toUpperCase()}
//                           </span>
//                         </div>
//                         <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
//                           <span className="flex items-center gap-1">
//                             <span className="font-medium">ID:</span> {profile.id}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <span className="font-medium">Platform:</span> {profile.platform}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <Calendar className="w-4 h-4" />
//                             {profile.reportedDate}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                       <div className="bg-red-50 rounded-lg p-3 border border-red-100">
//                         <p className="text-xs text-gray-600 mb-1">Fake Profile</p>
//                         <div className="flex items-center justify-between">
//                           <p className="text-sm font-medium text-gray-900">{profile.fakeProfileUrl}</p>
//                           <button className="text-blue-600 hover:text-blue-700">
//                             <ExternalLink className="w-4 h-4" />
//                           </button>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">{profile.followers} followers</p>
//                       </div>

//                       <div className="bg-green-50 rounded-lg p-3 border border-green-100">
//                         <p className="text-xs text-gray-600 mb-1">Original Profile</p>
//                         <div className="flex items-center justify-between">
//                           <p className="text-sm font-medium text-gray-900">{profile.originalProfile}</p>
//                           <button className="text-blue-600 hover:text-blue-700">
//                             <ExternalLink className="w-4 h-4" />
//                           </button>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">Verified Account</p>
//                       </div>
//                     </div>

//                     <div className="flex flex-wrap items-center gap-4">
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm text-gray-600">Reason:</span>
//                         <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full font-medium">
//                           {profile.reason}
//                         </span>
//                       </div>
//                       {/* <div className="flex items-center gap-2">
//                         <span className="text-sm text-gray-600">Similarity:</span>
//                         <span className={`text-sm font-bold ${getSimilarityColor(profile.similarity)}`}>
//                           {profile.similarity}%
//                         </span>
//                       </div> */}
//                     </div>
//                   </div>

//                   <div className="flex lg:flex-col gap-2">
//                     <button 
//                       onClick={() => handleViewDetails(profile)}
//                       className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap"
//                     >
//                       View Details
//                     </button>
//                     <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium whitespace-nowrap flex items-center gap-2">
//                       <Trash2 className="w-4 h-4" />
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {filteredProfiles.length === 0 && (
//           <div className="text-center py-12">
//             <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No Reported profiles found</h3>
//             <p className="text-gray-500">Try adjusting your search or filter criteria</p>
//           </div>
//         )}

//         <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
//           <p className="text-sm text-gray-600">
//             Showing {filteredProfiles.length} of {blockedProfiles.length} blocked profiles
//           </p>
//           <div className="flex items-center space-x-2">
//             <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
//               Previous
//             </button>
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       <ProfileDetailModal 
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         profile={selectedProfile}
//       />
//     </div>
//   );
// };

// export default BlockedHistory;

'use client';
import React, { useState } from 'react';
import { Shield, Trash2, AlertCircle, Search, Filter, Calendar, ExternalLink, UserX, Clock, BarChart } from 'lucide-react';
import { ProfileDetailModal } from './modal';

const BlockedHistory = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const blockedProfiles = [
    {
      id: 'BLK-001',
      fakeProfileName: 'John Smith Official',
      fakeProfileUrl: '@johnsmith_fake_official',
      originalProfile: '@johnsmith_official',
      platform: 'Instagram',
      reportedDate: '2024-09-28',
      reason: 'Impersonation',
      status: 'reported',
      followers: '12.5K'
    },
    {
      id: 'BLK-002',
      fakeProfileName: 'Sarah J',
      fakeProfileUrl: 'sarah.johnson.fake',
      originalProfile: 'sarah.johnson.1990',
      platform: 'Facebook',
      reportedDate: '2024-09-27',
      reason: 'Identity Theft',
      status: 'reported',
      followers: '3.2K'
    },
    {
      id: 'BLK-003',
      fakeProfileName: 'Mike Davis Pro',
      fakeProfileUrl: '@mike_davis_pro',
      originalProfile: '@mikedavis',
      platform: 'LinkedIn',
      reportedDate: '2024-09-26',
      reason: 'Fake Verification',
      status: 'reported',
      followers: '8.9K'
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      blocked: { bg: 'bg-red-900/30', text: 'text-red-400', icon: UserX },
      reported: { bg: 'bg-yellow-900/30', text: 'text-yellow-400', icon: AlertCircle },
      pending: { bg: 'bg-blue-900/30', text: 'text-blue-400', icon: Clock }
    };
    return styles[status] || styles.pending;
  };

  const handleViewDetails = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const filteredProfiles = blockedProfiles.filter(profile => {
    const matchesStatus = selectedFilter === 'all' || profile.status === selectedFilter;
    const matchesPlatform = selectedPlatform === 'all' || profile.platform === selectedPlatform;
    const matchesSearch = 
      profile.fakeProfileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.fakeProfileUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.originalProfile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPlatform && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-950 min-h-screen">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Reported Profiles History</h1>
        <p className="text-gray-400 mt-1">Track and manage reported fake profiles</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg shadow border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Reported</p>
              <p className="text-2xl font-bold text-white mt-1">156</p>
            </div>
            <Shield className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg shadow border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-blue-400 mt-1">23</p>
            </div>
            <BarChart className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg shadow border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-400 mt-1">8</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="bg-gray-900 rounded-lg shadow border border-gray-800 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="reported">Reported</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Platforms</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search profiles..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Profile Cards */}
        <div className="space-y-4">
          {filteredProfiles.map((profile) => {
            const statusInfo = getStatusBadge(profile.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div key={profile.id} className="border border-gray-800 bg-gray-900 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-white">{profile.fakeProfileName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.bg} ${statusInfo.text} flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {profile.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <span className="font-medium">ID:</span> {profile.id}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Platform:</span> {profile.platform}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {profile.reportedDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="bg-red-900/20 rounded-lg p-3 border border-red-800">
                        <p className="text-xs text-gray-400 mb-1">Fake Profile</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-white">{profile.fakeProfileUrl}</p>
                          <button className="text-blue-400 hover:text-blue-300">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{profile.followers} followers</p>
                      </div>

                      <div className="bg-green-900/20 rounded-lg p-3 border border-green-800">
                        <p className="text-xs text-gray-400 mb-1">Original Profile</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-white">{profile.originalProfile}</p>
                          <button className="text-blue-400 hover:text-blue-300">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Verified Account</p>
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
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-red-600 text-red-500 rounded-lg hover:bg-red-900/40 transition-colors text-sm font-medium whitespace-nowrap flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProfiles.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Reported profiles found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            Showing {filteredProfiles.length} of {blockedProfiles.length} blocked profiles
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      <ProfileDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profile={selectedProfile}
      />
    </div>
  );
};

export default BlockedHistory;
