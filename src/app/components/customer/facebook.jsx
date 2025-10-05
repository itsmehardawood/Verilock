'use client';
import { AlertCircle, SearchIcon, ExternalLink, Eye } from "lucide-react";
import React, { useState } from "react";

export default function Facebook() {
  const [username, setUsername] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Sample search results data
  const [searchResults] = useState([
    {
      id: 1,
      platform: "Facebook",
      profile_name: "John Doe",
      profile_handle: "johndoe.official",
      profile_id: "123456789",
      url: "https://facebook.com/johndoe",
      profile_image: "/images/avartar-1.png",
      followers: "1.2K",
      posts: 45,
      joined_date: "2022-03-15",
      is_verified: false,
      is_duplicate: true
    },
    // {
    //   id: 2,
    //   platform: "Instagram",
    //   profile_name: "John_Doe_Real",
    //   profile_handle: "john_doe_real",
    //   profile_id: "987654321",
    //   url: "https://instagram.com/john_doe_real",
    //   profile_image: "/api/placeholder/80/80",
    //   followers: "3.4K",
    //   posts: 128,
    //   joined_date: "2021-08-22",
    //   is_verified: true,
    //   is_duplicate: false
    // }
  ]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPlatforms([...platforms, value]);
    } else {
      setPlatforms(platforms.filter((p) => p !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare payload
    const formData = {
      username,
      platforms,
    };

    console.log("Submitting data:", formData);

    // Example: send to backend
    fetch(`${API_BASE_URL}/customer/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const openModal = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProfile(null);
  };

  const handleAction = (action) => {
    console.log(`${action} clicked for profile:`, selectedProfile);
    // Handle the action here (API call, state update, etc.)
    closeModal();
  };

  return (
    <div className="bg-black rounded-xl shadow-sm border border-gray-700 p-6">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Search for Fake Profiles</h2>
        <p className="text-gray-400 mt-1">
          Enter the social media profile details to detect impersonation
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username + Search Button */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            UserName
          </label>
          <div className="flex">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter social profile name for search"
              className="flex-1 px-4 py-3 bg-gray-900 text-gray-100 border border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 rounded-r-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <SearchIcon className="w-5 h-5" />
              <span>Search</span>
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
      </form>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-700">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">
            Search Results ({searchResults.length})
          </h3>
          <div className="space-y-4">
            {searchResults.map((profile) => (
              <div
                key={profile.id}
                className="bg-gray-800/5 rounded-lg p-4 hover:bg-gray-700/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Profile Image */}
                    <div className="w-16 h-16 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={profile.profile_image} 
                        alt={profile.profile_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Profile Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-lg font-semibold text-gray-100">
                          {profile.profile_name}
                        </h4>
                        {profile.is_verified && (
                          <span className="px-2 py-1 bg-blue-900/40 text-blue-400 text-xs font-medium rounded-full border border-blue-700">
                            Verified
                          </span>
                        )}
                        {profile.is_duplicate && (
                          <span className="px-2 py-1 bg-red-900/40 text-red-400 text-xs font-medium rounded-full border border-red-700">
                            Duplicate
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Platform:</span>
                          <span className="text-gray-200 ml-2">{profile.platform}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">ID:</span>
                          <span className="text-gray-200 ml-2">{profile.profile_id}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Handle:</span>
                          <span className="text-gray-200 ml-2">{profile.profile_handle}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Followers:</span>
                          <span className="text-gray-200 ml-2">{profile.followers}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Posts:</span>
                          <span className="text-gray-200 ml-2">{profile.posts}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Joined:</span>
                          <span className="text-gray-200 ml-2">{profile.joined_date}</span>
                        </div>
                      </div>
                      
                      <a 
                        href={profile.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors mt-2 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View Profile</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* View Button */}
                  <button
                    onClick={() => openModal(profile)}
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Searches Section */}
      {/* <div className="mt-8 pt-6 border-t border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">
          Recent Searches
        </h3>
        <div className="space-y-2">
          {[
            { platform: "Instagram", username: "@johndoe", time: "2 hours ago" },
            { platform: "Facebook", username: "John Doe", time: "5 hours ago" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-100">
                    {item.username}
                  </p>
                  <p className="text-xs text-gray-400">{item.platform}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
      </div> */}

      {/* Profile Detail Modal */}
      {isModalOpen && selectedProfile && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-bold text-gray-100">Profile Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex items-start space-x-6 mb-6">
                {/* Profile Image */}
                <div className="w-20 h-20 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={selectedProfile.profile_image} 
                    alt={selectedProfile.profile_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Profile Basic Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-2xl font-bold text-gray-100">
                      {selectedProfile.profile_name}
                    </h4>
                    {selectedProfile.is_verified && (
                      <span className="px-2 py-1 bg-blue-900/40 text-blue-400 text-xs font-medium rounded-full border border-blue-700">
                        Verified
                      </span>
                    )}
                    {selectedProfile.is_duplicate && (
                      <span className="px-2 py-1 bg-red-900/40 text-red-400 text-xs font-medium rounded-full border border-red-700">
                        Duplicate
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Platform:</span>
                      <span className="text-gray-200 ml-2">{selectedProfile.platform}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Profile ID:</span>
                      <span className="text-gray-200 ml-2">{selectedProfile.profile_id}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Handle:</span>
                      <span className="text-gray-200 ml-2">{selectedProfile.profile_handle}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Followers:</span>
                      <span className="text-gray-200 ml-2">{selectedProfile.followers}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Total Posts:</span>
                      <span className="text-gray-200 ml-2">{selectedProfile.posts}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Joined Date:</span>
                      <span className="text-gray-200 ml-2">{selectedProfile.joined_date}</span>
                    </div>
                  </div>
                  
                  <a 
                    href={selectedProfile.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors mt-4"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Visit Profile on {selectedProfile.platform}</span>
                  </a>
                </div>
              </div>

              {/* Additional Details Section */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <h5 className="text-lg font-semibold text-gray-100 mb-3">Additional Information</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Account Status:</span>
                    <span className="text-gray-200 ml-2">Active</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Activity:</span>
                    <span className="text-gray-200 ml-2">2 days ago</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Profile Type:</span>
                    <span className="text-gray-200 ml-2">Personal</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Similarity Score:</span>
                    <span className="text-gray-200 ml-2">85%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => handleAction('Request Takedown')}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Request Takedown
                </button>
                <button
                  onClick={() => handleAction('Review Later')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Review Later
                </button>
                <button
                  onClick={() => handleAction('Ignore')}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Ignore
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}