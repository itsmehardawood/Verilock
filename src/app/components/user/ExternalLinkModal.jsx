// 'use client';
// import React from 'react';
// import { X } from 'lucide-react';

// export default function ExternalLinkModal({ isOpen, url, onClose }) {
//   if (!isOpen || !url) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//       <div className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-xl w-[90%] h-[90%] overflow-hidden">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         {/* Iframe showing external page */}
//         <iframe
//           src={url}
//           title="External Profile"
//           className="w-full h-full border-0 rounded-2xl"
//         />
//       </div>
//     </div>
//   );
// }


// components/InstagramExternalProfileModal.jsx
// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import { X, ExternalLink, Lock, AlertCircle, RefreshCw, Shield } from 'lucide-react';
// import { useAuth } from '@/app/contexts/authContext';
// // import { useAuth } from '@/app/contexts/AuthContext';

// export function InstagramExternalProfileModal({ isOpen, profile, onClose }) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [retryCount, setRetryCount] = useState(0);
//   const iframeRef = useRef(null);
//   const { isAuthenticated, login, getAccessToken } = useAuth();

//   useEffect(() => {
//     if (isOpen) {
//       setLoading(true);
//       setError(null);
//       setRetryCount(0);
//     }
//   }, [isOpen]);

//   const handleIframeLoad = () => {
//     setLoading(false);
//     setError(null);
//   };

//   const handleIframeError = () => {
//     setLoading(false);
//     setError('Failed to load Instagram profile. Please try again.');
//   };

//   const handleRetry = () => {
//     setLoading(true);
//     setError(null);
//     setRetryCount(prev => prev + 1);
    
//     // Force iframe reload
//     if (iframeRef.current) {
//       iframeRef.current.src = iframeRef.current.src;
//     }
//   };

//   const handleExternalOpen = () => {
//     window.open(profile.profileUrl, '_blank', 'noopener,noreferrer');
//   };

//   const getEmbedUrl = () => {
//     if (!isAuthenticated || !profile?.profileUrl) return null;
    
//     // Create a secure embed URL that proxies through your server
//     const embedUrl = new URL('/api/instagram/embed', window.location.origin);
//     embedUrl.searchParams.set('profile_url', encodeURIComponent(profile.profileUrl));
//     embedUrl.searchParams.set('username', profile.username);
//     embedUrl.searchParams.set('retry', retryCount.toString());
    
//     return embedUrl.toString();
//   };

//   if (!isOpen || !profile) return null;

//   return (
//     <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
//       <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800/50">
//           <div className="flex items-center space-x-4">
//             <img
//               src={profile.profilePicUrl || "/images/instagram.png"}
//               alt={profile.username}
//               className="w-12 h-12 rounded-full border-2 border-gray-600 object-cover"
//             />
//             <div>
//               <h3 className="text-xl font-bold text-gray-100 flex items-center gap-2">
//                 {profile.fullName || profile.username}
//                 {profile.verified && (
//                   <Shield className="w-5 h-5 text-blue-400" />
//                 )}
//               </h3>
//               <p className="text-gray-400">@{profile.username}</p>
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-3">
//             {/* Stats */}
//             <div className="hidden md:flex items-center space-x-4 text-sm text-gray-300 mr-4">
//               <span><strong className="text-white">{profile.followers?.toLocaleString()}</strong> followers</span>
//               <span><strong className="text-white">{profile.following?.toLocaleString()}</strong> following</span>
//               <span><strong className="text-white">{profile.postsCount?.toLocaleString()}</strong> posts</span>
//             </div>
            
//             <button
//               onClick={handleExternalOpen}
//               className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
//             >
//               <ExternalLink className="w-4 h-4" />
//               <span>Open Original</span>
//             </button>
            
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         {/* Authentication Required State */}
//         {!isAuthenticated && (
//           <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-800/30">
//             <div className="text-center max-w-md">
//               <Lock className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
//               <h4 className="text-2xl font-bold text-gray-100 mb-3">
//                 Connect Instagram
//               </h4>
//               <p className="text-gray-400 mb-2">
//                 To view Instagram profiles securely within the app, you need to connect your Instagram account.
//               </p>
//               <p className="text-sm text-gray-500 mb-6">
//                 This ensures secure access and better user experience.
//               </p>
//               <button
//                 onClick={login}
//                 className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
//               >
//                 Connect Instagram Account
//               </button>
//               <button
//                 onClick={handleExternalOpen}
//                 className="mt-4 text-gray-400 hover:text-gray-300 text-sm underline"
//               >
//                 Or open in new tab instead
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Loading State */}
//         {isAuthenticated && loading && (
//           <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-800/30">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
//               <h4 className="text-lg font-semibold text-gray-100 mb-2">
//                 Loading Instagram Profile
//               </h4>
//               <p className="text-gray-400 text-sm">
//                 Securely loading content from Instagram...
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Error State */}
//         {isAuthenticated && error && (
//           <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-800/30">
//             <div className="text-center max-w-md">
//               <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
//               <h4 className="text-xl font-semibold text-gray-100 mb-3">
//                 Failed to Load Profile
//               </h4>
//               <p className="text-gray-400 mb-2">{error}</p>
//               <p className="text-sm text-gray-500 mb-6">
//                 This might be due to network issues or Instagram restrictions.
//               </p>
//               <div className="flex items-center justify-center space-x-3">
//                 <button
//                   onClick={handleRetry}
//                   className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
//                 >
//                   <RefreshCw className="w-4 h-4" />
//                   <span>Try Again</span>
//                 </button>
//                 <button
//                   onClick={handleExternalOpen}
//                   className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
//                 >
//                   <ExternalLink className="w-4 h-4" />
//                   <span>Open Externally</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Embedded Content */}
//         {isAuthenticated && !loading && !error && getEmbedUrl() && (
//           <div className="flex-1 relative bg-white">
//             <iframe
//               ref={iframeRef}
//               src={getEmbedUrl()}
//               className="w-full h-full border-0"
//               title={`Instagram profile of ${profile.username}`}
//               sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
//               onLoad={handleIframeLoad}
//               onError={handleIframeError}
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             />
            
//             {/* Security Badge */}
//             <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm">
//               🔒 Secure Instagram Embed
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function ExternalLinkModal_Embed({ isOpen, url, onClose }) {
  useEffect(() => {
    if (isOpen && url && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [isOpen, url]);

  if (!isOpen || !url) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-xl w-[90%] h-[90%] overflow-hidden p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Embed */}
        <div className="w-full h-full flex justify-center items-center overflow-y-auto">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{
              background: '#000',
              border: 0,
              margin: '0 auto',
              maxWidth: '90%',
              width: '100%',
            }}
          ></blockquote>
          <script async src="//www.instagram.com/embed.js"></script>
        </div>
      </div>
    </div>
  );
}


// 'use client';
// import React, { useEffect, useState } from 'react';
// import { X, Loader2 } from 'lucide-react';

// export default function ExternalLinkModal_Screenshot({ isOpen, url, onClose }) {
//   const [imageUrl, setImageUrl] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!isOpen || !url) return;
//     const getScreenshot = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`/api/screenshot?url=${encodeURIComponent(url)}`);
//         const data = await res.json();
//         if (data.success) setImageUrl(data.imageUrl);
//       } catch (e) {
//         console.error('Screenshot failed', e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getScreenshot();
//   }, [url, isOpen]);

//   if (!isOpen || !url) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//       <div className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-xl w-[90%] h-[90%] overflow-hidden">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         {/* Screenshot View */}
//         <div className="flex items-center justify-center w-full h-full">
//           {loading ? (
//             <div className="text-gray-400 flex flex-col items-center">
//               <Loader2 className="animate-spin w-10 h-10 mb-2" />
//               <p>Generating preview...</p>
//             </div>
//           ) : imageUrl ? (
//             <img
//               src={imageUrl}
//               alt="Website Preview"
//               className="max-w-full max-h-full object-contain rounded-lg"
//             />
//           ) : (
//             <p className="text-gray-400">Could not load preview</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
