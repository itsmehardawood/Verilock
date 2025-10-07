// 'use client';
// import { AlertCircle, SearchIcon, ExternalLink, Eye } from "lucide-react";
// import React, { useState } from "react";

// export default function searchProfile() {
//   const [username, setUsername] = useState('');
//   const [platforms, setPlatforms] = useState([]);

//   // Sample static results
//   const [searchResults] = useState([
//     {
//       id: 1,
//       platform: "Facebook",
//       profile_name: "John Doe",
//       profile_handle: "johndoe.official",
//       profile_id: "123456789",
//       url: "https://facebook.com/johndoe",
//       profile_image: "/images/avartar-1.png",
//       followers: "1.2K",
//       posts: 45,
//       joined_date: "2022-03-15",
//       is_verified: false,
//       is_duplicate: true
//     },
//   ]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = { username, platforms };
//     console.log("Form submitted:", formData);
//   };

//   const handleViewProfile = (profile) => {
//     console.log("View clicked for profile:", profile);
//     // You can later navigate or trigger a modal here
//   };

//   return (
//     <div className="bg-black rounded-xl shadow-sm border border-gray-700 p-6">
//       {/* Heading */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-100">Search for Fake Profiles</h2>
//         <p className="text-gray-400 mt-1">
//           Enter the social media profile details to detect impersonation
//         </p>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Username + Search Button */}
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Username
//           </label>
//           <div className="flex">
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter social profile name for search"
//               className="flex-1 px-4 py-3 bg-gray-900 text-gray-100 border border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//             />
//             <button
//               type="submit"
//               className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 rounded-r-lg transition-colors duration-200 flex items-center justify-center space-x-2"
//             >
//               <SearchIcon className="w-5 h-5" />
//               <span>Search</span>
//             </button>
//           </div>
//         </div>

//         {/* Info Box */}
//         <div className="bg-blue-900/40 border border-blue-700 rounded-lg p-4 flex items-start space-x-3">
//           <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
//           <div className="text-sm text-blue-300">
//             <p className="font-medium">Each search costs 1 credit</p>
//             <p className="mt-1">You have 250 credits remaining</p>
//           </div>
//         </div>
//       </form>

//       {/* Search Results */}
//       {searchResults.length > 0 && (
//         <div className="mt-8 pt-6 border-t border-gray-700">
//           <h3 className="text-lg font-semibold text-gray-300 mb-4">
//             Search Results ({searchResults.length})
//           </h3>
//           <div className="space-y-4">
//             {searchResults.map((profile) => (
//               <div
//                 key={profile.id}
//                 className="bg-gray-800/5 rounded-lg p-4 hover:bg-gray-700/40 transition-colors"
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start space-x-4 flex-1">
//                     {/* Profile Image */}
//                     <div className="w-16 h-16 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
//                       <img 
//                         src={profile.profile_image} 
//                         alt={profile.profile_name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
                    
//                     {/* Profile Info */}
//                     <div className="flex-1">
//                       <div className="flex items-center space-x-2 mb-1">
//                         <h4 className="text-lg font-semibold text-gray-100">
//                           {profile.profile_name}
//                         </h4>
//                         {profile.is_verified && (
//                           <span className="px-2 py-1 bg-blue-900/40 text-blue-400 text-xs font-medium rounded-full border border-blue-700">
//                             Verified
//                           </span>
//                         )}
//                         {profile.is_duplicate && (
//                           <span className="px-2 py-1 bg-red-900/40 text-red-400 text-xs font-medium rounded-full border border-red-700">
//                             Duplicate
//                           </span>
//                         )}
//                       </div>
                      
//                       <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
//                         <div>
//                           <span className="text-gray-400">Platform:</span>
//                           <span className="text-gray-200 ml-2">{profile.platform}</span>
//                         </div>
//                         <div>
//                           <span className="text-gray-400">ID:</span>
//                           <span className="text-gray-200 ml-2">{profile.profile_id}</span>
//                         </div>
//                         <div>
//                           <span className="text-gray-400">Handle:</span>
//                           <span className="text-gray-200 ml-2">{profile.profile_handle}</span>
//                         </div>
//                         <div>
//                           <span className="text-gray-400">Followers:</span>
//                           <span className="text-gray-200 ml-2">{profile.followers}</span>
//                         </div>
//                         <div>
//                           <span className="text-gray-400">Posts:</span>
//                           <span className="text-gray-200 ml-2">{profile.posts}</span>
//                         </div>
//                         <div>
//                           <span className="text-gray-400">Joined:</span>
//                           <span className="text-gray-200 ml-2">{profile.joined_date}</span>
//                         </div>
//                       </div>
                      
//                       <a 
//                         href={profile.url} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors mt-2 text-sm"
//                       >
//                         <ExternalLink className="w-4 h-4" />
//                         <span>View Profile</span>
//                       </a>
//                     </div>
//                   </div>
                  
//                   {/* View Button */}
//                   <button
//                     onClick={() => handleViewProfile(profile)}
//                     className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-lg transition-colors"
//                   >
//                     <Eye className="w-4 h-4" />
//                     <span>View</span>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// with API integration
'use client';
import { searchProfiles } from "@/app/lib/api/customer";
import { AlertCircle, SearchIcon, ExternalLink, Eye } from "lucide-react";
import React, { useState } from "react";
import ProfileDetailsModal from "./modal";
// import { searchProfiles } from "@/lib/api/customer";

export default function SearchProfile({ platform , onSearchComplete }) {
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  //for profile details view
  const [selectedProfile, setSelectedProfile] = useState(null);


  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setErrorMsg('Please enter a username to search.');
      return;
    }

    setErrorMsg('');
    setLoading(true);
    setSearchResults([]);

    try {
      const response = await searchProfiles({
        name: username,
        platforms: [platform], // send dynamic platform name
      });

      console.log(" Search request data:", response);
      if (response.success && response.data?.profiles?.length > 0) {
        setSearchResults(response.data.profiles);
        if (onSearchComplete) onSearchComplete(response.data.profiles); // Notify parent for stats update
      } else {
        setSearchResults([]);
        setErrorMsg(response.data?.message || 'No profiles found.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to fetch profiles');
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (profile) => {
    console.log("View clicked for profile:", profile);
    window.open(profile.url, "_blank");
  };

  return (
    <div className="bg-black rounded-xl shadow-sm border border-gray-700 p-6">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-100 capitalize">
          Search {platform} Profiles
        </h2>
        <p className="text-gray-400 mt-1">
          Enter a username to detect impersonation or fake accounts.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username + Search Button */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Username
          </label>
          <div className="flex">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={`Search on ${platform}...`}
              className="flex-1 px-4 bg-gray-900 text-gray-100 border border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-gray-700" : "bg-red-600 hover:bg-red-700"
              } text-white font-semibold px-6 py-3 rounded-r-lg transition-colors duration-200 flex items-center justify-center space-x-2`}
            >
              <SearchIcon className="w-5 h-5" />
              <span>{loading ? "Searching..." : "Search"}</span>
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-900/40 border border-blue-700 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-300">
            <p className="font-medium">Each search costs 1 credit</p>
            <p className="mt-1">You have 250 credits remaining</p>
          </div>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg p-3">
            {errorMsg}
          </div>
        )}
      </form>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-700">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">
            Search Results ({searchResults.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4">
            {searchResults.map((profile, index) => (
              <div
                key={index}
                className="bg-gray-800/5 rounded-lg p-4 hover:bg-gray-700/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Profile Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-lg font-semibold text-gray-100">
                          {profile.profile_name}
                        </h4>
                        {profile.is_duplicate && (
                          <span className="px-2 py-1 bg-red-900/40 text-red-400 text-xs font-medium rounded-full border border-red-700">
                            Duplicate
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Platform:</span>
                          <span className="text-gray-200 ml-2 capitalize">{profile.platform}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Social-Handle:</span>
                          <span className="text-gray-200 ml-2">{profile.profile_handle}</span>
                        </div>
                      </div>

                      {/* <a
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors mt-2 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View Profile</span>
                      </a> */}
                    </div>
                  </div>

                  {/* View Button */}
                  <button
                    // onClick={() => handleViewProfile(profile)}
                    onClick={() => setSelectedProfile(profile)}
                    className="flex items-center space-x-2 bg-red-700 hover:bg-red-600 text-gray-200 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Profile Details</span>
                  </button>
                </div>
              </div>
            ))}
            {/* Profile Details Modal Props */}
            <ProfileDetailsModal
              isOpen={!!selectedProfile}
              profile={selectedProfile}
              onClose={() => setSelectedProfile(null)}
            />

          </div>
        </div>
      )}
    </div>
  );
}

