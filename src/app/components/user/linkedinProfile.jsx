'use client';
import { AlertCircle, SearchIcon, ExternalLink, Eye, CheckCircle, Lock, X, Building, MapPin, Users, Calendar } from "lucide-react";
import React, { useState } from "react";
import { fetchLinkedInProfiles } from "@/app/lib/api/customer";

// Profile Details Modal
function LinkedInProfileDetailsModal({ isOpen, profile, onClose }) {
  if (!isOpen || !profile) return null;

  const formatTenure = (tenure) => {
    if (!tenure) return '';
    const years = tenure.numYears || 0;
    const months = tenure.numMonths || 0;
    
    if (years === 0 && months === 0) return 'Recently started';
    if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
    if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`;
    return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full border border-gray-600 mb-4 bg-gray-700 flex items-center justify-center">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-2xl font-semibold text-gray-100">
              {profile.fullName}
            </h3>
            {profile.premium && (
              <CheckCircle className="w-5 h-5 text-yellow-500" />
            )}
          </div>
          
          <p className="text-gray-400 mb-3">{profile.headline || "LinkedIn Member"}</p>

          {!profile.openProfile && (
            <div className="flex items-center gap-1 text-sm text-yellow-400 mb-3">
              <Lock className="w-4 h-4" />
              <span>Limited Profile Access</span>
            </div>
          )}

          {profile.summary && (
            <p className="text-sm text-gray-300 mb-4 text-left w-full">{profile.summary}</p>
          )}

          {/* Current Position */}
          {profile.currentPosition && (
            <div className="w-full mb-4 p-4 bg-gray-800 rounded-lg text-left">
              <h4 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                <Building className="w-4 h-4" />
                Current Position
              </h4>
              <p className="text-gray-100 font-medium">{profile.currentPosition.title}</p>
              <p className="text-gray-300 text-sm">{profile.currentPosition.companyName}</p>
              {profile.currentPosition.tenure && (
                <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatTenure(profile.currentPosition.tenure)}
                </p>
              )}
            </div>
          )}

          {/* Location */}
          {profile.location && (
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
            </div>
          )}

          {/* Profile Type */}
          <div className="flex gap-4 text-sm text-gray-300 mb-4">
            <div className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${profile.openProfile ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
              <span>{profile.openProfile ? 'Open Profile' : 'Limited Profile'}</span>
            </div>
            {profile.premium && (
              <div className="flex items-center gap-1 text-yellow-400">
                <CheckCircle className="w-4 h-4" />
                <span>Premium</span>
              </div>
            )}
          </div>

          <a
            href={profile.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LinkedInProfile() {
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
      console.log("🚀 Searching LinkedIn for:", username, "with limit:", limit);

      const apiResponse = await fetchLinkedInProfiles(username, limit);
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

      // ✅ Transform each result using LinkedIn API field names
      const formattedProfiles = resultsArray.map((profile, index) => {
        console.log(`Profile ${index}:`, profile);
        
        const currentPosition = profile.currentPositions && profile.currentPositions.length > 0 
          ? profile.currentPositions[0] 
          : null;

        return {
          id: profile.id || index,
          username: profile.id || "N/A", // Using ID as username since no username field
          fullName: `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || "LinkedIn User",
          profileUrl: profile.pictureUrl || `https://www.linkedin.com/in/${profile.id}/overlay/photo/`,
          headline: currentPosition ? currentPosition.title : "",
          summary: profile.summary || "",
          location: profile.location?.linkedinText || "",
          openProfile: profile.openProfile || false,
          premium: profile.premium || false,
          currentPosition: currentPosition ? {
            title: currentPosition.title,
            companyName: currentPosition.companyName,
            tenure: currentPosition.tenureAtPosition,
            startedOn: currentPosition.startedOn,
            companyUrl: currentPosition.companyLinkedinUrl
          } : null,
          // LinkedIn doesn't provide profile pictures in this response
          profilePicUrl: null,
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

  const formatTenure = (tenure) => {
    if (!tenure) return '';
    const years = tenure.numYears || 0;
    const months = tenure.numMonths || 0;
    
    if (years === 0 && months === 0) return 'Recently started';
    if (years === 0) return `${months}mo`;
    if (months === 0) return `${years}y`;
    return `${years}y ${months}mo`;
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="bg-black rounded-xl shadow-sm border border-gray-700 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Search LinkedIn Profiles</h2>
          <p className="text-gray-400 mt-1">
            Enter the LinkedIn profile details to detect impersonation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name or Keywords
            </label>
            <div className="flex">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter name or keywords for search"
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
                key={profile.id || index}
                className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/40 transition-colors border border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* LinkedIn profile picture placeholder */}
                    <div className="w-16 h-16 rounded-full border border-gray-600 bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-lg font-semibold text-gray-100">
                          {profile.fullName}
                        </h4>
                        {profile.premium && (
                          <CheckCircle className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>

                      {profile.headline && (
                        <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                          {profile.headline}
                        </p>
                      )}

                      <div className="grid grid-cols-1 gap-y-2 text-sm mb-2">
                        <div>
                          <span className="text-gray-400">Platform:</span>
                          <span className="text-gray-200 ml-2">LinkedIn</span>
                        </div>
                        
                        {profile.currentPosition && (
                          <>
                            <div>
                              <span className="text-gray-400">Company:</span>
                              <span className="text-gray-200 ml-2">{profile.currentPosition.companyName}</span>
                            </div>
                            {profile.currentPosition.tenure && (
                              <div>
                                <span className="text-gray-400">Tenure:</span>
                                <span className="text-gray-200 ml-2">
                                  {formatTenure(profile.currentPosition.tenure)}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                        
                        {profile.location && (
                          <div>
                            <span className="text-gray-400">Location:</span>
                            <span className="text-gray-200 ml-2">{profile.location}</span>
                          </div>
                        )}
                        
                        <div>
                          <span className="text-gray-400">Profile:</span>
                          <span className={`ml-2 ${profile.openProfile ? 'text-green-400' : 'text-yellow-400'}`}>
                            {profile.openProfile ? 'Open' : 'Limited'}
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
      <LinkedInProfileDetailsModal
        isOpen={!!selectedProfile}
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </div>
  );
}