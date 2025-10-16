// contexts/ReviewContext.jsx
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const ReviewContext = createContext();

export function ReviewProvider({ children }) {
  const [reviewProfiles, setReviewProfiles] = useState([]);

  // Load from localStorage on initial render
  useEffect(() => {
    const saved = localStorage.getItem('reviewProfiles');
    if (saved) {
      try {
        setReviewProfiles(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading review profiles:', error);
      }
    }
  }, []);

  // Save to localStorage whenever reviewProfiles changes
  useEffect(() => {
    localStorage.setItem('reviewProfiles', JSON.stringify(reviewProfiles));
  }, [reviewProfiles]);

  const addToReviewLater = (profile, platform = 'Instagram') => {
    const reviewProfile = {
      id: `RVW-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      profileName: profile.fullName || profile.username,
      profileUrl: profile.profileUrl,
      platform: platform,
      addedDate: new Date().toISOString().split('T')[0],
      reason: 'Added from profile search',
      priority: 'medium',
      followers: profile.followers?.toLocaleString() || '0',
      postsCount: profile.postsCount?.toLocaleString() || '0',
      following: profile.following?.toLocaleString() || '0',
      notes: profile.biography || profile.headline || 'No additional notes',
      profilePicUrl: profile.profilePicUrl,
      reviewDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      originalData: profile // Keep original profile data for reference
    };

    setReviewProfiles(prev => [reviewProfile, ...prev]);
    console.log('✅ Added to review later:', reviewProfile);
    
    return reviewProfile;
  };

  const removeFromReview = (profileId) => {
    setReviewProfiles(prev => prev.filter(profile => profile.id !== profileId));
  };

  const moveToTakedown = (profile) => {
    // You can implement logic to move to takedown
    removeFromReview(profile.id);
    console.log('Moved to takedown:', profile);
    // Here you would also add to takedown context
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

  return (
    <ReviewContext.Provider value={{
      reviewProfiles,
      addToReviewLater,
      removeFromReview,
      moveToTakedown,
      updateProfilePriority,
      addNoteToProfile,
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