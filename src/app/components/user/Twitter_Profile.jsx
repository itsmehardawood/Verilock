'use client';
import { fetchTwitterProfiles } from "@/app/lib/api/customer";
import { AlertCircle, SearchIcon, ExternalLink, Eye, CheckCircle, Lock, X } from "lucide-react";
import React, { useState } from "react";

// Profile Details Modal
function TwitterProfileDetailsModal({ isOpen, profile, onClose }) {
  if (!isOpen || !profile) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center text-center">
          <img
            src={profile.profilePicUrl || "/images/twitter.png"}
            alt={profile.username}
            className="w-24 h-24 rounded-full border border-gray-600 mb-4 object-cover"
          />
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-2xl font-semibold text-gray-100">
              {profile.fullName}
            </h3>
            {profile.verified && (
              <CheckCircle className="w-5 h-5 text-blue-400" />
            )}
          </div>
          <p className="text-gray-400 mb-3">@{profile.username}</p>

          {profile.description && (
            <p className="text-sm text-gray-300 mb-4">{profile.description}</p>
          )}

          <div className="flex justify-center gap-6 text-sm text-gray-300 mb-4">
            <span>
              <strong className="text-white">{profile.followers?.toLocaleString() || 0}</strong> Followers
            </span>
            <span>
              <strong className="text-white">{profile.following?.toLocaleString() || 0}</strong> Following
            </span>
            <span>
              <strong className="text-white">{profile.tweets?.toLocaleString() || 0}</strong> Tweets
            </span>
          </div>

          <a
            href={profile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function TwitterProfile() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [limit, setLimit] = useState(15); // Default limit to 10
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      console.log("🚀 Searching Twitter for:", username, "with limit:", limit);

      const apiResponse = await fetchTwitterProfiles(username, limit);
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

      // ✅ Transform each result using Twitter API field names
      const formattedProfiles = resultsArray.map((profile, index) => {
        console.log(`Profile ${index}:`, profile);
        
        return {
          id: profile.user_id || index,
          username: profile.screen_name || "N/A",
          fullName: profile.name || profile.screen_name || "",
          profilePicUrl: profile.avatar || "/images/twitter.png",
          profileUrl: `https://twitter.com/${profile.screen_name}/`,
          followers: profile.followers_count || 0,
          following: profile.friends_count || 0,
          tweets: profile.statuses_count || 0,
          description: profile.description || "",
          verified: profile.is_blue_verified || false,
          // Note: Twitter API response doesn't have 'protected' field in your example
          // If you need protected accounts, you'll need to check the actual API response
          protected: false, // Default to false since it's not in the example
          location: "", // Not in example response
          createdAt: profile.created_at || "",
          mediaCount: profile.media_count || 0,
        };
      });

      console.log("✅ [Formatted Profiles]:", formattedProfiles);
      setSearchResults(formattedProfiles);

    } catch (err) {
      console.error("❌ Error during handleSubmit:", err);
      setError(err.message || "An error occurred while searching profiles");
    } finally {
      setLoading(false);
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
          <h2 className="text-2xl font-bold text-gray-100">Search Twitter Profiles</h2>
          <p className="text-gray-400 mt-1">
            Enter the Twitter profile details to detect impersonation
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
                placeholder="Enter Twitter username for search"
                className="flex-1 px-4 py-3 bg-gray-900 text-gray-100 border border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
              <button
                type="submit"
                disabled={loading || !username.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-r-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SearchIcon className="w-5 h-5" />
                <span>{loading ? "Searching..." : "Search"}</span>
              </button>
            </div>
          </div>

          {/* ✅ Limit Input Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Result Limit
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full px-4 py-3 bg-gray-900 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter number of profiles to fetch"
            />
            <p className="text-xs text-gray-500 mt-1">
              Set how many profiles you want to fetch, minimum 15(default: 15)
            </p>
          </div>

          <div className="bg-blue-900/40 border border-blue-700 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-300">
              <p className="font-medium">Each search costs 1 credit</p>
              <p className="mt-1">You have 250 credits remaining</p>
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
          <h3 className="text-lg font-semibold text-gray-300 mb-4">
            Search Results ({searchResults.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map((profile, index) => (
              <div
                key={profile.id || profile.username || index}
                className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/40 transition-colors border border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <img
                      src={profile.profilePicUrl || "/images/twitter.png"}
                      alt={`${profile.fullName || profile.username} profile`}
                      className="w-16 h-16 rounded-full border border-gray-600 object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-lg font-semibold text-gray-100">
                          {profile.fullName || profile.username}
                        </h4>
                        {profile.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-400" />
                        )}
                      </div>

                      <p className="text-sm text-gray-400 mb-2">@{profile.username}</p>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Platform:</span>
                          <span className="text-gray-200 ml-2">Twitter</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Followers:</span>
                          <span className="text-gray-200 ml-2">
                            {profile.followers?.toLocaleString() || 0}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Tweets:</span>
                          <span className="text-gray-200 ml-2">
                            {profile.tweets?.toLocaleString() || 0}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Following:</span>
                          <span className="text-gray-200 ml-2">
                            {profile.following?.toLocaleString() || 0}
                          </span>
                        </div>
                      </div>

                      <a
                        onClick={(e) => handleOpenExternal(profile.profileUrl, e)}
                        className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors mt-2 text-sm cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View Profile</span>
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProfile(profile)}
                    className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-600 text-gray-200 px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Details Modal */}
      <TwitterProfileDetailsModal
        isOpen={!!selectedProfile}
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </div>
  );
}