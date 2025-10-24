'use client';
import React, { useState } from 'react';
import { Clock, Trash2, AlertCircle, Search, Filter, Calendar, ExternalLink, Eye, BarChart3, Bookmark, Users, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { useReview } from '@/app/contexts/ReviewContext'; // Import the context
import ReviewProfileDetailsModal from './ReviewlaterModal';

const ReviewLaterProfiles = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // ✅ UPDATED: Use profiles from context instead of static data
  const { 
    reviewProfiles, 
    removeFromReview, 
    moveToTakedown,
    updateProfilePriority,
    addNoteToProfile,
    totalCount,
    highPriorityCount,
    mediumPriorityCount,
    lowPriorityCount
  } = useReview();

  const getPriorityBadge = (priority) => {
    const styles = {
      high: { bg: 'bg-red-900/30', text: 'text-red-400', label: 'High Priority' },
      medium: { bg: 'bg-yellow-900/30', text: 'text-yellow-400', label: 'Medium Priority' },
      low: { bg: 'bg-blue-900/30', text: 'text-blue-400', label: 'Low Priority' }
    };
    return styles[priority] || styles.medium;
  };

  const handleViewDetails = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  // ✅ NEW: Handle close modal
  const handleCloseModal = () => {
    setSelectedProfile(null);
  };

  // ✅ UPDATED: Use context functions
  const handleMoveToTakedown = (profile) => {
    moveToTakedown(profile);
    console.log('Move to takedown:', profile);
  };

  const handleRemoveFromReview = (profile) => {
    removeFromReview(profile.id);
    console.log('Remove from review:', profile);
  };

  // ✅ NEW: Handle remove from review after modal action
  const handleRemoveFromReviewAfterAction = (profileId) => {
    removeFromReview(profileId);
  };


  const handlePriorityChange = (profileId, newPriority) => {
    updateProfilePriority(profileId, newPriority);
  };

  // ✅ UPDATED: Filter real data from context
  const filteredProfiles = reviewProfiles.filter(profile => {
    const matchesPriority = selectedFilter === 'all' || profile.priority === selectedFilter;
    const matchesPlatform = selectedPlatform === 'all' || profile.platform === selectedPlatform;
    const matchesSearch = 
      profile.profileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.profileUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesPriority && matchesPlatform && matchesSearch;
  });

  
   // ✅ NEW: Helper function to display profile-specific data
  const renderPlatformSpecificData = (profile) => {
    // Use originalData if available, otherwise use profile data directly
    const profileData = profile.originalData || profile;
    
    switch (profile.platform?.toLowerCase()) {
      case 'instagram':
        return (
          <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-2">
            {profileData.followers && (
              <span><strong className="text-white">{profileData.followers.toLocaleString()}</strong> followers</span>
            )}
            {profileData.following && (
              <span><strong className="text-white">{profileData.following.toLocaleString()}</strong> following</span>
            )}
            {profileData.postsCount && (
              <span><strong className="text-white">{profileData.postsCount}</strong> posts</span>
            )}
            {profileData.verified && (
              <span className="text-green-400">✓ Verified</span>
            )}
            {profileData.privateAccount && (
              <span className="text-yellow-400">🔒 Private</span>
            )}
          </div>
        );
      
      case 'facebook':
        return (
          <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-2">
            {profileData.verified && (
              <span className="text-green-400">✓ Verified</span>
            )}
            {profileData.userData && profileData.userData.length > 0 && (
              <span><strong className="text-white">{profileData.userData.length}</strong> profile details</span>
            )}
          </div>
        );
      
      case 'tiktok':
        return (
          <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-2">
            {profileData.followers && (
              <span><strong className="text-white">{profileData.followers.toLocaleString()}</strong> followers</span>
            )}
            {profileData.following && (
              <span><strong className="text-white">{profileData.following.toLocaleString()}</strong> following</span>
            )}
            {profileData.videos && (
              <span><strong className="text-white">{profileData.videos.toLocaleString()}</strong> videos</span>
            )}
            {profileData.verified && (
              <span className="text-green-400">✓ Verified</span>
            )}
            {profileData.privateAccount && (
              <span className="text-yellow-400">🔒 Private</span>
            )}
          </div>
        );
      
      case 'twitter':
        return (
          <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-2">
            {profileData.followers && (
              <span><strong className="text-white">{profileData.followers.toLocaleString()}</strong> followers</span>
            )}
            {profileData.following && (
              <span><strong className="text-white">{profileData.following.toLocaleString()}</strong> following</span>
            )}
            {profileData.tweets && (
              <span><strong className="text-white">{profileData.tweets.toLocaleString()}</strong> tweets</span>
            )}
            {profileData.verified && (
              <span className="text-green-400">✓ Verified</span>
            )}
          </div>
        );
      
      default:
        return null;
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

  // ✅ NEW: Calculate due this week count
  const getDueThisWeekCount = () => {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return reviewProfiles.filter(profile => {
      const reviewDate = new Date(profile.reviewDate);
      return reviewDate <= oneWeekFromNow && reviewDate >= today;
    }).length;
  };

  // ✅ NEW: Get display name for profile
  const getDisplayName = (profile) => {
    return profile.fullName || profile.nickName || profile.name || profile.profileName || 'Unknown Profile';
  };

  // ✅ NEW: Get username for display
  const getUsername = (profile) => {
    return profile.username || profile.userId || 'N/A';
  };


  return (
    <div className="max-w-7xl mx-auto p-6 bg-black min-h-screen">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Review Later Profiles</h1>
        <p className="text-gray-400 mt-1">Profiles saved for later review and analysis</p>
      </div>

      {/* Stats - UPDATED: Use context data */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900/10 rounded-lg shadow border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total in Review</p>
              <p className="text-2xl font-bold text-white mt-1">{totalCount}</p>
            </div>
            <Bookmark className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        {/* <div className="bg-gray-900/10 rounded-lg shadow border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">High Priority</p>
              <p className="text-2xl font-bold text-red-400 mt-1">
                {highPriorityCount}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
        </div> */}
        
        {/* <div className="bg-gray-900/10 rounded-lg shadow border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Due This Week</p>
              <p className="text-2xl font-bold text-yellow-400 mt-1">
                {getDueThisWeekCount()}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div> */}

        <div className="bg-gray-900/10 rounded-lg shadow border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Platforms</p>
              <p className="text-2xl font-bold text-green-400 mt-1">
                {new Set(reviewProfiles.map(p => p.platform)).size}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="bg-gray-900/15 rounded-lg shadow border border-gray-800 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div> */}

            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Platforms</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Twitter">Twitter</option>
              <option value="TikTok">TikTok</option>
            </select>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search review profiles..."
              className="w-full pl-10 pr-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Profile Cards - UPDATED: Use real data from context */}
        <div className="space-y-4">
          {filteredProfiles.map((profile) => {
            // const priorityInfo = getPriorityBadge(profile.priority);
            
            return (
              <div key={profile.id} className="border border-gray-800 bg-gray-900/20 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {/* <span className="text-lg">{getPlatformIcon(profile.platform)}</span> */}
                          <h3 className="text-lg font-semibold text-white">{profile.profileName}</h3>
                          {/* <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityInfo.bg} ${priorityInfo.text}`}>
                            {priorityInfo.label}
                          </span> */}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                          {/* <span className="flex items-center gap-1">
                            <span className="font-medium">ID:</span> {profile.id}
                          </span> */}
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Platform:</span> {profile.platform}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Added: {profile.addedDate}
                          </span>
                          {/* <span className="flex items-center gap-1 text-yellow-400">
                            <Clock className="w-4 h-4" />
                            Review by: {profile.reviewDate}
                          </span> */}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-800">
                        <p className="text-xs text-gray-400 mb-1">Profile URL</p>
                        <div className="flex items-center justify-between">
                          {/* <p className="text-sm font-medium text-white line-clamp-1">{profile.profileUrl}</p> */}
                          <button 
                            // onClick={() => window.open(profile.profileUrl, '_blank')}
                            onClick={(e) => openProfileWindow(profile.profileUrl, e)}
                            className="inline-flex text-blue-400 hover:text-blue-300 flex-shrink-0 ml-2 gap-4"
                          >
                            
                            <span>Open Profile Details</span>
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-1">{profile.followers} followers</p>
                      </div>

                      <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                        <p className="text-xs text-gray-400 mb-1">Review Reason</p>
                        <p className="text-sm font-medium text-white">{profile.reason}</p>
                        <p className="text-xs text-gray-500 mt-1">Flagged for analysis</p>
                      </div>
                    </div>

                    {/* ✅ NEW: Platform-specific data */}
                    {renderPlatformSpecificData(profile)}

                    {/* {profile.notes && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-400 mb-1">Notes</p>
                        <p className="text-sm text-gray-300 bg-gray-800/30 rounded p-2">
                          {profile.notes}
                        </p>
                      </div>
                    )} */}

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Status:</span>
                        <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 text-sm rounded-full font-medium">
                          Awaiting Review
                        </span>
                      </div>
                      
                      {/* ✅ NEW: Priority selector */}
                      {/* <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Priority:</span>
                        <select
                          value={profile.priority}
                          onChange={(e) => handlePriorityChange(profile.id, e.target.value)}
                          className="px-2 py-1 bg-gray-800 text-gray-200 border border-gray-600 rounded text-xs focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div> */}
                    </div>
                  </div>

                  <div className="flex lg:flex-col gap-2">
                    <button 
                      onClick={() => handleViewDetails(profile)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap flex items-center gap-3"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    {/* <button 
                      // onClick={() => handleMoveToTakedown(profile)}
                      onClick={(e) => openProfileWindow(profile.profileUrl, e)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      Takedown Request
                    </button> */}
                    <button 
                      onClick={() => handleRemoveFromReview(profile)}
                      className="px-4 py-2 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium whitespace-nowrap flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove from list
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProfiles.length === 0 && (
          <div className="text-center py-12">
            <Bookmark className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              {reviewProfiles.length === 0 ? 'No profiles in review yet' : 'No matching profiles found'}
            </h3>
            <p className="text-gray-400">
              {reviewProfiles.length === 0 
                ? 'Add profiles from search results using "Review Later" button' 
                : 'Try adjusting your search or filter criteria'
              }
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            Showing {filteredProfiles.length} of {reviewProfiles.length} review profiles
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ✅ NEW: Profile Details Modal */}
      <ReviewProfileDetailsModal
        isOpen={!!selectedProfile}
        profile={selectedProfile}
        platform={selectedProfile?.platform}
        onClose={handleCloseModal}
        onRemoveFromReview={handleRemoveFromReviewAfterAction}
      />
    </div>
  );
};

export default ReviewLaterProfiles;