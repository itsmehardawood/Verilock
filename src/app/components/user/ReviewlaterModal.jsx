'use client';
import { AlertCircle, ExternalLink, CheckCircle, Lock, Loader2, GraduationCap, Briefcase, MapPin } from "lucide-react";
import React, { useState } from "react";
import { useReview } from "@/app/contexts/ReviewContext";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Platform-specific reporting instructions
const PLATFORM_INSTRUCTIONS = {
  tiktok: [
    "Open profile → Tap ⋯  beside Share button → Click Report",
    'Select "Report account" → "Impersonation"',
    'Choose Who or what is it pretending to be? (e.g) → "Me" ',
    'Click on submit button now.'
  ],
  facebook: [
    "Open profile → Tap → ⋯ in the top bar right corner. Click Report from it",
    'Select Why are you reporting this profile? →select "Fake profile" ',
    'Choose "Pretending to be someone" and follow instructions',
    'Click on submit button now.'
  ],
  instagram: [
    "Open profile → Tap ⋯  in the top beside username → Click Report",
    'Select "Report account" → "Impersonation"',
    'Choose Who or what is it pretending to be? (e.g) → "Me" ',
    'Click on submit button now.'
  ],
  twitter: [
    "Click the three dots (⋯) on the profile, just below the cover picture then → Report @user ",
    'Select "Report" → ""What type of issue are you reporting" → Choose one e.g "Impersonation"',
    "Choose Who or what is it pretending to be? (e.g) → which Pretending to be me, my brand or a user that I represent",
    'Click Next and then just fillup that form (e.g) → just fillup that form your request got submitted.'
  ]
};

// Platform-specific icons and colors
const PLATFORM_CONFIG = {
  tiktok: {
    color: "red",
    icon: "🎵",
    name: "TikTok"
  },
  facebook: {
    color: "blue",
    icon: "👤",
    name: "Facebook"
  },
  instagram: {
    color: "purple",
    icon: "📷",
    name: "Instagram"
  },
  twitter: {
    color: "sky",
    icon: "🐦",
    name: "Twitter"
  }
};

export default function ReviewProfileDetailsModal({ 
  isOpen, 
  profile, 
  platform,
  onClose, 
  onRemoveFromReview 
}) {
  const { removeFromReviewLater } = useReview();
  const [isReporting, setIsReporting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [takedownClicked, setTakedownClicked] = useState(false);

  if (!isOpen || !profile) return null;

  const platformConfig = PLATFORM_CONFIG[platform?.toLowerCase()] || PLATFORM_CONFIG.tiktok;
  const instructions = PLATFORM_INSTRUCTIONS[platform] || PLATFORM_INSTRUCTIONS.tiktok;

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

  const handleTakedownAction = () => {
    if (!takedownClicked) {
      openProfileWindow(profile.profileUrl);
      setTakedownClicked(true);
    } else {
      handleReportSuccessfully();
    }
  };

  // ✅ FIXED: Handle data structure properly for Review Later profiles
  const handleReportSuccessfully = async () => {
    setIsReporting(true);
    try {
      const user_id = localStorage.getItem('user_id') || localStorage.getItem('userId');
      
      if (!user_id) {
        throw new Error('User not found. Please login again.');
      }

      // ✅ FIXED: Extract data properly from Review Later profile structure
      // The profile might be stored in originalData or directly in the profile object
      const profileData = profile.originalData || profile;
      
      // ✅ FIXED: Get username and fullName properly
      const username = profileData.username || 
                      profileData.name || 
                      extractUsernameFromUrl(profileData.profileUrl) || 
                      'unknown';
      
      const fullName = profileData.fullName || 
                      profileData.nickName || 
                      profileData.profileName || 
                      profileData.name || 
                      'Unknown User';

      // ✅ FIXED: Parse followers to number if it's a string with commas
      let followers = 0;
      if (profileData.followers) {
        if (typeof profileData.followers === 'string') {
          followers = parseInt(profileData.followers.replace(/,/g, '')) || 0;
        } else {
          followers = profileData.followers;
        }
      }

      const reportData = {
        reportedProfile: {
          id: profileData.id?.toString() || profile.id?.toString() || `RVW-${Date.now()}`,
          platform: platformConfig.name,
          username: username,
          fullName: fullName,
          profileUrl: profileData.profileUrl || profile.profileUrl,
          profilePicUrl: profileData.profilePicUrl || profile.profilePicUrl,
          followers: followers
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
        
        // Remove from review later after successful report
        setTimeout(() => {
          if (onRemoveFromReview) {
            onRemoveFromReview(profile.id);
          }
          onClose();
          setReportSuccess(false);
          setTakedownClicked(false);
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error('❌ API Error Response:', errorData);
        throw new Error(errorData.error || errorData.message || 'Failed to report profile');
      }
    } catch (error) {
      console.error(`❌ Error reporting ${platform} profile:`, error);
      alert(error.message || 'Failed to report profile. Please try again.');
    } finally {
      setIsReporting(false);
    }
  };

  // ✅ NEW: Helper function to extract username from URL
  const extractUsernameFromUrl = (url) => {
    if (!url) return 'unknown';
    try {
      // For TikTok: https://www.tiktok.com/@username/
      if (url.includes('tiktok.com/@')) {
        const match = url.match(/tiktok\.com\/@([^\/?]+)/);
        return match ? match[1] : 'unknown';
      }
      // For Instagram: https://www.instagram.com/username/
      if (url.includes('instagram.com/')) {
        const match = url.match(/instagram\.com\/([^\/?]+)/);
        return match ? match[1] : 'unknown';
      }
      // For Twitter: https://twitter.com/username
      if (url.includes('twitter.com/')) {
        const match = url.match(/twitter\.com\/([^\/?]+)/);
        return match ? match[1] : 'unknown';
      }
      return 'unknown';
    } catch (error) {
      return 'unknown';
    }
  };

  const handleRemoveFromReview = () => {
    if (onRemoveFromReview) {
      onRemoveFromReview(profile.id);
    }
    onClose();
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

  const getButtonColor = () => {
    const baseColor = platformConfig.color;
    if (takedownClicked) return 'bg-green-600 hover:bg-green-700';
    
    switch (baseColor) {
      case 'red': return 'bg-red-600 hover:bg-red-700';
      case 'blue': return 'bg-blue-600 hover:bg-blue-700';
      case 'purple': return 'bg-purple-600 hover:bg-purple-700';
      case 'sky': return 'bg-sky-600 hover:bg-sky-700';
      default: return 'bg-red-600 hover:bg-red-700';
    }
  };

  // ✅ FIXED: Get display data properly
  const getDisplayData = () => {
    const profileData = profile.originalData || profile;
    return {
      username: profileData.username || profileData.name || extractUsernameFromUrl(profileData.profileUrl) || 'unknown',
      fullName: profileData.fullName || profileData.nickName || profileData.profileName || profileData.name || 'Unknown User',
      profilePicUrl: profileData.profilePicUrl || profile.profilePicUrl,
      profileUrl: profileData.profileUrl || profile.profileUrl,
      followers: profileData.followers || 0,
      verified: profileData.verified || false,
      privateAccount: profileData.privateAccount || false,
      signature: profileData.signature || profileData.bio,
      userData: profileData.userData,
      videos: profileData.videos,
      following: profileData.following
    };
  };

  const displayData = getDisplayData();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-4 border-b border-gray-700 pb-3">
            <h2 className="text-2xl font-semibold text-white">
              {reportSuccess ? "Reported Successfully! ✅" : "Profile Details"}
            </h2>
            <p className="text-gray-400 text-sm mt-1">{platformConfig.name} Profile</p>
          </div>

          {reportSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-gray-300 text-lg">Profile has been reported successfully.</p>
              <p className="text-gray-400 text-sm mt-2">Removing from Review Later...</p>
            </div>
          ) : (
            <>
              {/* Profile Info */}
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={displayData.profilePicUrl || `/images/${platform}.png`}
                  alt={displayData.fullName}
                  className="w-20 h-20 rounded-full border border-gray-600 object-cover flex-shrink-0"
                  onError={(e) => {
                    e.target.src = `/images/${platform}.png`;
                    e.target.onerror = null;
                  }}
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-gray-100">
                      {displayData.fullName}
                    </h3>
                    {displayData.verified && (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    )}
                  </div>

                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-400">Platform:</span> <span className="text-gray-200">{platformConfig.name}</span></p>
                    <p><span className="text-gray-400">Username:</span> <span className="text-gray-200">@{displayData.username}</span></p>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Profile:</span>
                      <button
                        onClick={() => openProfileWindow(displayData.profileUrl)}
                        className="inline-flex items-center space-x-1 bg-blue-900/30 hover:bg-blue-800/40 text-blue-400 px-3 py-1 rounded-lg text-sm border border-blue-700 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open Profile</span>
                      </button>
                    </div>
                    
                    {/* Platform-specific badges */}
                    <div className="flex items-center gap-4 text-xs">
                      {displayData.privateAccount && (
                        <span className="text-red-400">🔒 Private</span>
                      )}
                      {displayData.verified ? (
                        <span className="text-green-400">✅ Verified</span>
                      ) : (
                        <span className="text-yellow-400">❌ Not Verified</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio/Signature */}
              {displayData.signature && (
                <div className="mb-3">
                  <h4 className="text-gray-400 text-sm font-medium mb-1">Bio</h4>
                  <p className="text-gray-300 text-sm bg-gray-800/50 rounded p-2 max-h-20 overflow-y-auto">
                    {displayData.signature}
                  </p>
                </div>
              )}

              {/* User Data (Facebook specific) */}
              {displayData.userData && displayData.userData.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-gray-400 text-sm font-medium mb-1">Profile Information</h4>
                  <div className="space-y-2">
                    {displayData.userData.map((data, index) => (
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
              )}

              {/* Stats */}
              {(displayData.followers > 0 || displayData.following > 0 || displayData.videos > 0) && (
                <div className="flex justify-evenly gap-4 text-sm text-gray-300 mb-3 p-3 bg-gray-800/30 rounded-lg">
                  {displayData.followers > 0 && (
                    <div className="text-center">
                      <strong className="text-white text-md block">{displayData.followers.toLocaleString()}</strong>
                      <span className="text-gray-400 text-xs">Followers</span>
                    </div>
                  )}
                  {displayData.following > 0 && (
                    <div className="text-center">
                      <strong className="text-white text-md block">{displayData.following.toLocaleString()}</strong>
                      <span className="text-gray-400 text-xs">Following</span>
                    </div>
                  )}
                  {displayData.videos > 0 && (
                    <div className="text-center">
                      <strong className="text-white text-md block">{displayData.videos.toLocaleString()}</strong>
                      <span className="text-gray-400 text-xs">Videos</span>
                    </div>
                  )}
                </div>
              )}

              {/* Reporting Instructions */}
              <div className="border-t border-gray-700 my-4 pt-4">
                <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  How to Report on {platformConfig.name}
                </h3>
                
                <div className="space-y-2 text-sm">
                  {instructions.map((instruction, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-300">
                      <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-green-400 mt-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">Then click "Takedown Submitted" below</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gray-700 my-6 pt-6">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleTakedownAction}
                    disabled={isReporting}
                    className={`${getButtonColor()} text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 text-sm`}
                  >
                    {isReporting ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <CheckCircle className="w-3 h-3" />
                    )}
                    <span>
                      {isReporting 
                        ? "Reporting..." 
                        : takedownClicked 
                        ? "Takedown Submitted" 
                        : "Request Takedown"
                      }
                    </span>
                  </button>
                  
                  <button
                    onClick={handleRemoveFromReview}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-5 py-2 rounded-lg font-medium transition"
                  >
                    Remove from Review
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}