// // Profile Detail Modal Component
// 'use client';
// import React from 'react';
// import {ExternalLink, AlertCircle, Shield, Calendar, Users, MapPin, CheckCircle, XCircle } from 'lucide-react';


// const ProfileDetailModal = ({ isOpen, onClose, profile }) => {
//   if (!profile) return null;

//   const getStatusInfo = (status) => {
//     const statusMap = {
//       blocked: { 
//         icon: XCircle, 
//         text: 'Blocked', 
//         bgColor: 'bg-red-100', 
//         textColor: 'text-red-800',
//         borderColor: 'border-red-200'
//       },
//       reported: { 
//         icon: AlertCircle, 
//         text: 'Reported', 
//         bgColor: 'bg-yellow-100', 
//         textColor: 'text-yellow-800',
//         borderColor: 'border-yellow-200'
//       },
//       pending: { 
//         icon: AlertCircle, 
//         text: 'Pending Review', 
//         bgColor: 'bg-blue-100', 
//         textColor: 'text-blue-800',
//         borderColor: 'border-blue-200'
//       }
//     };
//     return statusMap[status] || statusMap.pending;
//   };

//   const statusInfo = getStatusInfo(profile.status);
//   const StatusIcon = statusInfo.icon;

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="Profile Details" size="lg">
//       <div className="space-y-6">
//         <div className={`${statusInfo.bgColor} ${statusInfo.borderColor} border rounded-lg p-4 flex items-center gap-3`}>
//           <StatusIcon className={`w-6 h-6 ${statusInfo.textColor}`} />
//           <div>
//             <p className={`font-bold ${statusInfo.textColor}`}>{statusInfo.text}</p>
//             <p className={`text-sm ${statusInfo.textColor}`}>
//               This profile has been {profile.status} on {profile.blockedDate}
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="border-2 border-red-200 rounded-lg p-5 bg-red-50">
//             <div className="flex items-center gap-2 mb-4">
//               <Shield className="w-5 h-5 text-red-600" />
//               <h3 className="text-lg font-bold text-red-900">Fake Profile</h3>
//             </div>
            
//             <div className="mb-4">
//               <div className="w-full h-48 bg-gradient-to-br from-red-300 to-red-400 rounded-lg flex items-center justify-center">
//                 <Users className="w-20 h-20 text-white opacity-50" />
//               </div>
//             </div>

//             <div className="space-y-3">
//               <div>
//                 <label className="text-xs text-gray-600 font-semibold uppercase">Profile Name</label>
//                 <p className="text-sm font-bold text-gray-900 mt-1">{profile.fakeProfileName}</p>
//               </div>

//               <div>
//                 <label className="text-xs text-gray-600 font-semibold uppercase">Username/URL</label>
//                 <div className="flex items-center justify-between mt-1">
//                   <p className="text-sm text-gray-900 font-medium">{profile.fakeProfileUrl}</p>
//                   <button className="text-blue-600 hover:text-blue-700">
//                     <ExternalLink className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="text-xs text-gray-600 font-semibold uppercase">Platform</label>
//                 <p className="text-sm text-gray-900 font-medium mt-1">{profile.platform}</p>
//               </div>

//               <div>
//                 <label className="text-xs text-gray-600 font-semibold uppercase">Followers</label>
//                 <p className="text-sm text-gray-900 font-medium mt-1">{profile.followers}</p>
//               </div>

//               <div>
//                 <label className="text-xs text-gray-600 font-semibold uppercase">Account Created</label>
//                 <p className="text-sm text-gray-900 font-medium mt-1">Aug 15, 2024</p>
//               </div>

//               <div>
//                 <label className="text-xs text-gray-600 font-semibold uppercase">Location</label>
//                 <p className="text-sm text-gray-900 font-medium mt-1 flex items-center gap-1">
//                   <MapPin className="w-3 h-3" />
//                   Unknown / Spoofed
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="border-2 border-green-200 rounded-lg p-5 bg-green-50">
//             <div className="flex items-center gap-2 mb-4">
//               <CheckCircle className="w-5 h-5 text-green-600" />
//               <h3 className="text-lg font-bold text-green-900">Original Profile</h3>
//             </div>
            
//             <div className="mb-4">
//               <div className="w-full h-48 bg-gradient-to-br from-green-300 to-green-400 rounded-lg flex items-center justify-center">
//                 <Users className="w-20 h-20 text-white opacity-50" />
//               </div>
//             </div>

//             <div className="space-y-3">
//               <div>
//                 <label className="text-xs text-gray-600 font-semibold uppercase">Profile Name</label>
//                 <p className="text-sm font-bold text-gray-900 mt-1">{profile.fakeProfileName.replace(' Official', '').replace(' Pro', '').replace(' Expert', '')}</p>
//               </div>

//               <div>
//                 <label className="text-xs text-gray-600 font-semibold uppercase">Username/URL</label>
//                 <div className="flex items-center justify-between mt-1">
//                   <p className="text-sm text-gray-900 font-medium">{profile.originalProfile}</p>
//                   <button className="text-blue-600 hover:text-blue-700">
//                     <ExternalLink className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="text-xs text-gray-600 font-semibold uppercase">Platform</label>
//                 <p className="text-sm text-gray-900 font-medium mt-1">{profile.platform}</p>
//               </div>

//               <div>
//                 <label className="text-xs text-gray-600 font-semibold uppercase">Followers</label>
//                 <p className="text-sm text-gray-900 font-medium mt-1">{parseInt(profile.followers) * 10}K</p>
//               </div>

//               <div>
//                 <label className="text-xs text-gray-600 font-semibold uppercase">Account Created</label>
//                 <p className="text-sm text-gray-900 font-medium mt-1">Jan 05, 2019</p>
//               </div>

//               <div>
//                 <label className="text-xs text-gray-600 font-semibold uppercase">Verification</label>
//                 <p className="text-sm text-green-600 font-bold mt-1 flex items-center gap-1">
//                   <CheckCircle className="w-4 h-4" />
//                   Verified Account
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
//           <h3 className="text-lg font-bold text-gray-900 mb-4">Detection Analysis</h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//             <div className="bg-white rounded-lg p-4 border border-gray-200">
//               <label className="text-xs text-gray-600 font-semibold uppercase">Similarity Score</label>
//               <div className="flex items-baseline gap-2 mt-1">
//                 <span className={`text-3xl font-bold ${profile.similarity >= 90 ? 'text-red-600' : profile.similarity >= 75 ? 'text-yellow-600' : 'text-green-600'}`}>
//                   {profile.similarity}%
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                 <div 
//                   className={`h-2 rounded-full ${profile.similarity >= 90 ? 'bg-red-600' : profile.similarity >= 75 ? 'bg-yellow-600' : 'bg-green-600'}`}
//                   style={{ width: `${profile.similarity}%` }}
//                 ></div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg p-4 border border-gray-200">
//               <label className="text-xs text-gray-600 font-semibold uppercase">Detection Date</label>
//               <div className="flex items-center gap-2 mt-1">
//                 <Calendar className="w-5 h-5 text-gray-600" />
//                 <span className="text-lg font-bold text-gray-900">{profile.blockedDate}</span>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg p-4 border border-gray-200">
//               <label className="text-xs text-gray-600 font-semibold uppercase">Block ID</label>
//               <p className="text-lg font-bold text-gray-900 mt-1">{profile.id}</p>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg p-4 border border-gray-200">
//             <label className="text-xs text-gray-600 font-semibold uppercase mb-2 block">Reason for Block</label>
//             <div className="flex items-center gap-2">
//               <AlertCircle className="w-5 h-5 text-red-600" />
//               <span className="text-sm font-bold text-gray-900">{profile.reason}</span>
//             </div>
//             <p className="text-sm text-gray-600 mt-2">
//               This profile was automatically detected by our AI system and flagged for {profile.reason.toLowerCase()}. 
//               The similarity score indicates a high probability of fraudulent activity.
//             </p>
//           </div>
//         </div>

//         <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
//           <h3 className="text-lg font-bold text-gray-900 mb-4">Matching Indicators</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//             <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
//               <p className="text-xs text-gray-600 mb-1">Profile Photo</p>
//               <p className="text-2xl font-bold text-red-600">98%</p>
//             </div>
//             <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
//               <p className="text-xs text-gray-600 mb-1">Display Name</p>
//               <p className="text-2xl font-bold text-red-600">95%</p>
//             </div>
//             <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
//               <p className="text-xs text-gray-600 mb-1">Bio/Description</p>
//               <p className="text-2xl font-bold text-yellow-600">87%</p>
//             </div>
//             <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
//               <p className="text-xs text-gray-600 mb-1">Post Content</p>
//               <p className="text-2xl font-bold text-yellow-600">82%</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
//           <button 
//             onClick={onClose}
//             className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
//           >
//             Close
//           </button>
//           <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2">
//             <ExternalLink className="w-4 h-4" />
//             Report to Platform
//           </button>
//           <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
//             Remove from List
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ProfileDetailModal;

// Profile Detail Modal Component
'use client';
import React from 'react';
import { ExternalLink, AlertCircle, Shield, Calendar, Users, MapPin, XCircle } from 'lucide-react';
import Modal from './Modal'; // assuming you already have a generic Modal component

const ProfileDetailModal = ({ isOpen, onClose, profile }) => {
  if (!profile) return null;

  const getStatusInfo = (status) => {
    const statusMap = {
      blocked: { 
        icon: XCircle, 
        text: 'Blocked', 
        bgColor: 'bg-red-900/40', 
        textColor: 'text-red-400',
        borderColor: 'border-red-700'
      },
      reported: { 
        icon: AlertCircle, 
        text: 'Reported', 
        bgColor: 'bg-yellow-900/40', 
        textColor: 'text-yellow-400',
        borderColor: 'border-yellow-700'
      },
      pending: { 
        icon: AlertCircle, 
        text: 'Pending Review', 
        bgColor: 'bg-blue-900/40', 
        textColor: 'text-blue-400',
        borderColor: 'border-blue-700'
      }
    };
    return statusMap[status] || statusMap.pending;
  };

  const statusInfo = getStatusInfo(profile.status);
  const StatusIcon = statusInfo.icon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Profile Details" size="lg">
      <div className="space-y-6 text-gray-200">
        
        {/* Status Banner */}
        <div className={`${statusInfo.bgColor} ${statusInfo.borderColor} border rounded-lg p-4 flex items-center gap-3`}>
          <StatusIcon className={`w-6 h-6 ${statusInfo.textColor}`} />
          <div>
            <p className={`font-bold ${statusInfo.textColor}`}>{statusInfo.text}</p>
            <p className={`text-sm ${statusInfo.textColor}`}>
              This profile has been {profile.status} on {profile.blockedDate}
            </p>
          </div>
        </div>

        {/* Fake Profile Card ONLY */}
        <div className="border-2 border-red-800 rounded-lg p-5 bg-red-950/40">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-bold text-red-300">Fake Profile</h3>
          </div>
          
          <div className="mb-4">
            <div className="w-full h-48 bg-gradient-to-br from-red-600/40 to-red-900/40 rounded-lg flex items-center justify-center">
              <Users className="w-20 h-20 text-red-200 opacity-40" />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase">Profile Name</label>
              <p className="text-sm font-bold text-gray-100 mt-1">{profile.fakeProfileName}</p>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase">Username/URL</label>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-200 font-medium">{profile.fakeProfileUrl}</p>
                <button className="text-blue-400 hover:text-blue-500">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase">Platform</label>
              <p className="text-sm text-gray-200 font-medium mt-1">{profile.platform}</p>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase">Followers</label>
              <p className="text-sm text-gray-200 font-medium mt-1">{profile.followers}</p>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase">Account Created</label>
              <p className="text-sm text-gray-200 font-medium mt-1">Aug 15, 2024</p>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase">Location</label>
              <p className="text-sm text-gray-200 font-medium mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gray-400" />
                Unknown / Spoofed
              </p>
            </div>
          </div>
        </div>

        {/* Detection Analysis */}
        <div className="bg-gray-900 rounded-lg p-5 border border-gray-700">
          <h3 className="text-lg font-bold text-gray-100 mb-4">Detection Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <label className="text-xs text-gray-400 font-semibold uppercase">Similarity Score</label>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`text-3xl font-bold ${profile.similarity >= 90 ? 'text-red-400' : profile.similarity >= 75 ? 'text-yellow-400' : 'text-green-400'}`}>
                  {profile.similarity}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${profile.similarity >= 90 ? 'bg-red-500' : profile.similarity >= 75 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${profile.similarity}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <label className="text-xs text-gray-400 font-semibold uppercase">Detection Date</label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-lg font-bold text-gray-100">{profile.blockedDate}</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <label className="text-xs text-gray-400 font-semibold uppercase">Block ID</label>
              <p className="text-lg font-bold text-gray-100 mt-1">{profile.id}</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <label className="text-xs text-gray-400 font-semibold uppercase mb-2 block">Reason for Block</label>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-sm font-bold text-gray-100">{profile.reason}</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              This profile was automatically detected by our AI system and flagged for {profile.reason.toLowerCase()}. 
              The similarity score indicates a high probability of fraudulent activity.
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-700">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Report to Platform
          </button>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
            Remove from List
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileDetailModal;
