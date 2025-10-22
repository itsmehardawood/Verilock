// 'use client';
// import React from 'react';
// import { X } from 'lucide-react';

// export default function ProfileDetailsModal({ isOpen, profile, onClose }) {
//   if (!isOpen || !profile) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/15 backdrop-blur-xs">
//       {/* Modal Container */}
//       <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">
        
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         {/* Header */}
//         <div className="mb-4 border-b border-gray-700 pb-3">
//           <h2 className="text-2xl font-semibold text-white">
//             Profile Details
//           </h2>
//         </div>

//         {/* Profile Info */}
//         <div className="flex items-start space-x-4">
//           {/* Image (if available) */}
//           {profile.profile_image ? (
//             <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
//               <img
//                 src={profile.profile_image}
//                 alt={profile.profile_name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ) : (
//             <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 text-sm">
//               No Image
//             </div>
//           )}

//           <div className="flex-1">
//             <h3 className="text-xl font-bold text-gray-100 mb-1">
//               {profile.profile_name || 'Unknown Name'}
//             </h3>

//             <div className="text-sm space-y-1">
//               <p><span className="text-gray-400">Platform:</span> <span className="text-gray-200 capitalize">{profile.platform}</span></p>
//               <p><span className="text-gray-400">Handle:</span> <span className="text-gray-200">{profile.profile_handle}</span></p>
//               <p><span className="text-gray-400">URL:</span> <a href={profile.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{profile.url}</a></p>
//               <p><span className="text-gray-400">Duplicate:</span> <span className={`font-medium ${profile.is_duplicate ? 'text-red-400' : 'text-green-400'}`}>{profile.is_duplicate ? 'Yes' : 'No'}</span></p>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-gray-700 my-6"></div>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-3">
//           <button
//             onClick={() => console.log('Request Takedown:', profile)}
//             className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
//           >
//             Request Takedown
//           </button>
//           <button
//             onClick={() => console.log('Review Later:', profile)}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
//           >
//             Review Later
//           </button>
//           <button
//             onClick={() => console.log('Ignore:', profile)}
//             className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-5 py-2.5 rounded-lg font-medium transition"
//           >
//             Ignore
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// 'use client';
// import React from 'react';
// import { X } from 'lucide-react';

// export default function ProfileDetailsCard({ profile, onClose }) {
//   if (!profile) return null;

//   return (
//     <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-6 relative">
//       {/* Close Button */}
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
//       >
//         <X className="w-6 h-6" />
//       </button>

//       {/* Header */}
//       <div className="mb-4 border-b border-gray-700 pb-3">
//         <h2 className="text-2xl font-semibold text-white">Profile Details</h2>
//       </div>

//       {/* Profile Info */}
//       <div className="flex items-start space-x-4">
//         {profile.profile_image ? (
//           <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
//             <img
//               src={profile.profile_image}
//               alt={profile.profile_name}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ) : (
//           <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 text-sm">
//             No Image
//           </div>
//         )}

//         <div className="flex-1">
//           <h3 className="text-xl font-bold text-gray-100 mb-1">
//             {profile.profile_name || 'Unknown Name'}
//           </h3>

//           <div className="text-sm space-y-1">
//             <p>
//               <span className="text-gray-400">Platform:</span>{' '}
//               <span className="text-gray-200 capitalize">{profile.platform}</span>
//             </p>
//             <p>
//               <span className="text-gray-400">Handle:</span>{' '}
//               <span className="text-gray-200">{profile.profile_handle}</span>
//             </p>
//             <p>
//               <span className="text-gray-400">URL:</span>{' '}
//               <a
//                 href={profile.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-400 hover:underline"
//               >
//                 {profile.url}
//               </a>
//             </p>
//             <p>
//               <span className="text-gray-400">Duplicate:</span>{' '}
//               <span
//                 className={`font-medium ${
//                   profile.is_duplicate ? 'text-red-400' : 'text-green-400'
//                 }`}
//               >
//                 {profile.is_duplicate ? 'Yes' : 'No'}
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="border-t border-gray-700 my-6"></div>

//       {/* Action Buttons */}
//       <div className="flex justify-end space-x-3">
//         <button
//           onClick={() => console.log('Request Takedown:', profile)}
//           className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
//         >
//           Request Takedown
//         </button>
//         <button
//           onClick={() => console.log('Review Later:', profile)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
//         >
//           Review Later
//         </button>
//         <button
//           onClick={() => console.log('Ignore:', profile)}
//           className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-5 py-2.5 rounded-lg font-medium transition"
//         >
//           Ignore
//         </button>
//       </div>
//     </div>
//   );
// }


'use client';
import React from 'react';
import { 
  X, 
  ExternalLink, 
  Shield, 
  Calendar, 
  User, 
  Globe, 
  AlertCircle,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';

const ProfileDetailsModal = ({ isOpen, profile, onClose }) => {
  if (!isOpen || !profile) return null;

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

  const getStatusInfo = (status) => {
    const statusConfig = {
      takedown_complete: {
        icon: CheckCircle,
        color: 'text-green-500',
        bgColor: 'bg-green-900/30',
        borderColor: 'border-green-700',
        label: 'Takedown Complete'
      },
      pending: {
        icon: Clock,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-900/30',
        borderColor: 'border-yellow-700',
        label: 'Pending'
      },
      reported: {
        icon: AlertCircle,
        color: 'text-red-500',
        bgColor: 'bg-red-900/30',
        borderColor: 'border-red-700',
        label: 'Reported'
      }
    };
    
    return statusConfig[status] || statusConfig.pending;
  };

  const getPlatformIcon = (platform) => {
    const platformIcons = {
      Instagram: '📷',
      Facebook: '👥',
      Twitter: '🐦',
      TikTok: '🎵',
      LinkedIn: '💼'
    };
    return platformIcons[platform] || '🌐';
  };

  const StatusInfo = getStatusInfo(profile.status);
  const StatusIcon = StatusInfo.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/5 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-900/20 rounded-lg">
              <Shield className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Profile Details</h2>
              <p className="text-sm text-gray-400">Takedown request information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className={`flex items-center justify-between p-4 rounded-lg border ${StatusInfo.borderColor} ${StatusInfo.bgColor}`}>
            <div className="flex items-center space-x-3">
              <StatusIcon className={`w-5 h-5 ${StatusInfo.color}`} />
              <div>
                <p className="text-white font-medium">Current Status</p>
                <p className={`text-sm ${StatusInfo.color}`}>{StatusInfo.label}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Report ID</p>
              <p className="text-white font-mono text-sm">{profile.reportId}</p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-400" />
                <span>Profile Information</span>
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Profile Name</label>
                  <p className="text-white font-medium mt-1">{profile.fakeProfileName}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400">Platform</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-lg">{getPlatformIcon(profile.platform)}</span>
                    <p className="text-white font-medium">{profile.platform}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400">Report Reason</label>
                  <p className="text-white font-medium mt-1">{profile.reason}</p>
                </div>
              </div>
            </div>

            {/* Timeline & Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-green-400" />
                <span>Timeline</span>
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Takedown Date</label>
                  <p className="text-white font-medium mt-1">
                    {new Date(profile.takedownDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      // hour: '2-digit',
                      // minute: '2-digit'
                    })}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400">Days Since Report</label>
                  <p className="text-white font-medium mt-1">
                    {Math.floor((new Date() - new Date(profile.takedownDate)) / (1000 * 60 * 60 * 24))} days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile URL */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Globe className="w-5 h-5 text-purple-400" />
              <span>Profile URL</span>
            </h3>
            
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <p className="text-gray-300 text-sm break-all">{profile.fakeProfileUrl}</p>
                <button
                  onClick={() => openProfileWindow(profile.fakeProfileUrl)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium whitespace-nowrap ml-4"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Profile</span>
                </button>
              </div>
            </div>
          </div>

          {/* Status Information */}
          {/* <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-yellow-400" />
              <span>Status Information</span>
            </h3>
            
            <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
              <div className="space-y-2">
                {profile.status === 'takedown_complete' && (
                  <div className="flex items-center space-x-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <p className="text-sm">This profile has been successfully taken down from the platform.</p>
                  </div>
                )}
                
                {profile.status === 'pending' && (
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <Clock className="w-4 h-4" />
                    <p className="text-sm">The takedown request is currently being processed by the platform.</p>
                  </div>
                )}
                
                {profile.status === 'reported' && (
                  <div className="flex items-center space-x-2 text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <p className="text-sm">The profile has been reported and is awaiting platform review.</p>
                  </div>
                )}
                
                <p className="text-gray-400 text-sm mt-2">
                  Status updates are automatically synced with the platform's review process.
                </p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-700">
          {/* <button
            onClick={() => openProfileWindow(profile.fakeProfileUrl)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Visit Profile</span>
          </button> */}
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsModal;