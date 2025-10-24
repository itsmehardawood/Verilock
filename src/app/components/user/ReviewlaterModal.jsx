'use client';
import { AlertCircle, ExternalLink, CheckCircle, Lock, Loader2, GraduationCap, Briefcase, MapPin, X, Users, Building } from "lucide-react";
import React, { useState } from "react";
import { useReview } from "@/app/contexts/ReviewContext";
import InstructionsModal from "./InstructionsModal";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
  },
  linkedin: {
    color: "blue",
    icon: "💼",
    name: "LinkedIn"
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
  const [showInstructions, setShowInstructions] = useState(false);

  if (!isOpen || !profile) return null;

  const platformConfig = PLATFORM_CONFIG[platform?.toLowerCase()] || PLATFORM_CONFIG.tiktok;

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

  // ✅ SIMPLIFIED: Takedown handler - just opens instructions and profile
  const handleTakedownAction = () => {
    // Open profile in new tab
    openProfileWindow(profile.profileUrl);
    // Show instructions modal
    setShowInstructions(true);
  };

  // Close instructions modal
  const handleInstructionsClose = () => {
    setShowInstructions(false);
  };

  // ✅ NEW: Handle successful takedown from InstructionsModal
  const handleTakedownSuccess = () => {
    // Remove from review later after successful report
    if (onRemoveFromReview) {
      onRemoveFromReview(profile.id);
    }
    onClose();
  };

  const handleRemoveFromReview = () => {
    if (onRemoveFromReview) {
      onRemoveFromReview(profile.id);
    }
    onClose();
  };

  const getButtonColor = () => {
    const baseColor = platformConfig.color;
    switch (baseColor) {
      case 'red': return 'bg-red-600 hover:bg-red-700';
      case 'blue': return 'bg-blue-600 hover:bg-blue-700';
      case 'purple': return 'bg-purple-600 hover:bg-purple-700';
      case 'sky': return 'bg-sky-600 hover:bg-sky-700';
      default: return 'bg-red-600 hover:bg-red-700';
    }
  };

  // ✅ UPDATED: LinkedIn-specific display data
  const getDisplayData = () => {
    const profileData = profile.originalData || profile;
    
    // LinkedIn-specific fields
    return {
      id: profileData.id,
      username: profileData.username || profileData.id || 'N/A',
      fullName: profileData.fullName || `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim() || "LinkedIn User",
      profilePicUrl: profileData.profilePicUrl || profileData.pictureUrl,
      profileUrl: profileData.profileUrl || profileData.linkedinUrl,
      headline: profileData.headline || '',
      summary: profileData.summary || '',
      location: profileData.location || profileData.location?.linkedinText || '',
      openProfile: profileData.openProfile || false,
      premium: profileData.premium || false,
      currentPosition: profileData.currentPosition || (profileData.currentPositions && profileData.currentPositions[0]) || null,
      userData: profileData.userData || []
    };
  };

  const displayData = getDisplayData();

  // ✅ LinkedIn-specific profile rendering
  const renderLinkedInProfile = () => (
    <>
      {/* Profile Info */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 rounded-full border border-gray-600 bg-gray-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {displayData.profilePicUrl ? (
            <img 
              src={displayData.profilePicUrl} 
              alt={`${displayData.fullName}'s profile`}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <Users className={`w-8 h-8 text-gray-400 ${displayData.profilePicUrl ? 'hidden' : 'block'}`} />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-100">
              {displayData.fullName}
            </h3>
            {displayData.premium && (
              <CheckCircle className="w-4 h-4 text-yellow-500" />
            )}
          </div>

          <div className="text-sm space-y-1">
            <p><span className="text-gray-400">Platform:</span> <span className="text-gray-200">LinkedIn</span></p>
            <p><span className="text-gray-400">User ID:</span> <span className="text-gray-200">{displayData.id}</span></p>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Profile:</span>
              <button
                onClick={() => openProfileWindow(displayData.profileUrl)}
                className="inline-flex items-center space-x-1 bg-blue-900/30 hover:bg-blue-800/40 text-blue-400 px-2 py-1 rounded text-xs border border-blue-700 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Open Profile</span>
              </button>
            </div>
            
            <p><span className="text-gray-400">Profile Type:</span> <span className={`font-medium ${displayData.openProfile ? 'text-green-400' : 'text-yellow-400'}`}>{displayData.openProfile ? 'Open' : 'Limited'}</span></p>
            <p><span className="text-gray-400">Premium:</span> <span className={`font-medium ${displayData.premium ? 'text-yellow-400' : 'text-gray-400'}`}>{displayData.premium ? 'Yes' : 'No'}</span></p>
          </div>
        </div>
      </div>

      {/* LinkedIn-specific sections */}
      {displayData.headline && (
        <>
          <div className="border-t border-gray-700 my-3"></div>
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Headline</h4>
            <p className="text-sm text-gray-300">{displayData.headline}</p>
          </div>
        </>
      )}

      {displayData.summary && (
        <>
          <div className="border-t border-gray-700 my-3"></div>
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Summary</h4>
            <p className="text-sm text-gray-300 bg-gray-800/50 rounded p-2 max-h-20 overflow-y-auto">
              {displayData.summary}
            </p>
          </div>
        </>
      )}

      {displayData.currentPosition && (
        <>
          <div className="border-t border-gray-700 my-3"></div>
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Current Position</h4>
            <p className="text-sm text-gray-100 font-medium">{displayData.currentPosition.title}</p>
            <p className="text-sm text-gray-300">{displayData.currentPosition.companyName}</p>
            {displayData.currentPosition.tenure && (
              <p className="text-sm text-gray-400 mt-1">
                {formatTenure(displayData.currentPosition.tenure)}
              </p>
            )}
          </div>
        </>
      )}

      {displayData.location && (
        <>
          <div className="border-t border-gray-700 my-3"></div>
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Location</h4>
            <p className="text-sm text-gray-300">{displayData.location}</p>
          </div>
        </>
      )}
    </>
  );

  // ✅ Generic profile rendering for other platforms
  const renderGenericProfile = () => {
    const extractUsernameFromUrl = (url) => {
      if (!url) return 'unknown';
      try {
        if (url.includes('tiktok.com/@')) {
          const match = url.match(/tiktok\.com\/@([^\/?]+)/);
          return match ? match[1] : 'unknown';
        }
        if (url.includes('instagram.com/')) {
          const match = url.match(/instagram\.com\/([^\/?]+)/);
          return match ? match[1] : 'unknown';
        }
        if (url.includes('twitter.com/')) {
          const match = url.match(/twitter\.com\/([^\/?]+)/);
          return match ? match[1] : 'unknown';
        }
        if (url.includes('facebook.com/')) {
          const match = url.match(/facebook\.com\/([^\/?]+)/);
          return match ? match[1] : 'unknown';
        }
        return 'unknown';
      } catch (error) {
        return 'unknown';
      }
    };

    const profileData = profile.originalData || profile;
    const displayData = {
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

    return (
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
                  ) : null}
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
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-6">
          {/* Header */}
          <div className="mb-4 border-b border-gray-700 pb-3">
            <h2 className="text-2xl font-semibold text-white">Profile Details</h2>
            <p className="text-gray-400 text-sm mt-1">{platformConfig.name} Profile</p>
          </div>

          {/* ✅ Conditionally render LinkedIn or generic profile */}
          {platform?.toLowerCase() === 'linkedin' ? renderLinkedInProfile() : renderGenericProfile()}

          {/* Simple Instructions Notice */}
          {/* <div className="border-t border-gray-700 my-4 pt-4">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Ready to report this profile?</span>
            </div>
            <p className="text-gray-400 text-sm">
              Click "Request Takedown" below to open the profile and get detailed reporting instructions.
            </p>
          </div> */}

          {/* Action Buttons */}
          <div className="border-t border-gray-700 my-6 pt-6">
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleTakedownAction}
                className={`bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition flex items-center space-x-1 text-sm`}
              >
                <CheckCircle className="w-3 h-3" />
                <span>Request Takedown</span>
              </button>
              
              <button
                onClick={handleRemoveFromReview}
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-5 py-2 rounded-lg font-medium transition"
              >
                Remove from Review
              </button>
            </div>
          </div>

          {/* Instructions Modal */}
          <InstructionsModal
            isOpen={showInstructions}
            onClose={handleInstructionsClose}
            platform={platform?.toLowerCase()}
            profile={profile}
            onTakedownRequest={handleTakedownSuccess}
          />
        </div>
      </div>
    </div>
  );
}