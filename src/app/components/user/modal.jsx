'use client';
import React from 'react';
import { X } from 'lucide-react';

export default function ProfileDetailsModal({ isOpen, profile, onClose }) {
  if (!isOpen || !profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/15 backdrop-blur-xs">
      {/* Modal Container */}
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-4 border-b border-gray-700 pb-3">
          <h2 className="text-2xl font-semibold text-white">
            Profile Details
          </h2>
        </div>

        {/* Profile Info */}
        <div className="flex items-start space-x-4">
          {/* Image (if available) */}
          {profile.profile_image ? (
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={profile.profile_image}
                alt={profile.profile_name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}

          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-100 mb-1">
              {profile.profile_name || 'Unknown Name'}
            </h3>

            <div className="text-sm space-y-1">
              <p><span className="text-gray-400">Platform:</span> <span className="text-gray-200 capitalize">{profile.platform}</span></p>
              <p><span className="text-gray-400">Handle:</span> <span className="text-gray-200">{profile.profile_handle}</span></p>
              <p><span className="text-gray-400">URL:</span> <a href={profile.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{profile.url}</a></p>
              <p><span className="text-gray-400">Duplicate:</span> <span className={`font-medium ${profile.is_duplicate ? 'text-red-400' : 'text-green-400'}`}>{profile.is_duplicate ? 'Yes' : 'No'}</span></p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => console.log('Request Takedown:', profile)}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
          >
            Request Takedown
          </button>
          <button
            onClick={() => console.log('Review Later:', profile)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
          >
            Review Later
          </button>
          <button
            onClick={() => console.log('Ignore:', profile)}
            className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-5 py-2.5 rounded-lg font-medium transition"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
}


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
