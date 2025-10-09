/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { ExternalLink, Eye, CheckCircle, Lock } from "lucide-react";

// Profile Details Modal
function ProfileDetailsModal({ isOpen, profile, onClose }) {
  if (!isOpen || !profile) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
        <div className="flex flex-col items-center text-center">
          <img
            src={profile.profilePicUrl || "/images/default-avatar.png"}
            alt={profile.username}
            className="w-24 h-24 rounded-full border border-gray-600 mb-4 object-cover"
          />
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-2xl font-semibold text-gray-100">
              {profile.fullName || profile.username}
            </h3>
            {profile.verified && (
              <CheckCircle className="w-5 h-5 text-blue-500" />
            )}
          </div>
          <p className="text-gray-400 mb-3">@{profile.username}</p>

          {profile.private && (
            <div className="flex items-center gap-1 text-sm text-yellow-400 mb-3">
              <Lock className="w-4 h-4" />
              <span>Private Account</span>
            </div>
          )}

          {profile.biography && (
            <p className="text-sm text-gray-300 mb-4">{profile.biography}</p>
          )}

          <div className="flex justify-center gap-6 text-sm text-gray-300 mb-4">
            <span>
              <strong className="text-white">{profile.followers || 0}</strong> Followers
            </span>
            <span>
              <strong className="text-white">{profile.following || 0}</strong> Following
            </span>
          </div>

          <a
            href={profile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function InstagramResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    // Get results from window object (in-memory storage)
    if (typeof window !== 'undefined' && window.__instaSearchResults) {
      const results = window.__instaSearchResults;
      console.log("📦 Loaded results from memory:", results);
      setSearchResults(results);
    }
  }, []);

  const handleOpenExternal = (url, e) => {
    e.preventDefault();
    window.open(url, "_blank");
  };

  if (!searchResults.length) {
    return (
      <div className="bg-black rounded-xl shadow-sm border border-gray-700 p-6">
        <div className="text-center text-gray-400 p-10">
          <p className="text-lg mb-2">No results found</p>
          <p className="text-sm">Go back and search again.</p>
        </div>
      </div>
    );
  }

  return (
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
                {/* Profile Image */}
                <img
                  src={profile.profilePicUrl || "/images/default-avatar.png"}
                  alt={`${profile.fullName || profile.username} profile`}
                  className="w-16 h-16 rounded-full border border-gray-600 object-cover"
                />

                {/* Profile Info */}
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

              {/* View Button */}
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

      {/* Profile Details Modal */}
      <ProfileDetailsModal
        isOpen={!!selectedProfile}
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </div>
  );
}