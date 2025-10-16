// 'use client';
// import { AlertCircle, SearchIcon, ExternalLink, Eye, CheckCircle, Lock, X } from "lucide-react";
// import React, { useState } from "react";
// import { fetchInstagramProfiles } from "@/app/lib/api/customer";
// import ExternalLinkModal, { InstagramExternalProfileModal } from "./ExternalLinkModal";
// import { useAuth } from "@/app/contexts/authContext";
// import ExternalLinkModal_Embed from "./ExternalLinkModal";
// import ExternalLinkModal_Screenshot from "./ExternalLinkModal";
// // import ProfileDetailsModal from "./modal";

// // // Profile Details Modal
// function ProfileDetailsModal({ isOpen, profile, onClose }) {
//   if (!isOpen || !profile) return null;

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//       <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-lg relative">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-400 hover:text-white"
//         >
//           <X className="w-5 h-5" />
//         </button>
//         <div className="flex flex-col items-center text-center">
//           <img
//             src={getProxiedImageUrl(profile.profilePicUrl) || "/images/instagram.png"}
//             alt={profile.username}
//             className="w-24 h-24 rounded-full border border-gray-600 mb-4 object-cover"
//           />
//           <div className="flex items-center gap-2 mb-1">
//             <h3 className="text-2xl font-semibold text-gray-100">
//               {profile.fullName || profile.username}
//             </h3>
//             {profile.verified && (
//               <CheckCircle className="w-5 h-5 text-blue-500" />
//             )}
//           </div>
//           <p className="text-gray-400 mb-3">@{profile.username}</p>

//           {profile.private && (
//             <div className="flex items-center gap-1 text-sm text-yellow-400 mb-3">
//               <Lock className="w-4 h-4" />
//               <span>Private Account</span>
//             </div>
//           )}

//           {profile.biography && (
//             <p className="text-sm text-gray-300 mb-4">{profile.biography}</p>
//           )}

//           <div className="flex justify-center gap-6 text-sm text-gray-300 mb-4">
//             <span>
//               <strong className="text-white">{profile.followers?.toLocaleString() || 0}</strong> Followers
//             </span>
//             <span>
//               <strong className="text-white">{profile.following?.toLocaleString() || 0}</strong> Following
//             </span>
//             <span>
//               <strong className="text-white">{profile.postsCount?.toLocaleString() || 0}</strong> Posts
//             </span>
//           </div>

//           <a
//             onClick={() => {
//               onClose(); // Close the details modal
              
//               // This will be handled by the parent component's externalModalUrl state
//             }}
//             href={profile.profileUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
//           >
//             <ExternalLink className="w-4 h-4" />
//             <span>Open Profile</span>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Add this helper function at the top of your component
// const getProxiedImageUrl = (url) => {
//   if (!url || url.includes('/api/proxy/image') || url.includes('/images/')) {
//     return url;
//   }
//   return `/api/proxy/image?url=${encodeURIComponent(url)}`;
// };

// export default function InstaProfile() {
//   const [username, setUsername] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchResults, setSearchResults] = useState([]);
//   const [limit, setLimit] = useState(10);
//   const [selectedProfile, setSelectedProfile] = useState(null);
//   const [externalModalUrl, setExternalModalUrl] = useState(null); // New state for external modal
//   const [externalProfileModal, setExternalProfileModal] = useState(null);
//   const { isAuthenticated, login  } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSearchResults([]);

//     try {
//       console.log("🚀 Searching Instagram for:", username ,"with limit:", limit);

//       const apiResponse = await fetchInstagramProfiles(username, limit);
//       console.log("📦 [Full API Response]:", apiResponse);

//       // ✅ Extract the results array from the API response
//       const resultsArray =
//         Array.isArray(apiResponse) &&
//         apiResponse.length > 0 &&
//         Array.isArray(apiResponse[0].results)
//           ? apiResponse[0].results
//           : [];

//       console.log("✅ [Extracted Results Array]:", resultsArray);

//       if (!resultsArray.length) {
//         console.warn("⚠️ No profiles found");
//         setError("No profiles found for this username");
//         return;
//       }

//       // ✅ Transform each result - using CORRECT Instagram API field names
//       const formattedProfiles = resultsArray.map((profile, index) => {
//         console.log(`Profile ${index}:`, profile);
        
//         return {
//           id: profile.id || index,
//           username: profile.username || "N/A",
//           fullName: profile.fullName || profile.username || "",
//           profilePicUrl: profile.profilePicUrl || profile.profilePicUrlHD || "/images/instagram.png",
//           profileUrl: profile.url || `https://www.instagram.com/${profile.username}/`,
//           followers: profile.followersCount || 0,
//           following: profile.followsCount || 0, // Note: "followsCount" is the correct field
//           postsCount: profile.postsCount || 0,
//           biography: profile.biography || "",
//           verified: profile.verified || false,
//           private: profile.private || false,
//           isBusinessAccount: profile.isBusinessAccount || false,
//           businessCategoryName: profile.businessCategoryName || null,
//           externalUrls: profile.externalUrls || [],
//         };
//       });

//       console.log("✅ [Formatted Profiles]:", formattedProfiles);
//       setSearchResults(formattedProfiles);

//     } catch (err) {
//       console.error("❌ Error during handleSubmit:", err);
//       setError(err.message || "An error occurred while searching profiles");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openProfileWindow = (url) => {
//     const width = 450;
//     const height = 700;
//     // calculate center position
//     const left = window.screenX + (window.outerWidth - width) / 2;
//     const top = window.screenY + (window.outerHeight - height) / 2;
//     // window.open(
//     //   url,
//     //   "_blank",
//     //   "width=440,height=570,noopener,noreferrer,resizable,scrollbars,status=no,toolbar=no,menubar=no"
//     // );
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
//     `.replace(/\s+/g, ""); // remove whitespace for safety

//     window.open(url, "_blank", features);
// };

//   const handleOpenExternal = (url, e) => {
//     e.preventDefault();
//     window.open(url, "_blank");
//   };

//   // Updated function to open external link in modal
//   const handleOpenExternalModal = (url, e) => {
//     e.preventDefault();
//     e.stopPropagation(); // Prevent any parent event handlers
//     setExternalModalUrl(url);
//   };

//   // Function to close external modal
//   const handleCloseExternalModal = () => {
//     setExternalModalUrl(null);
//   };

 
//    // Handle opening external profile
//   // const handleOpenExternalProfile = (profile) => {
//   //   if (!isAuthenticated) {
//   //     // If not authenticated, trigger login first
//   //     login();
//   //     return;
//   //   }
//   //   setExternalProfileModal(profile);
//   // };
  
//   // Handle Connect Account button click
//   // const handleConnectAccount = () => {
//   //   login(); // This will redirect to Instagram OAuth
//   // };

  

//   return (
//     <div className="space-y-6">
//       {/* Search Form */}
//       <div className="bg-black rounded-xl shadow-sm border border-gray-700 p-6">
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-100">Search Instagram Profiles</h2>
//           <p className="text-gray-400 mt-1">
//             Enter the social media profile details to detect impersonation
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Username
//             </label>
//             <div className="flex">
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Enter social profile name for search"
//                 className="flex-1 px-4 py-3 bg-gray-900 text-gray-100 border border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                 required
//               />
//               <button
//                 type="submit"
//                 disabled={loading || !username.trim()}
//                 className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 rounded-r-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <SearchIcon className="w-5 h-5" />
//                 <span>{loading ? "Searching..." : "Search"}</span>
//               </button>
//             </div>
//           </div>

//           {/* ✅ Limit Input Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Result Limit
//             </label>
//             <input
//               type="number"
//               min="1"
//               max="100"
//               value={limit}
//               onChange={(e) => setLimit(Number(e.target.value))}
//               className="w-full px-4 py-3 bg-gray-900 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//               placeholder="Enter number of profiles to fetch"
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Set how many profiles you want to fetch (default: 10)
//             </p>
//           </div>

//           <div className="bg-blue-900/40 border border-blue-700 rounded-lg p-4 flex items-start space-x-3">
//             <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
//             <div className="text-sm text-blue-300">
//               <p className="font-medium">Each search costs 1 credit</p>
//               <p className="mt-1">You have 250 credits remaining</p>
//             </div>
//           </div>

//           {error && (
//             <div className="bg-red-900/40 border border-red-700 rounded-lg p-4">
//               <p className="text-red-400 text-sm">{error}</p>
//             </div>
//           )}
//         </form>
//       </div>

//       {/* Auth Status Banner */}
//       {/* <div className={`rounded-lg p-4 border ${isAuthenticated ? 'bg-green-900/20 border-green-700' : 'bg-yellow-900/20 border-yellow-700'}`}>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className={`w-3 h-3 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
//             <span className="text-gray-300">
//               Instagram: {isAuthenticated ? 'Connected' : 'Not Connected'}
//             </span>
//             {loading && (
//               <span className="text-sm text-gray-400">(Checking...)</span>
//             )}
//           </div>
//           {!isAuthenticated && (
//             <button
//               onClick={handleConnectAccount}
//               disabled={loading}
//               className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//             >
//               {loading ? 'Connecting...' : 'Connect Account'}
//             </button>
//           )}
//         </div>
//       </div> */}

//       {/* Search Results */}
//       {searchResults.length > 0 && (
//         <div className="bg-black rounded-xl shadow-sm border border-gray-700 p-6">
//           <h3 className="text-lg font-semibold text-gray-300 mb-4">
//             Search Results ({searchResults.length})
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {searchResults.map((profile, index) => (
//               <div
//                 key={profile.id || profile.username || index}
//                 className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/40 transition-colors border border-gray-700"
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start space-x-4 flex-1">
//                     <img
//                       src={getProxiedImageUrl(profile.profilePicUrl) || "/images/instagram.png"}
//                       alt={`${profile.fullName || profile.username} profile`}
//                       className="w-16 h-16 rounded-full border border-gray-600 object-cover"
//                     />

//                     <div className="flex-1">
//                       <div className="flex items-center space-x-2 mb-1">
//                         <h4 className="text-lg font-semibold text-gray-100">
//                           {profile.fullName || profile.username}
//                         </h4>
//                         {profile.verified && (
//                           <CheckCircle className="w-4 h-4 text-blue-500" />
//                         )}
//                         {profile.private && (
//                           <Lock className="w-4 h-4 text-yellow-400" />
//                         )}
//                       </div>

//                       <p className="text-sm text-gray-400 mb-2">@{profile.username}</p>

//                       <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
//                         <div>
//                           <span className="text-gray-400">Platform:</span>
//                           <span className="text-gray-200 ml-2">Instagram</span>
//                         </div>
//                         <div>
//                           <span className="text-gray-400">Followers:</span>
//                           <span className="text-gray-200 ml-2">
//                             {profile.followers?.toLocaleString() || 0}
//                           </span>
//                         </div>
//                         <div>
//                           <span className="text-gray-400">Following:</span>
//                           <span className="text-gray-200 ml-2">
//                             {profile.following?.toLocaleString() || 0}
//                           </span>
//                         </div>
//                         <div>
//                           <span className="text-gray-400">Posts:</span>
//                           <span className="text-gray-200 ml-2">
//                             {profile.postsCount?.toLocaleString() || 0}
//                           </span>
//                         </div>
//                       </div>

//                       {profile.isBusinessAccount && (
//                         <div className="text-xs text-green-400 mt-1">
//                           Business Account
//                           {profile.businessCategoryName && ` • ${profile.businessCategoryName}`}
//                         </div>
//                       )}

//                       {/* Updated "View Profile" button to open modal */}
//                       <button
//                         // onClick={(e) => handleOpenExternalModal(profile.profileUrl, e)}
//                         onClick={(e) => openProfileWindow(profile.profileUrl, e)}
                        
//                         // onClick={() => handleOpenExternalProfile(profile)}
//                         className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors mt-2 text-sm cursor-pointer"
//                       >
//                         <ExternalLink className="w-4 h-4" />
//                         <span>View Profile</span>
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => setSelectedProfile(profile)}
//                     className="flex items-center space-x-2 bg-red-700 hover:bg-red-600 text-gray-200 px-4 py-2 rounded-lg transition-colors text-sm"
//                   >
//                     <Eye className="w-4 h-4" />
//                     <span>Details</span>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Load More Button */}
//           {hasMore && (
//             <div className="flex justify-center">
//               <button
//                 onClick={handleLoadMore}
//                 disabled={loadingMore}
//                 className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-200 px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loadingMore ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     <span>Loading...</span>
//                   </>
//                 ) : (
//                   <span>Load More (10 more profiles)</span>
//                 )}
//               </button>
//             </div>
//           )}

//           {/* Maximum reached message */}
//           {totalFetched >= 30 && (
//             <div className="text-center text-gray-400 text-sm mt-4">
//               Maximum of 30 profiles reached
//             </div>
//           )}
//         </div>
//       )}

//       {/* Profile Details Modal */}
//       <ProfileDetailsModal
//         isOpen={!!selectedProfile}
//         profile={selectedProfile}
//         onClose={() => setSelectedProfile(null)}
//       />

//       {/* New External Profile Modal */}
//       {/* <InstagramExternalProfileModal
//         isOpen={!!externalProfileModal}
//         profile={externalProfileModal}
//         onClose={handleCloseExternalProfile}
//       /> */}

//     {/* <ExternalLinkModal_Embed
//       isOpen={!!externalModalUrl}
//       url={externalModalUrl}
//       onClose={handleCloseExternalModal}
//     /> */}

//     {/* <ExternalLinkModal_Screenshot
//   isOpen={!!externalModalUrl}
//   url={externalModalUrl}
//   onClose={handleCloseExternalModal}
// /> */}
//     </div>
//   );
// }


'use client';
import { AlertCircle, SearchIcon, ExternalLink, Eye, CheckCircle, Lock, X, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { fetchInstagramProfiles } from "@/app/lib/api/customer";
import { useBalance } from "@/app/hooks/usebalance";

// Profile Details Modal
function ProfileDetailsModal({ isOpen, profile, onClose }) {
  if (!isOpen || !profile) return null;

  const getProxiedImageUrl = (url) => {
    if (!url || url.includes('/api/proxy/image') || url.includes('/images/')) {
      return url;
    }
    return `/api/proxy/image?url=${encodeURIComponent(url)}`;
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
          {/* Profile Image */}
          <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={getProxiedImageUrl(profile.profilePicUrl) || "/images/instagram.png"}
              alt={`${profile.fullName || profile.username} profile`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-gray-100">
                {profile.fullName || profile.username}
              </h3>
              {profile.verified && (
                <CheckCircle className="w-5 h-5 text-blue-500" />
              )}
            </div>

            <div className="text-sm space-y-1">
              <p><span className="text-gray-400">Platform:</span> <span className="text-gray-200 capitalize">Instagram</span></p>
              <p><span className="text-gray-400">Handle:</span> <span className="text-gray-200">@{profile.username}</span></p>
              <p><span className="text-gray-400">URL:</span> <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{profile.profileUrl}</a></p>
              
              {profile.private && (
                <p><span className="text-gray-400">Status:</span> <span className="text-yellow-400 flex items-center gap-1"><Lock className="w-3 h-3" /> Private Account</span></p>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Profile Stats */}
        <div className="flex justify-evenly gap-6 text-sm text-gray-300 mb-4">
          <div className="text-center">
            <strong className="text-white text-lg block">{profile.followers?.toLocaleString() || 0}</strong>
            <span className="text-gray-400">Followers</span>
          </div>
          <div className="text-center">
            <strong className="text-white text-lg block">{profile.following?.toLocaleString() || 0}</strong>
            <span className="text-gray-400">Following</span>
          </div>
          <div className="text-center">
            <strong className="text-white text-lg block">{profile.postsCount?.toLocaleString() || 0}</strong>
            <span className="text-gray-400">Posts</span>
          </div>
        </div>

        {/* Biography */}
        {profile.biography && (
          <div className="mb-6">
            <h4 className="text-gray-400 text-sm font-medium mb-2">Bio</h4>
            <p className="text-gray-300 text-sm bg-gray-800/50 rounded-lg p-3">
              {profile.biography}
            </p>
          </div>
        )}

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          {profile.isBusinessAccount && (
            <div>
              <span className="text-gray-400">Account Type:</span>
              <span className="text-green-400 ml-2">Business</span>
              {profile.businessCategoryName && (
                <div className="text-gray-300 text-xs mt-1">{profile.businessCategoryName}</div>
              )}
            </div>
          )}
          {profile.externalUrls && profile.externalUrls.length > 0 && (
            <div>
              <span className="text-gray-400">External Links:</span>
              <span className="text-gray-200 ml-2">{profile.externalUrls.length}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={(e) => openProfileWindow(profile.profileUrl, e)}
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

// Helper function for proxied images
const getProxiedImageUrl = (url) => {
  if (!url || url.includes('/api/proxy/image') || url.includes('/images/')) {
    return url;
  }
  return `/api/proxy/image?url=${encodeURIComponent(url)}`;
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

export default function InstaProfile() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  
  // New states for load more functionality
  const [currentLimit, setCurrentLimit] = useState(10);
  const [hasMore, setHasMore] = useState(false);
  const [totalFetched, setTotalFetched] = useState(0);

  // Use balance hook
  const { balance, deductCredit, isLoading: balanceLoading, canAfford } = useBalance(250);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user can afford the search
    if (!canAfford) {
      setError("Insufficient credits. Please add more credits to continue searching.");
      return;
    }

    if (!username.trim()) {
      setError("Please enter a username to search");
      return;
    }

    setLoading(true);
    setError(null);
    setSearchResults([]);
    setCurrentLimit(10);
    setTotalFetched(0);
    setHasMore(false);

    try {
      // First deduct the credit
      const newBalance = await deductCredit(1);
      console.log("💰 Credit deducted. New balance:", newBalance);

      console.log("🚀 Searching Instagram for:", username, "with limit:", 10);

      const apiResponse = await fetchInstagramProfiles(username, 10);
      console.log("📦 [Full API Response]:", apiResponse);

      // ✅ Extract the results array from the API response
      const resultsArray =
        Array.isArray(apiResponse) &&
        apiResponse.length > 0 &&
        Array.isArray(apiResponse[0].results)
          ? apiResponse[0].results
          : [];

      console.log("✅ [Extracted Results Array]:", resultsArray);

      if (!resultsArray.length) {
        console.warn("⚠️ No profiles found");
        setError("No profiles found for this username");
        return;
      }

      // ✅ Transform each result
      const formattedProfiles = resultsArray.map((profile, index) => {
        console.log(`Profile ${index}:`, profile);
        
        return {
          id: profile.id || index,
          username: profile.username || "N/A",
          fullName: profile.fullName || profile.username || "",
          profilePicUrl: profile.profilePicUrl || profile.profilePicUrlHD || "/images/instagram.png",
          profileUrl: profile.url || `https://www.instagram.com/${profile.username}/`,
          followers: profile.followersCount || 0,
          following: profile.followsCount || 0,
          postsCount: profile.postsCount || 0,
          biography: profile.biography || "",
          verified: profile.verified || false,
          private: profile.private || false,
          isBusinessAccount: profile.isBusinessAccount || false,
          businessCategoryName: profile.businessCategoryName || null,
          externalUrls: profile.externalUrls || [],
        };
      });

      console.log("✅ [Formatted Profiles]:", formattedProfiles);
      setSearchResults(formattedProfiles);
      setTotalFetched(formattedProfiles.length);
      
      // Check if we can load more (total fetched < 30)
      if (formattedProfiles.length === 10 && formattedProfiles.length < 30) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }

    } catch (err) {
      console.error("❌ Error during handleSubmit:", err);
      if (err.message.includes('Insufficient credits')) {
        setError("Insufficient credits. Please add more credits to continue searching.");
      } else {
        setError(err.message || "An error occurred while searching profiles");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loadingMore || totalFetched >= 30) return;
    
    setLoadingMore(true);
    setError(null);

    try {
      const nextLimit = 10;
      const totalAfterFetch = totalFetched + nextLimit;
      
      console.log("🔄 Loading more profiles:", nextLimit, "Total will be:", totalAfterFetch);

      const apiResponse = await fetchInstagramProfiles(username, totalAfterFetch);
      console.log("📦 [Load More API Response]:", apiResponse);

      // ✅ Extract the results array from the API response
      const resultsArray =
        Array.isArray(apiResponse) &&
        apiResponse.length > 0 &&
        Array.isArray(apiResponse[0].results)
          ? apiResponse[0].results
          : [];

      if (!resultsArray.length) {
        setHasMore(false);
        return;
      }

      // ✅ Transform each result
      const formattedProfiles = resultsArray.map((profile, index) => {
        return {
          id: profile.id || index,
          username: profile.username || "N/A",
          fullName: profile.fullName || profile.username || "",
          profilePicUrl: profile.profilePicUrl || profile.profilePicUrlHD || "/images/instagram.png",
          profileUrl: profile.url || `https://www.instagram.com/${profile.username}/`,
          followers: profile.followersCount || 0,
          following: profile.followsCount || 0,
          postsCount: profile.postsCount || 0,
          biography: profile.biography || "",
          verified: profile.verified || false,
          private: profile.private || false,
          isBusinessAccount: profile.isBusinessAccount || false,
          businessCategoryName: profile.businessCategoryName || null,
          externalUrls: profile.externalUrls || [],
        };
      });

      console.log("✅ [Updated Profiles after Load More]:", formattedProfiles);
      setSearchResults(formattedProfiles);
      setTotalFetched(formattedProfiles.length);
      setCurrentLimit(totalAfterFetch);
      
      // Check if we can load more (max 30 profiles)
      if (formattedProfiles.length >= 30 || formattedProfiles.length < totalAfterFetch) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

    } catch (err) {
      console.error("❌ Error during load more:", err);
      setError(err.message || "An error occurred while loading more profiles");
    } finally {
      setLoadingMore(false);
    }
  };

  const handleOpenExternal = (url, e) => {
    e.preventDefault();
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="bg-black rounded-xl shadow-sm border border-gray-700 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Search Instagram Profiles</h2>
          <p className="text-gray-400 mt-1">
            Enter the social media profile details to detect impersonation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <div className="flex">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter social profile name for search"
                className="flex-1 px-4 py-3 bg-gray-900 text-gray-100 border border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
                disabled={loading || !canAfford}
              />
              <button
                type="submit"
                disabled={loading || !username.trim() || !canAfford || balanceLoading}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 rounded-r-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <SearchIcon className="w-5 h-5" />
                )}
                <span>{loading ? "Searching..." : "Search"}</span>
              </button>
            </div>
          </div>

          {/* Credit Information */}
          <div className="bg-blue-900/40 border border-blue-700 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-300">
              <p className="font-medium">Each search costs 1 credit</p>
              <p className="mt-1">
                You have {balance} credit{balance !== 1 ? 's' : ''} remaining
                {balanceLoading && <span className="ml-2">(Processing...)</span>}
              </p>
              {!canAfford && (
                <p className="mt-1 text-red-300 font-medium">
                  Insufficient credits. Please add more credits to search.
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-900/40 border border-red-700 rounded-lg p-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </form>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-black rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-300">
              Search Results ({searchResults.length})
            </h3>
            {totalFetched > 0 && (
              <span className="text-sm text-gray-400">
                Showing {searchResults.length} of maximum 30 profiles
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {searchResults.map((profile, index) => (
              <div
                key={profile.id || profile.username || index}
                className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/40 transition-colors border border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <img
                      src={getProxiedImageUrl(profile.profilePicUrl) || "/images/instagram.png"}
                      alt={`${profile.fullName || profile.username} profile`}
                      className="w-16 h-16 rounded-full border border-gray-600 object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-lg font-semibold text-gray-100">
                          {profile.fullName || profile.username}
                        </h4>
                        {profile.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        )}
                        {profile.private && (
                          <Lock className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>

                      <p className="text-sm text-gray-400 mb-2">@{profile.username}</p>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Platform:</span>
                          <span className="text-gray-200 ml-2">Instagram</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Followers:</span>
                          <span className="text-gray-200 ml-2">
                            {profile.followers?.toLocaleString() || 0}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Following:</span>
                          <span className="text-gray-200 ml-2">
                            {profile.following?.toLocaleString() || 0}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Posts:</span>
                          <span className="text-gray-200 ml-2">
                            {profile.postsCount?.toLocaleString() || 0}
                          </span>
                        </div>
                      </div>

                      <a
                        onClick={(e) => openProfileWindow(profile.profileUrl, e)}
                        className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors mt-2 text-sm cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View Profile</span>
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProfile(profile)}
                    className="flex items-center space-x-2 bg-red-700 hover:bg-red-600 text-gray-200 px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-500 text-gray-200 px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <span>Load More</span>
                )}
              </button>
            </div>
          )}

          {/* Maximum reached message */}
          {totalFetched >= 30 && (
            <div className="text-center text-gray-400 text-sm mt-4">
              Maximum of 30 profiles reached
            </div>
          )}
        </div>
      )}

      {/* Profile Details Modal */}
      <ProfileDetailsModal
        isOpen={!!selectedProfile}
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </div>
  );
}