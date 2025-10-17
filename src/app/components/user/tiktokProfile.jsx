'use client';
import { AlertCircle, SearchIcon, ExternalLink, Eye, CheckCircle, Lock, X, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { fetchTikTokProfiles } from "@/app/lib/api/customer";
import { useBalance } from "@/app/hooks/usebalance";
import { useReview } from "@/app/contexts/ReviewContext"; // Import the context

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Profile Details Modal
function TikTokProfileDetailsModal({ isOpen, profile, onClose }) {
  const { addToReviewLater } = useReview();
  const [isReporting, setIsReporting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  if (!isOpen || !profile) return null;

  const openProfileWindow = (url) => {
    const width = 450;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 1;
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

  // ✅ NEW: Handle Reported Successfully
  const handleReportSuccessfully = async () => {
    setIsReporting(true);
    try {
      // Get user_id from localStorage (logged in user)
      const user_id = localStorage.getItem('user_id') || localStorage.getItem('userId');
      
      if (!user_id) {
        throw new Error('User not found. Please login again.');
      }

      // Prepare report data according to API requirements
      const reportData = {
        reportedProfile: {
          id: profile.id.toString(), // Convert to string as required
          platform: "TikTok",
          username: profile.username,
          fullName: profile.nickName || profile.username, // Use nickName as fullName for TikTok
          profileUrl: profile.profileUrl,
          profilePicUrl: profile.profilePicUrl,
          followers: profile.followers || 0
        },
        reason: "Impersonation",
        status: "takedown_complete"
      };

      console.log('📤 Sending TikTok report data:', reportData);

      const response = await fetch(`${BASE_URL}/api/takedown?user_id=${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ TikTok profile reported successfully:', result);
        setReportSuccess(true);
        
        // Close modal after success
        setTimeout(() => {
          onClose();
          setReportSuccess(false);
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to report profile');
      }
    } catch (error) {
      console.error('❌ Error reporting TikTok profile:', error);
      alert(error.message || 'Failed to report profile. Please try again.');
    } finally {
      setIsReporting(false);
    }
  };

  // ✅ Handle Review Later with Context API
  const handleReviewLater = () => {
    addToReviewLater(profile, 'TikTok');
    onClose();
    console.log('📝 TikTok profile added to review later:', profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-start bg-white/15 backdrop-blur-xs pt-8 pl-8">
      {/* Modal Container - Made scrollable */}
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-4 border-b border-gray-700 pb-3">
            <h2 className="text-2xl font-semibold text-white">
              {reportSuccess ? "Reported Successfully! ✅" : "Profile Details"}
            </h2>
          </div>

          {reportSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-gray-300 text-lg">TikTok profile has been reported successfully.</p>
              <p className="text-gray-400 text-sm mt-2">Redirecting...</p>
            </div>
          ) : (
            <>
              {/* Profile Info - Made more compact */}
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={profile.profilePicUrl || "/images/tiktok.png"}
                  alt={profile.username}
                  className="w-16 h-16 rounded-full border border-gray-600 object-cover flex-shrink-0"
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-100">
                      {profile.nickName}
                    </h3>
                    {profile.verified && (
                      <CheckCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>

                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-400">Platform:</span> <span className="text-gray-200">TikTok</span></p>
                    <p><span className="text-gray-400">Username:</span> <span className="text-gray-200">@{profile.username}</span></p>
                    
                    {/* ✅ UPDATED: URL as button with background */}
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Profile:</span>
                      <button
                        onClick={() => openProfileWindow(profile.profileUrl)}
                        className="inline-flex items-center space-x-1 bg-blue-900/30 hover:bg-blue-800/40 text-blue-400 px-2 py-1 rounded text-xs border border-blue-700 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open Profile</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs">
                      <span className={`${profile.privateAccount ? 'text-red-400' : 'text-green-400'}`}>
                        {profile.privateAccount ? '🔒 Private' : '🌐 Public'}
                      </span>
                      <span className={`${profile.verified ? 'text-green-400' : 'text-yellow-400'}`}>
                        {profile.verified ? '✅ Verified' : '❌ Not Verified'}
                      </span>
                      {profile.ttSeller && (
                        <span className="text-green-400">💼 Seller</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio - Conditional with max height */}
              {profile.signature && (
                <div className="mb-3">
                  <h4 className="text-gray-400 text-sm font-medium mb-1">Bio</h4>
                  <p className="text-gray-300 text-sm bg-gray-800/50 rounded p-2 max-h-20 overflow-y-auto">
                    {profile.signature}
                  </p>
                </div>
              )}

              {/* Stats - Made more compact */}
              <div className="flex justify-evenly gap-4 text-sm text-gray-300 mb-3 p-3 bg-gray-800/30 rounded-lg">
                <div className="text-center">
                  <strong className="text-white text-md block">{profile.followers?.toLocaleString() || 0}</strong>
                  <span className="text-gray-400 text-xs">Followers</span>
                </div>
                <div className="text-center">
                  <strong className="text-white text-md block">{profile.following?.toLocaleString() || 0}</strong>
                  <span className="text-gray-400 text-xs">Following</span>
                </div>
                <div className="text-center">
                  <strong className="text-white text-md block">{profile.videos?.toLocaleString() || 0}</strong>
                  <span className="text-gray-400 text-xs">Videos</span>
                </div>
              </div>

              {/* ✅ CONCISE: TikTok Reporting Steps */}
              <div className="border-t border-gray-700 my-3 pt-3">
                <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  How to Report on TikTok
                </h3>
                
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">1</span>
                    <span>Open profile → Tap <strong>Share</strong> or <strong>⋯</strong> → <strong>Report</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">2</span>
                    <span>Select <strong>"Report account"</strong> → <strong>"Impersonation"</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
                    <span>Follow TikTok's instructions</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 mt-1">
                    <CheckCircle className="w-3 h-3" />
                    <span className="font-medium">Then click "Reported" below</span>
                  </div>
                </div>
              </div>

              {/* ✅ UPDATED: Action Buttons - Made more compact */}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={(e) => openProfileWindow(profile.profileUrl, e)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition text-sm"
                >
                  Request Takedown
                </button>
                
                {/* NEW: Reported Successfully Button */}
                <button
                  onClick={handleReportSuccessfully}
                  disabled={isReporting}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 text-sm"
                >
                  {isReporting ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <CheckCircle className="w-3 h-3" />
                  )}
                  <span>{isReporting ? "Reporting..." : "Reported"}</span>
                </button>
                
                <button
                  onClick={handleReviewLater}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition text-sm"
                >
                  Review Later
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-lg font-medium transition text-sm"
                >
                  Ignore
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TikTokProfile() {
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
  const tiktokReviewCount = reviewProfiles.filter(profile => profile.platform === 'TikTok').length;

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

      console.log("🚀 Searching TikTok for:", username, "with limit:", 10);

      const apiResponse = await fetchTikTokProfiles(username, 10);
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
          following: profile.following || 0,
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

      const apiResponse = await fetchTikTokProfiles(username, totalAfterFetch);
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
          username: profile.name || "N/A",
          nickName: profile.nickName || profile.name || "",
          profilePicUrl: profile.avatar || "/images/tiktok.png",
          profileUrl: `https://www.tiktok.com/@${profile.name}/`,
          followers: profile.fans || 0,
          following: profile.following || 0,
          videos: profile.video || 0,
          signature: profile.signature || "",
          verified: profile.verified || false,
          privateAccount: profile.privateAccount || false,
          ttSeller: profile.ttSeller || false,
          bioLink: profile.bioLink || null,
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

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="bg-black rounded-xl shadow-sm border border-gray-700 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Search TikTok Profiles</h2>
          <p className="text-gray-400 mt-1">
            Enter the TikTok profile details to detect impersonation
          </p>
          
          {/* ✅ OPTIONAL: Show TikTok review count */}
          {tiktokReviewCount > 0 && (
            <p className="text-sm text-blue-400 mt-1">
              You have {tiktokReviewCount} TikTok profile{tiktokReviewCount !== 1 ? 's' : ''} in Review Later
            </p>
          )}
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
      <TikTokProfileDetailsModal
        isOpen={!!selectedProfile}
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </div>
  );
}