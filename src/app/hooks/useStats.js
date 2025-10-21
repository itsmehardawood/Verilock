/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';

export const useStats = (platform) => {
  const [stats, setStats] = useState({
    profilesDetected: 0,
    takedownRequests: 0,
    pending: 0,
    ignored: 0
  });

  // Get user ID from localStorage
  const getUserId = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId') || 'default-user';
    }
    return 'default-user';
  };

  // Get stats key for localStorage
  const getStatsKey = () => {
    return `${getUserId()}-${platform}-stats`;
  };

  // Load stats from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedStats = localStorage.getItem(getStatsKey());
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    }
  }, [platform]);

  // Save stats to localStorage
  const saveStats = (newStats) => {
    setStats(newStats);
    if (typeof window !== 'undefined') {
      localStorage.setItem(getStatsKey(), JSON.stringify(newStats));
    }
  };

  // Update specific stat
  const updateStat = (statName, value) => {
    const newStats = {
      ...stats,
      [statName]: value
    };
    saveStats(newStats);
  };

  // Increment specific stat
  const incrementStat = (statName, incrementBy = 1) => {
    const newStats = {
      ...stats,
      [statName]: stats[statName] + incrementBy
    };
    saveStats(newStats);
  };

  // Reset all stats
  const resetStats = () => {
    const defaultStats = {
      profilesDetected: 0,
      takedownRequests: 0,
      pending: 0,
      ignored: 0
    };
    saveStats(defaultStats);
  };

  return {
    stats,
    updateStat,
    incrementStat,
    resetStats
  };
};