// // contexts/ReviewContext.jsx
// 'use client';
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const ReviewContext = createContext();

// export function ReviewProvider({ children }) {
//   const [reviewProfiles, setReviewProfiles] = useState([]);

//   // Load from localStorage on initial render
//   useEffect(() => {
//     const saved = localStorage.getItem('reviewProfiles');
//     if (saved) {
//       try {
//         setReviewProfiles(JSON.parse(saved));
//       } catch (error) {
//         console.error('Error loading review profiles:', error);
//       }
//     }
//   }, []);

//   // Save to localStorage whenever reviewProfiles changes
//   useEffect(() => {
//     localStorage.setItem('reviewProfiles', JSON.stringify(reviewProfiles));
//   }, [reviewProfiles]);

//   const addToReviewLater = (profile, platform = 'Instagram') => {
//     const reviewProfile = {
//       id: `RVW-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//       profileName: profile.fullName || profile.username,
//       profileUrl: profile.profileUrl,
//       platform: platform,
//       addedDate: new Date().toISOString().split('T')[0],
//       reason: 'Added from profile search',
//       priority: 'medium',
//       followers: profile.followers?.toLocaleString() || '0',
//       postsCount: profile.postsCount?.toLocaleString() || '0',
//       following: profile.following?.toLocaleString() || '0',
//       notes: profile.biography || profile.headline || 'No additional notes',
//       profilePicUrl: profile.profilePicUrl,
//       reviewDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
//       originalData: profile // Keep original profile data for reference
//     };

//     setReviewProfiles(prev => [reviewProfile, ...prev]);
//     console.log('✅ Added to review later:', reviewProfile);
    
//     return reviewProfile;
//   };

//   const removeFromReview = (profileId) => {
//     setReviewProfiles(prev => prev.filter(profile => profile.id !== profileId));
//   };

//   const moveToTakedown = (profile) => {
//     // You can implement logic to move to takedown
//     removeFromReview(profile.id);
//     console.log('Moved to takedown:', profile);
//     // Here you would also add to takedown context
//   };

//   const updateProfilePriority = (profileId, priority) => {
//     setReviewProfiles(prev => 
//       prev.map(profile => 
//         profile.id === profileId ? { ...profile, priority } : profile
//       )
//     );
//   };

//   const addNoteToProfile = (profileId, note) => {
//     setReviewProfiles(prev =>
//       prev.map(profile =>
//         profile.id === profileId ? { ...profile, notes: note } : profile
//       )
//     );
//   };

//   return (
//     <ReviewContext.Provider value={{
//       reviewProfiles,
//       addToReviewLater,
//       removeFromReview,
//       moveToTakedown,
//       updateProfilePriority,
//       addNoteToProfile,
//       totalCount: reviewProfiles.length,
//       highPriorityCount: reviewProfiles.filter(p => p.priority === 'high').length,
//       mediumPriorityCount: reviewProfiles.filter(p => p.priority === 'medium').length,
//       lowPriorityCount: reviewProfiles.filter(p => p.priority === 'low').length
//     }}>
//       {children}
//     </ReviewContext.Provider>
//   );
// }

// export const useReview = () => {
//   const context = useContext(ReviewContext);
//   if (!context) {
//     throw new Error('useReview must be used within a ReviewProvider');
//   }
//   return context;
// };

// contexts/ReviewContext.jsx
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const ReviewContext = createContext();

export function ReviewProvider({ children }) {
  const [reviewProfiles, setReviewProfiles] = useState([]);

  // ✅ FIXED: Get user-specific storage key
  const getStorageKey = () => {
    if (typeof window === 'undefined') return 'reviewProfiles';
    
    const userId = localStorage.getItem('user_id') || localStorage.getItem('userId');
    return userId ? `reviewProfiles_${userId}` : 'reviewProfiles';
  };

  // ✅ FIXED: Load from user-specific localStorage
  useEffect(() => {
    const storageKey = getStorageKey();
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setReviewProfiles(JSON.parse(saved));
        console.log('📥 Loaded review profiles:', JSON.parse(saved).length);
      } catch (error) {
        console.error('Error loading review profiles:', error);
      }
    }
  }, []);

  // ✅ FIXED: Save to user-specific localStorage
  useEffect(() => {
    const storageKey = getStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(reviewProfiles));
    console.log('💾 Saved review profiles:', reviewProfiles.length);
  }, [reviewProfiles]);

  // ✅ FIXED: Enhanced addToReviewLater with platform-specific data
  const addToReviewLater = (profile, platform = 'Instagram') => {
    // ✅ FIXED: Platform-specific data extraction
    const getPlatformSpecificData = (profile, platform) => {
      switch (platform.toLowerCase()) {
        case 'linkedin':
          return {
            fullName: profile.fullName || `${profile.firstName || ''} ${profile.lastName || ''}`.trim(),
            username: profile.username || profile.id,
            headline: profile.headline || '',
            summary: profile.summary || '',
            location: profile.location || profile.location?.linkedinText || '',
            currentPosition: profile.currentPosition || (profile.currentPositions && profile.currentPositions[0]) || null,
            openProfile: profile.openProfile || false,
            premium: profile.premium || false
          };
        
        case 'facebook':
          return {
            fullName: profile.fullName,
            username: profile.username,
            verified: profile.verified || false,
            userData: profile.userData || []
          };
        
        case 'tiktok':
          return {
            fullName: profile.fullName || profile.nickName,
            username: profile.username,
            signature: profile.signature || '',
            verified: profile.verified || false,
            privateAccount: profile.privateAccount || false,
            followers: profile.followers,
            following: profile.following,
            videos: profile.videos
          };
        
        case 'instagram':
          return {
            fullName: profile.fullName,
            username: profile.username,
            biography: profile.biography || '',
            verified: profile.verified || false,
            privateAccount: profile.privateAccount || false,
            followers: profile.followers,
            following: profile.following,
            postsCount: profile.postsCount
          };
        
        case 'twitter':
          return {
            fullName: profile.fullName,
            username: profile.username,
            verified: profile.verified || false,
            followers: profile.followers,
            following: profile.following,
            tweets: profile.tweets
          };
        
        default:
          return {
            fullName: profile.fullName || profile.name || profile.username,
            username: profile.username
          };
      }
    };

    const platformData = getPlatformSpecificData(profile, platform);
    
    const reviewProfile = {
      id: `RVW-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      profileName: platformData.fullName || profile.fullName || profile.username || 'Unknown Profile',
      profileUrl: profile.profileUrl,
      platform: platform,
      addedDate: new Date().toISOString().split('T')[0],
      reason: 'Added from profile search',
      priority: 'medium',
      followers: profile.followers || 0,
      postsCount: profile.postsCount || 0,
      following: profile.following || 0,
      notes: profile.biography || profile.headline || profile.signature || 'No additional notes',
      profilePicUrl: profile.profilePicUrl,
      reviewDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      originalData: {
        ...profile,
        ...platformData // Include platform-specific data
      }
    };

    setReviewProfiles(prev => [reviewProfile, ...prev]);
    console.log('✅ Added to review later:', {
      profile: reviewProfile.profileName,
      platform: reviewProfile.platform,
      storageKey: getStorageKey(),
      hasOriginalData: !!reviewProfile.originalData
    });
    
    return reviewProfile;
  };

  const removeFromReview = (profileId) => {
    setReviewProfiles(prev => prev.filter(profile => profile.id !== profileId));
    console.log('🗑️ Removed from review:', profileId);
  };

  const moveToTakedown = (profile) => {
    removeFromReview(profile.id);
    console.log('🚀 Moved to takedown:', profile);
  };

  const updateProfilePriority = (profileId, priority) => {
    setReviewProfiles(prev => 
      prev.map(profile => 
        profile.id === profileId ? { ...profile, priority } : profile
      )
    );
  };

  const addNoteToProfile = (profileId, note) => {
    setReviewProfiles(prev =>
      prev.map(profile =>
        profile.id === profileId ? { ...profile, notes: note } : profile
      )
    );
  };

  // ✅ NEW: Debug function to check storage
  const debugStorage = () => {
    const storageKey = getStorageKey();
    const stored = localStorage.getItem(storageKey);
    console.log('🔍 Storage Debug:', {
      storageKey,
      hasData: !!stored,
      data: stored ? JSON.parse(stored) : 'No data',
      allStorageKeys: Object.keys(localStorage).filter(key => key.includes('review'))
    });
  };

  return (
    <ReviewContext.Provider value={{
      reviewProfiles,
      addToReviewLater,
      removeFromReview,
      moveToTakedown,
      updateProfilePriority,
      addNoteToProfile,
      debugStorage, // ✅ NEW: Add debug function
      totalCount: reviewProfiles.length,
      highPriorityCount: reviewProfiles.filter(p => p.priority === 'high').length,
      mediumPriorityCount: reviewProfiles.filter(p => p.priority === 'medium').length,
      lowPriorityCount: reviewProfiles.filter(p => p.priority === 'low').length
    }}>
      {children}
    </ReviewContext.Provider>
  );
}

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return context;
};