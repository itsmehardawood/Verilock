'use client';
import { AlertCircle, SearchIcon, ExternalLink, Eye, CheckCircle, Lock, X, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { fetchInstagramProfiles } from "@/app/lib/api/customer";
import { useBalance } from "@/app/hooks/usebalance";
import { useReview } from "@/app/contexts/ReviewContext"; // Import the context

// Profile Details Modal
function ProfileDetailsModal({ isOpen, profile, onClose }) {
  const { addToReviewLater } = useReview(); // Use the context

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

  // ✅ NEW: Handle Review Later with Context API
  const handleReviewLater = () => {
    addToReviewLater(profile, 'Instagram');
    onClose();
    console.log('📝 Instagram profile added to review later:', profile);
    // You can add a toast notification here: toast.success('Profile added to Review Later!');
  };

  // ✅ NEW: Handle Takedown
  const handleTakedown = () => {
    console.log('Request Takedown:', profile);
    // You can implement takedown logic here
    // For now, just log and close
    onClose();
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
            {/* ✅ UPDATED: URL as button with background */}
              <div className="flex items-center gap-2">
                  <span className="text-gray-400">Profile:</span>
                    <button
                      onClick={() => openProfileWindow(profile.profileUrl)}
                      className="inline-flex items-center space-x-1 bg-blue-900/30 hover:bg-blue-800/40 text-blue-400 px-3 py-1 rounded-lg text-sm border border-blue-700 transition-colors"
                      >
                      <ExternalLink className="w-3 h-3" />
                      <span>Open LinkedIn Profile</span>
                      </button>
              </div>
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
          {/* {profile.externalUrls && profile.externalUrls.length > 0 && (
            <div>
              <span className="text-gray-400">External Links:</span>
              <span className="text-gray-200 ml-2">{profile.externalUrls.length}</span>
            </div>
          )} */}
        </div>

        {/* ✅ UPDATED: Action Buttons with Context API Integration */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={(e) => openProfileWindow(profile.profileUrl, e)}
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

  // ✅ NEW: Use Review Context to show count in UI (optional)
  const { reviewProfiles } = useReview();
  const instagramReviewCount = reviewProfiles.filter(profile => profile.platform === 'Instagram').length;

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
          
          {/* ✅ OPTIONAL: Show Instagram review count */}
          {instagramReviewCount > 0 && (
            <p className="text-sm text-blue-400 mt-1">
              You have {instagramReviewCount} Instagram profile{instagramReviewCount !== 1 ? 's' : ''} in Review Later
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

                      {profile.isBusinessAccount && (
                        <div className="text-xs text-green-400 mt-1">
                          Business Account
                          {profile.businessCategoryName && ` • ${profile.businessCategoryName}`}
                        </div>
                      )}

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