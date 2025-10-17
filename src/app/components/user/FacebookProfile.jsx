'use client';
import { AlertCircle, SearchIcon, ExternalLink, Eye, CheckCircle, Lock, X, GraduationCap, Briefcase, MapPin, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { fetchFacebookProfiles } from "@/app/lib/api/customer";
import { useBalance } from "@/app/hooks/usebalance";
import { useReview } from "@/app/contexts/ReviewContext"; // Import the context

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Profile Details Modal
function FacebookProfileDetailsModal({ isOpen, profile, onClose }) {
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
          platform: "Facebook",
          username: profile.username,
          fullName: profile.fullName,
          profileUrl: profile.profileUrl,
          profilePicUrl: profile.profilePicUrl,
          followers: 0 // Facebook doesn't provide followers in current data
        },
        reason: "Impersonation",
        status: "takedown_complete"
      };

      console.log('📤 Sending report data:', reportData);
      

      const response = await fetch(`${BASE_URL}/api/takedown?user_id=${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Profile reported successfully:', result);
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
      console.error('❌ Error reporting profile:', error);
      alert(error.message || 'Failed to report profile. Please try again.');
    } finally {
      setIsReporting(false);
    }
  };

  const handleReviewLater = () => {
    addToReviewLater(profile, 'Facebook');
    onClose();
    console.log('📝 Facebook profile added to review later:', profile);
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'education':
        return <GraduationCap className="w-4 h-4" />;
      case 'work':
        return <Briefcase className="w-4 h-4" />;
      case 'location':
        return <MapPin className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-start bg-white/15 backdrop-blur-xs pt-16 pl-16">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl w-full max-w-3xl p-6 relative">
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
        >
          <X className="w-6 h-6" />
        </button> */}

        <div className="mb-4 border-b border-gray-700 pb-3">
          <h2 className="text-2xl font-semibold text-white">
            {reportSuccess ? "Reported Successfully! ✅" : "Profile Details"}
          </h2>
        </div>

        {reportSuccess ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-gray-300 text-lg">Facebook profile has been reported successfully.</p>
            <p className="text-gray-400 text-sm mt-2">Redirecting...</p>
          </div>
        ) : (
          <>
            <div className="flex items-start space-x-4">
              <img
                src={profile.profilePicUrl || "/images/facebook.png"}
                alt={profile.fullName}
                className="w-20 h-20 rounded-full border border-gray-600 object-cover flex-shrink-0"
                onError={(e) => {
                  e.target.src = "/images/facebook.png";
                  e.target.onerror = null;
                }}
              />

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-gray-100">
                    {profile.fullName}
                  </h3>
                  {profile.verified && (
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                  )}
                </div>

                <div className="text-sm space-y-1">
                  <p><span className="text-gray-400">Platform:</span> <span className="text-gray-200">Facebook</span></p>
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
                </div>
              </div>
            </div>

            {/* ✅ CONCISE: Facebook Reporting Steps */}
<div className="border-t border-gray-700 my-4"></div>
<div className="mb-4">
  <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
    <AlertCircle className="w-5 h-5" />
    How to Report on Facebook
  </h3>
  
  <div className="space-y-2 text-sm">
    <div className="flex items-center gap-2 text-gray-300">
      <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
      <span>Open profile → Click <strong>⋯</strong> → <strong>"Find support or report"</strong></span>
    </div>
    <div className="flex items-center gap-2 text-gray-300">
      <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
      <span>Choose <strong>"Pretending to be someone"</strong></span>
    </div>
    <div className="flex items-center gap-2 text-gray-300">
      <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
      <span>Complete Facebook's process</span>
    </div>
    <div className="flex items-center gap-2 text-green-400 mt-2">
      <CheckCircle className="w-4 h-4" />
      <span className="font-medium">Then click "Reported Successfully" below</span>
    </div>
  </div>
</div>

            {profile.userData && profile.userData.length > 0 && (
              <>
                <div className="border-t border-gray-700 my-4"></div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Profile Information</h4>
                  <div className="space-y-2">
                    {profile.userData.map((data, index) => (
                      <div key={index} className="flex items-start gap-3 text-sm text-gray-300 p-2 bg-gray-800 rounded-lg">
                        {data.icon ? (
                          <img 
                            src={data.icon} 
                            alt="" 
                            className="w-5 h-5 rounded mt-0.5 flex-shrink-0"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          getIconForType(data.type)
                        )}
                        <span className="text-left">{data.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="border-t border-gray-700 my-6"></div>
            
            {/* ✅ UPDATED: Action Buttons with Reported Successfully */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={(e) => openProfileWindow(profile.profileUrl, e)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
              >
                Request Takedown
              </button>
              
              {/* NEW: Reported Successfully Button */}
              <button
                onClick={handleReportSuccessfully}
                disabled={isReporting}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isReporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                <span>{isReporting ? "Reporting..." : "Reported Successfully"}</span>
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
          </>
        )}
      </div>
    </div>
  );
}

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

export default function FacebookProfile() {
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
  const facebookReviewCount = reviewProfiles.filter(profile => profile.platform === 'Facebook').length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user can afford the search
    if (!canAfford) {
      setError("Insufficient credits. Please add more credits to continue searching.");
      return;
    }

    if (!username.trim()) {
      setError("Please enter a name to search");
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

      console.log("🚀 Searching Facebook for:", username, "with limit:", 10);

      const apiResponse = await fetchFacebookProfiles(username, 10);
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
        setError("No profiles found for this name");
        return;
      }

      // ✅ Transform each result using Facebook API field names
      const formattedProfiles = resultsArray.map((profile, index) => {
        console.log(`Profile ${index}:`, profile);
        
        return {
          id: profile.userId || index,
          username: profile.userId || "N/A",
          fullName: profile.name || "Facebook User",
          profilePicUrl: profile.profileImage || "/images/facebook.png",
          profileUrl: profile.profileUrl || `https://www.facebook.com/profile.php?id=${profile.userId}`,
          userData: profile.userData || [],
          verified: profile.verified || false,
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

      const apiResponse = await fetchFacebookProfiles(username, totalAfterFetch);
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
          id: profile.userId || index,
          username: profile.userId || "N/A",
          fullName: profile.name || "Facebook User",
          profilePicUrl: profile.profileImage || "/images/facebook.png",
          profileUrl: profile.profileUrl || `https://www.facebook.com/profile.php?id=${profile.userId}`,
          userData: profile.userData || [],
          verified: profile.verified || false,
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

  const handleImageError = (e) => {
    console.warn('Facebook image failed to load, using fallback');
    e.target.src = "/images/facebook.png";
    e.target.onerror = null;
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'education':
        return <GraduationCap className="w-3 h-3" />;
      case 'work':
        return <Briefcase className="w-3 h-3" />;
      case 'location':
        return <MapPin className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="bg-black rounded-xl shadow-sm border border-gray-700 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Search Facebook Profiles</h2>
          <p className="text-gray-400 mt-1">
            Enter the Facebook profile details to detect impersonation
          </p>
          
          {/* ✅ OPTIONAL: Show Facebook review count */}
          {facebookReviewCount > 0 && (
            <p className="text-sm text-blue-400 mt-1">
              You have {facebookReviewCount} Facebook profile{facebookReviewCount !== 1 ? 's' : ''} in Review Later
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <div className="flex">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter  username "
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
                    <img
                      src={profile.profilePicUrl}
                      alt={profile.fullName}
                      className="w-16 h-16 rounded-full border border-gray-600 object-cover"
                      onError={handleImageError}
                    />

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-lg font-semibold text-gray-100">
                          {profile.fullName}
                        </h4>
                        {profile.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        )}
                      </div>

                      {/* User Data Preview */}
                      {profile.userData && profile.userData.length > 0 && (
                        <div className="space-y-1 mb-2">
                          {profile.userData.slice(0, 2).map((data, dataIndex) => (
                            <div key={dataIndex} className="flex items-center gap-2 text-xs text-gray-300">
                              {data.icon ? (
                                <img 
                                  src={data.icon} 
                                  alt="" 
                                  className="w-3 h-3 rounded"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              ) : (
                                getIconForType(data.type)
                              )}
                              <span className="line-clamp-1">{data.text}</span>
                            </div>
                          ))}
                          {profile.userData.length > 2 && (
                            <p className="text-xs text-gray-500">
                              +{profile.userData.length - 2} more
                            </p>
                          )}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-2">
                        <div>
                          <span className="text-gray-400">Platform:</span>
                          <span className="text-gray-200 ml-2">Facebook</span>
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
                    <span>Profile Details</span>
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
      <FacebookProfileDetailsModal
        isOpen={!!selectedProfile}
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </div>
  );
}