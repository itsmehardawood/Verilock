'use client';
import { AlertCircle, SearchIcon, ExternalLink, Eye, CheckCircle, Lock, X, Building, MapPin, Users, Calendar, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { fetchLinkedInProfiles } from "@/app/lib/api/customer";
import { useBalance } from "@/app/hooks/usebalance";
import { useReview } from "@/app/contexts/ReviewContext"; // Import the context

// Profile Details Modal
function LinkedInProfileDetailsModal({ isOpen, profile, onClose }) {
  const { addToReviewLater } = useReview(); // Use the context

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

  // ✅ NEW: Handle Review Later with Context API
  const handleReviewLater = () => {
    addToReviewLater(profile, 'LinkedIn');
    onClose();
    console.log('📝 LinkedIn profile added to review later:', profile);
  };

  // ✅ NEW: Handle Takedown
  const handleTakedown = () => {
    console.log('Request Takedown:', profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/15 backdrop-blur-xs">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-4 border-b border-gray-700 pb-3">
          <h2 className="text-2xl font-semibold text-white">
            Profile Details
          </h2>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 rounded-full border border-gray-600 bg-gray-700 flex items-center justify-center flex-shrink-0">
            <Users className="w-10 h-10 text-gray-400" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-gray-100">
                {profile.fullName}
              </h3>
              {profile.premium && (
                <CheckCircle className="w-5 h-5 text-yellow-500" />
              )}
            </div>

            <div className="text-sm space-y-2">
              <p><span className="text-gray-400">Platform:</span> <span className="text-gray-200">LinkedIn</span></p>
              <p><span className="text-gray-400">User ID:</span> <span className="text-gray-200">{profile.id}</span></p>
              
              {/* ✅ UPDATED: URL as button with background */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Profile:</span>
                <button
                  onClick={() => openProfileWindow(profile.profileUrl)}
                  className="inline-flex items-center space-x-1 bg-blue-900/30 hover:bg-blue-800/40 text-blue-400 px-3 py-1 rounded-lg text-sm border border-blue-700 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Open Profile</span>
                </button>
              </div>
              
              <p><span className="text-gray-400">Profile Type:</span> <span className={`font-medium ${profile.openProfile ? 'text-green-400' : 'text-yellow-400'}`}>{profile.openProfile ? 'Open' : 'Limited'}</span></p>
              <p><span className="text-gray-400">Premium:</span> <span className={`font-medium ${profile.premium ? 'text-yellow-400' : 'text-gray-400'}`}>{profile.premium ? 'Yes' : 'No'}</span></p>
            </div>
          </div>
        </div>

        {profile.headline && (
          <>
            <div className="border-t border-gray-700 my-4"></div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Headline</h4>
              <p className="text-sm text-gray-300">{profile.headline}</p>
            </div>
          </>
        )}

        {profile.summary && (
          <>
            <div className="border-t border-gray-700 my-4"></div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Summary</h4>
              <p className="text-sm text-gray-300">{profile.summary}</p>
            </div>
          </>
        )}

        {profile.currentPosition && (
          <>
            <div className="border-t border-gray-700 my-4"></div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Current Position</h4>
              <p className="text-sm text-gray-100 font-medium">{profile.currentPosition.title}</p>
              <p className="text-sm text-gray-300">{profile.currentPosition.companyName}</p>
              {profile.currentPosition.tenure && (
                <p className="text-sm text-gray-400 mt-1">
                  {formatTenure(profile.currentPosition.tenure)}
                </p>
              )}
            </div>
          </>
        )}

        {profile.location && (
          <>
            <div className="border-t border-gray-700 my-4"></div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Location</h4>
              <p className="text-sm text-gray-300">{profile.location}</p>
            </div>
          </>
        )}

        <div className="border-t border-gray-700 my-6"></div>
        
        {/* ✅ UPDATED: Action Buttons with Context API Integration */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleTakedown}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
          >
            Request Takedown
          </button>
          <button
            onClick={handleReviewLater}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
          >
            Review Later
          </button>
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-5 py-2.5 rounded-lg font-medium transition"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LinkedInProfile() {
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

  // ✅ NEW: Use Review Context to show count in UI (optional)
  const { reviewProfiles } = useReview();
  const linkedinReviewCount = reviewProfiles.filter(profile => profile.platform === 'LinkedIn').length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user can afford the search
    if (!canAfford) {
      setError("Insufficient credits. Please add more credits to continue searching.");
      return;
    }

    if (!username.trim()) {
      setError("Please enter a name or keywords to search");
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

      console.log("🚀 Searching LinkedIn for:", username, "with limit:", 10);

      const apiResponse = await fetchLinkedInProfiles(username, 10);
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
        setError("No profiles found for this search");
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
          username: profile.id || "N/A",
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
          profilePicUrl: null,
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

      const apiResponse = await fetchLinkedInProfiles(username, totalAfterFetch);
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
        const currentPosition = profile.currentPositions && profile.currentPositions.length > 0 
          ? profile.currentPositions[0] 
          : null;

        return {
          id: profile.id || index,
          username: profile.id || "N/A",
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
          profilePicUrl: null,
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
          
          {/* ✅ OPTIONAL: Show LinkedIn review count */}
          {linkedinReviewCount > 0 && (
            <p className="text-sm text-blue-400 mt-1">
              You have {linkedinReviewCount} LinkedIn profile{linkedinReviewCount !== 1 ? 's' : ''} in Review Later
            </p>
          )}
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
                disabled={loading || !canAfford}
              />
              <button
                type="submit"
                disabled={loading || !username.trim() || !canAfford || balanceLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-r-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-600 text-gray-200 px-4 py-2 rounded-lg transition-colors text-sm"
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
                className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-200 px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <span>Load More (10 more profiles)</span>
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
      <LinkedInProfileDetailsModal
        isOpen={!!selectedProfile}
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </div>
  );
}