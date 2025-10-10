'use client';
import { AlertCircle, SearchIcon, ExternalLink, Eye, CheckCircle, Lock, X } from "lucide-react";
import React, { useState } from "react";
import { fetchTikTokProfiles } from "@/app/lib/api/customer";

// Profile Details Modal
function TikTokProfileDetailsModal({ isOpen, profile, onClose }) {
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
            src={profile.profilePicUrl || "/images/tiktok.png"}
            alt={profile.username}
            className="w-24 h-24 rounded-full border border-gray-600 mb-4 object-cover"
          />
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-2xl font-semibold text-gray-100">
              {profile.nickName}
            </h3>
            {profile.verified && (
              <CheckCircle className="w-5 h-5 text-gray-100" />
            )}
          </div>
          <p className="text-gray-400 mb-3">@{profile.username}</p>

          {profile.privateAccount && (
            <div className="flex items-center gap-1 text-sm text-yellow-400 mb-3">
              <Lock className="w-4 h-4" />
              <span>Private Account</span>
            </div>
          )}

          {profile.signature && (
            <p className="text-sm text-gray-300 mb-4">{profile.signature}</p>
          )}

          <div className="flex justify-center gap-6 text-sm text-gray-300 mb-4">
            <span>
              <strong className="text-white">{profile.followers?.toLocaleString() || 0}</strong> Followers
            </span>
            <span>
              <strong className="text-white">{profile.following?.toLocaleString() || 0}</strong> Following
            </span>
            <span>
              <strong className="text-white">{profile.videos?.toLocaleString() || 0}</strong> Videos
            </span>
          </div>

          <a
            href={profile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm border border-gray-600"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function TikTokProfile() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [limit, setLimit] = useState(10);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      console.log("🚀 Searching TikTok for:", username, "with limit:", limit);

      const apiResponse = await fetchTikTokProfiles(username, limit);
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

      // ✅ Transform each result using TikTok API field names
      const formattedProfiles = resultsArray.map((profile, index) => {
        console.log(`Profile ${index}:`, profile);
        
        return {
          id: profile.id || index,
          username: profile.name || "N/A",
          nickName: profile.nickName || profile.name || "",
          profilePicUrl: profile.avatar || "/images/tiktok.png",
          profileUrl: `https://www.tiktok.com/@${profile.name}/`,
          followers: profile.fans || 0,
          following: profile.following || 0, // Note: following field not in response, you might need to add it
          videos: profile.video || 0,
          signature: profile.signature || "",
          verified: profile.verified || false,
          privateAccount: profile.privateAccount || false,
          ttSeller: profile.ttSeller || false,
          bioLink: profile.bioLink || null,
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
          <h2 className="text-2xl font-bold text-gray-100">Search TikTok Profiles</h2>
          <p className="text-gray-400 mt-1">
            Enter the TikTok profile details to detect impersonation
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
                placeholder="Enter TikTok username for search"
                className="flex-1 px-4 py-3 bg-gray-900 text-gray-100 border border-gray-600 rounded-l-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                required
              />
              <button
                type="submit"
                disabled={loading || !username.trim()}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 rounded-r-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="w-full px-4 py-3 bg-gray-900 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              placeholder="Enter number of profiles to fetch"
            />
            <p className="text-xs text-gray-500 mt-1">
              Set how many profiles you want to fetch (default: 10)
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
                      src={profile.profilePicUrl || "/images/tiktok.png"}
                      alt={`${profile.nickName || profile.username} profile`}
                      className="w-16 h-16 rounded-full border border-gray-600 object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-lg font-semibold text-gray-100">
                          {profile.nickName || profile.username}
                        </h4>
                        {profile.verified && (
                          <CheckCircle className="w-4 h-4 text-red-500" />
                        )}
                        {profile.privateAccount && (
                          <Lock className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>

                      <p className="text-sm text-gray-400 mb-2">@{profile.username}</p>

                      {profile.signature && (
                        <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                          {profile.signature}
                        </p>
                      )}

                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Platform:</span>
                          <span className="text-gray-200 ml-2">TikTok</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Followers:</span>
                          <span className="text-gray-200 ml-2">
                            {profile.followers?.toLocaleString() || 0}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Videos:</span>
                          <span className="text-gray-200 ml-2">
                            {profile.videos?.toLocaleString() || 0}
                          </span>
                        </div>
                        {profile.ttSeller && (
                          <div>
                            <span className="text-gray-400">Seller:</span>
                            <span className="text-green-400 ml-2">Yes</span>
                          </div>
                        )}
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
                    className="flex items-center space-x-2 bg-red-700 hover:bg-red-600 text-gray-200 px-4 py-2 rounded-lg transition-colors text-sm"
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
      <TikTokProfileDetailsModal
        isOpen={!!selectedProfile}
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </div>
  );
}