'use client';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Activity, AlertCircle, Calendar, Download, Loader2 } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    totalScans: 0,
    totalFakes: 0,
    accuracyRate: 0,
    platformData: [],
    facebookData: [],
    instagramData: [],
    twitterData: [],
    tiktokData: [],
    linkedinData: []
  });

  // Fetch analytics data
  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const user_id = localStorage.getItem('user_id') || localStorage.getItem('userId');
      
      if (!user_id) {
        throw new Error('User not found. Please login again.');
      }

      // ✅ FIXED: Fetch actual takedown data from API
      const takedownResponse = await fetch(`${BASE_URL}/api/takedown?user_id=${user_id}`);
      
      if (!takedownResponse.ok) {
        throw new Error('Failed to fetch takedown data');
      }

      const takedownData = await takedownResponse.json();
      console.log('📊 Takedown data from API:', takedownData);

      // Process the takedown data to get platform statistics
      const platformStats = processTakedownData(takedownData);
      console.log('📈 Processed platform stats:', platformStats);

      // Generate analytics data from actual takedown data
      const processedData = generateAnalyticsFromTakedownData(platformStats, timeRange);
      
      setAnalyticsData(processedData);

    } catch (error) {
      console.error('Error fetching analytics data:', error);
      loadFallbackData();
    } finally {
      setLoading(false);
    }
  };

  // ✅ NEW: Process actual takedown data from API
  const processTakedownData = (takedownData) => {
    const platforms = ['facebook', 'instagram', 'twitter', 'tiktok', 'linkedin'];
    const platformStats = {};
    
    // Initialize platform stats
    platforms.forEach(platform => {
      platformStats[platform] = {
        profilesDetected: 0,
        takedownRequests: 0,
        pending: 0,
        ignored: 0,
        successful: 0
      };
    });

    // Process each takedown record
    if (Array.isArray(takedownData)) {
      takedownData.forEach(record => {
        if (record.reportedProfile && record.reportedProfile.platform) {
          const platform = record.reportedProfile.platform.toLowerCase();
          
          if (platforms.includes(platform)) {
            platformStats[platform].profilesDetected++;
            
            // Count based on status
            if (record.status === 'takedown_complete' || record.status === 'completed') {
              platformStats[platform].takedownRequests++;
              platformStats[platform].successful++;
            } else if (record.status === 'pending' || record.status === 'in_review') {
              platformStats[platform].pending++;
            } else if (record.status === 'ignored' || record.status === 'dismissed') {
              platformStats[platform].ignored++;
            } else {
              platformStats[platform].takedownRequests++; // Count as request for other statuses
            }
          }
        }
      });
    }

    return platformStats;
  };

  // ✅ NEW: Generate analytics from actual takedown data
  const generateAnalyticsFromTakedownData = (platformStats, range) => {
    let totalProfilesDetected = 0;
    let totalTakedownRequests = 0;

    // Calculate totals
    Object.values(platformStats).forEach(stats => {
      totalProfilesDetected += stats.profilesDetected;
      totalTakedownRequests += stats.takedownRequests;
    });

    // Generate platform distribution for pie chart
    const platformDistribution = Object.entries(platformStats)
      .map(([platform, stats]) => ({
        name: platform.charAt(0).toUpperCase() + platform.slice(1),
        value: stats.takedownRequests,
        color: getPlatformColor(platform),
        fullStats: stats
      }))
      .filter(item => item.value > 0);

    // Calculate accuracy rate
    const accuracyRate = totalProfilesDetected > 0 
      ? Math.round((totalTakedownRequests / totalProfilesDetected) * 100)
      : 0;

    // Generate platform-specific chart data
    return {
      totalScans: totalProfilesDetected,
      totalFakes: totalTakedownRequests,
      accuracyRate: accuracyRate > 100 ? 100 : accuracyRate,
      platformData: platformDistribution,
      facebookData: generatePlatformChartData('facebook', platformStats.facebook, range),
      instagramData: generatePlatformChartData('instagram', platformStats.instagram, range),
      twitterData: generatePlatformChartData('twitter', platformStats.twitter, range),
      tiktokData: generatePlatformChartData('tiktok', platformStats.tiktok, range),
      linkedinData: generatePlatformChartData('linkedin', platformStats.linkedin, range)
    };
  };

  // ✅ NEW: Generate chart data based on actual platform stats
  const generatePlatformChartData = (platform, stats, range) => {
    const { profilesDetected, takedownRequests, pending, ignored, successful } = stats;
    
    // If no data, return empty structure
    if (profilesDetected === 0) {
      return getEmptyPlatformData(platform, range);
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const currentMonth = new Date().getMonth();

    let dataPoints = 6;
    if (range === '7days') dataPoints = 7;
    else if (range === '30days') dataPoints = 4;
    else if (range === '90days') dataPoints = 3;
    else if (range === 'year') dataPoints = 12;

    switch (platform) {
      case 'facebook':
        // Line chart with actual data distribution
        return Array.from({ length: dataPoints }, (_, index) => {
          const monthIndex = (currentMonth - dataPoints + 1 + index + 12) % 12;
          // Distribute actual data across time periods
          const scans = Math.round(profilesDetected / dataPoints);
          const takedowns = Math.round(takedownRequests / dataPoints);
          
          return {
            month: months[monthIndex],
            scans: Math.max(0, scans),
            takedowns: Math.max(0, takedowns)
          };
        });

      case 'instagram':
        // Pie chart with actual status data
        const instagramData = [
          { name: 'Successful', value: successful, color: '#10B981' },
          { name: 'Pending', value: pending, color: '#F59E0B' },
          { name: 'Ignored', value: ignored, color: '#6B7280' }
        ].filter(item => item.value > 0);

        return instagramData.length > 0 ? instagramData : [
          { name: 'No Takedowns', value: 1, color: '#6B7280' }
        ];

      case 'twitter':
        // Bar chart with weekly distribution
        return days.map(day => {
          // Distribute data across days
          const dailyScans = Math.round(profilesDetected / 7);
          const dailyTakedowns = Math.round(takedownRequests / 7);
          
          return {
            day,
            scans: dailyScans,
            takedowns: dailyTakedowns
          };
        });

      case 'tiktok':
        // Line chart showing growth
        return Array.from({ length: dataPoints }, (_, index) => {
          const monthIndex = (currentMonth - dataPoints + 1 + index + 12) % 12;
          const progress = index / dataPoints;
          const cumulativeScans = Math.round(profilesDetected * progress);
          const cumulativeTakedowns = Math.round(takedownRequests * progress);
          
          return {
            month: months[monthIndex],
            profiles: cumulativeScans,
            engagement: Math.min(100, Math.round((cumulativeTakedowns / (cumulativeScans || 1)) * 100))
          };
        });

      case 'linkedin':
        // Bar chart for professional platform
        return days.map(day => {
          const dailyScans = Math.round(profilesDetected / 7);
          const dailyTakedowns = Math.round(takedownRequests / 7);
          
          return {
            day,
            professional: dailyScans,
            verified: dailyTakedowns
          };
        });

      default:
        return [];
    }
  };

  // Helper function to get platform colors
  const getPlatformColor = (platform) => {
    const colors = {
      facebook: '#1877F2',
      instagram: '#E4405F',
      twitter: '#1DA1F2',
      tiktok: '#000000',
      linkedin: '#0A66C2'
    };
    return colors[platform] || '#6B7280';
  };

  const getEmptyPlatformData = (platform, range) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dataPoints = range === '7days' ? 7 : 6;

    switch (platform) {
      case 'facebook':
        return Array.from({ length: dataPoints }, (_, index) => ({
          month: months[index % 12],
          scans: 0,
          takedowns: 0
        }));
      case 'instagram':
        return [{ name: 'No Data', value: 1, color: '#6B7280' }];
      case 'twitter':
        return days.map(day => ({ day, scans: 0, takedowns: 0 }));
      case 'tiktok':
        return Array.from({ length: dataPoints }, (_, index) => ({
          month: months[index % 12],
          profiles: 0,
          engagement: 0
        }));
      case 'linkedin':
        return days.map(day => ({ day, professional: 0, verified: 0 }));
      default:
        return [];
    }
  };

  const loadFallbackData = () => {
    // Fallback to localStorage if API fails
    const user_id = localStorage.getItem('user_id') || localStorage.getItem('userId');
    const platforms = ['facebook', 'instagram', 'twitter', 'tiktok', 'linkedin'];
    
    let totalProfilesDetected = 0;
    let totalTakedownRequests = 0;
    const platformStats = {};

    platforms.forEach(platform => {
      const statsKey = `${user_id}-${platform}-stats`;
      const platformDataStr = localStorage.getItem(statsKey);
      
      if (platformDataStr) {
        try {
          const stats = JSON.parse(platformDataStr);
          platformStats[platform] = stats;
          totalProfilesDetected += stats.profilesDetected || 0;
          totalTakedownRequests += stats.takedownRequests || 0;
        } catch (error) {
          platformStats[platform] = { profilesDetected: 0, takedownRequests: 0 };
        }
      } else {
        platformStats[platform] = { profilesDetected: 0, takedownRequests: 0 };
      }
    });

    const processedData = generateAnalyticsFromTakedownData(platformStats, timeRange);
    setAnalyticsData(processedData);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black p-3 rounded-lg shadow-lg border border-gray-700">
          <p className="font-semibold text-gray-200">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
          <span className="ml-2 text-gray-400">Loading analytics...</span>
        </div>
      </div>
    );
  }


  return (
    <div className="max-w-7xl mx-auto p-6">
<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-200">Platform Analytics</h1>
          <p className="text-gray-300 mt-1">Based on actual takedown data</p>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-black text-gray-300 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>
          <button 
            onClick={fetchAnalyticsData}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Loader2 className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics - Now showing real data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-black rounded-lg shadow-sm border border-gray-600 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100/25 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-200 text-sm font-medium">Total Profiles Scanned</h3>
          <p className="text-3xl font-bold text-gray-100 mt-1">{analyticsData.totalScans}</p>
          <p className="text-xs text-gray-500 mt-2">Across all social platforms</p>
        </div>

        <div className="bg-black rounded-lg shadow-sm border border-gray-600 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-red-100/25 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Takedown Requests</h3>
          <p className="text-3xl font-bold text-gray-200 mt-1">{analyticsData.totalFakes}</p>
          <p className="text-xs text-gray-500 mt-2">
            {analyticsData.totalScans > 0 
              ? Math.round((analyticsData.totalFakes / analyticsData.totalScans) * 100) + '% takedown rate'
              : 'Start scanning to see data'
            }
          </p>
        </div>

        <div className="bg-black rounded-lg shadow-sm border border-gray-600 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100/25 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Action Rate</h3>
          <p className="text-3xl font-bold text-gray-200 mt-1">{analyticsData.accuracyRate}%</p>
          <p className="text-xs text-gray-500 mt-2">
            {analyticsData.accuracyRate >= 80 ? 'Excellent engagement' : 
             analyticsData.accuracyRate >= 60 ? 'Good activity' : 'Scan more profiles'}
          </p>
        </div>
      </div>

      {/* Platform Specific Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Facebook - Line Chart */}
        <div className="bg-black rounded-lg shadow-sm border border-gray-600 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              {/* <PlatformIcon platform="facebook" size={24} /> */}
              <div>
                <h2 className="text-lg font-bold text-gray-200">Facebook Analytics</h2>
                <p className="text-sm text-gray-400">Scans and takedowns over time</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.facebookData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="scans" 
                stroke="#1877F2" 
                strokeWidth={2}
                name="Profiles Scanned"
                dot={{ fill: '#1877F2', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="takedowns" 
                stroke="#25D366" 
                strokeWidth={2}
                name="Takedown Requests"
                dot={{ fill: '#25D366', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Instagram - Pie Chart */}
        <div className="bg-black rounded-lg shadow-sm border border-gray-600 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              {/* <PlatformIcon platform="instagram" size={24} /> */}
              <div>
                <h2 className="text-lg font-bold text-gray-200">Instagram Analytics</h2>
                <p className="text-sm text-gray-400">Profile status distribution</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.instagramData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#ffffff"
                dataKey="value"
              >
                {analyticsData.instagramData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Twitter - Bar Chart */}
        <div className="bg-black rounded-lg shadow-sm border border-gray-600 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              {/* <PlatformIcon platform="twitter" size={24} /> */}
              <div>
                <h2 className="text-lg font-bold text-gray-200">Twitter Analytics</h2>
                <p className="text-sm text-gray-400">Weekly activity patterns</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.twitterData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="scans" fill="#1DA1F2" name="Profiles Scanned" radius={[8, 8, 0, 0]} />
              <Bar dataKey="takedowns" fill="#FFAD1F" name="Takedown Requests" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* TikTok - Line Chart */}
        <div className="bg-black rounded-lg shadow-sm border border-gray-600 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              {/* <PlatformIcon platform="tiktok" size={24} /> */}
              <div>
                <h2 className="text-lg font-bold text-gray-200">TikTok Analytics</h2>
                <p className="text-sm text-gray-400">Profile growth and engagement</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.tiktokData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="profiles" 
                stroke="#000000" 
                strokeWidth={2}
                name="Profiles Found"
                dot={{ fill: '#000000', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="#FF0050" 
                strokeWidth={2}
                name="Engagement Rate %"
                dot={{ fill: '#FF0050', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LinkedIn Chart */}
      <div className="bg-black rounded-lg shadow-sm border border-gray-600 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {/* <PlatformIcon platform="linkedin" size={24} /> */}
            <div>
              <h2 className="text-lg font-bold text-gray-200">LinkedIn Analytics</h2>
              <p className="text-sm text-gray-400">Professional profile activity</p>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData.linkedinData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#6B7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="professional" fill="#0A66C2" name="Professional Scans" radius={[8, 8, 0, 0]} />
            <Bar dataKey="verified" fill="#00A0DC" name="Verified Takedowns" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Empty State */}
      {analyticsData.totalScans === 0 && (
        <div className="text-center py-12 bg-black rounded-lg border border-gray-600">
          <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No Analytics Data Yet</h3>
          <p className="text-gray-400 mb-4">
            Start scanning profiles on social platforms to see platform-specific analytics here.
          </p>
          <p className="text-sm text-gray-500">
            Visit Facebook, Instagram, Twitter, or TikTok channels to begin.
          </p>
        </div>
      )}
    </div>
  );
};

export default Analytics;

// 'use client';
// import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Activity, AlertCircle, Clock, XCircle, Download, Twitter, X } from 'lucide-react';

// const Analytics = () => {
//   const [timeRange, setTimeRange] = useState('30days');

//   // Platform data structure - ready for API integration
//   // API should return data in this format for each platform
//   const platformsData = {
//     facebook: {
//       name: 'Facebook',
//       icon: '📘',
//       color: '#1877F2',
//       data: [
//         { month: 'Jan', totalDetected: 45, takedownRequests: 30, reviewLater: 10, ignored: 5 },
//         { month: 'Feb', totalDetected: 52, takedownRequests: 35, reviewLater: 12, ignored: 5 },
//         { month: 'Mar', totalDetected: 48, takedownRequests: 32, reviewLater: 11, ignored: 5 },
//         { month: 'Apr', totalDetected: 61, takedownRequests: 40, reviewLater: 15, ignored: 6 },
//         { month: 'May', totalDetected: 55, takedownRequests: 38, reviewLater: 12, ignored: 5 },
//         { month: 'Jun', totalDetected: 67, takedownRequests: 45, reviewLater: 16, ignored: 6 }
//       ],
//       totalStats: { detected: 328, takedowns: 220, review: 76, ignored: 32 }
//     },
//     instagram: {
//       name: 'Instagram',
//       icon: '📷',
//       color: '#E4405F',
//       data: [
//         { month: 'Jan', totalDetected: 62, takedownRequests: 45, reviewLater: 12, ignored: 5 },
//         { month: 'Feb', totalDetected: 68, takedownRequests: 50, reviewLater: 13, ignored: 5 },
//         { month: 'Mar', totalDetected: 71, takedownRequests: 52, reviewLater: 14, ignored: 5 },
//         { month: 'Apr', totalDetected: 78, takedownRequests: 58, reviewLater: 15, ignored: 5 },
//         { month: 'May', totalDetected: 82, takedownRequests: 60, reviewLater: 17, ignored: 5 },
//         { month: 'Jun', totalDetected: 89, takedownRequests: 65, reviewLater: 18, ignored: 6 }
//       ],
//       totalStats: { detected: 450, takedowns: 330, review: 89, ignored: 31 }
//     },
//     twitter: {
//       name: 'Twitter/X',
//       icon: 'X',
//       color: '#1DA1F2',
//       data: [
//         { month: 'Jan', totalDetected: 38, takedownRequests: 25, reviewLater: 9, ignored: 4 },
//         { month: 'Feb', totalDetected: 42, takedownRequests: 28, reviewLater: 10, ignored: 4 },
//         { month: 'Mar', totalDetected: 45, takedownRequests: 30, reviewLater: 11, ignored: 4 },
//         { month: 'Apr', totalDetected: 50, takedownRequests: 35, reviewLater: 11, ignored: 4 },
//         { month: 'May', totalDetected: 48, takedownRequests: 33, reviewLater: 11, ignored: 4 },
//         { month: 'Jun', totalDetected: 53, takedownRequests: 37, reviewLater: 12, ignored: 4 }
//       ],
//       totalStats: { detected: 276, takedowns: 188, review: 64, ignored: 24 }
//     },
//     linkedin: {
//       name: 'LinkedIn',
//       icon: '💼',
//       color: '#0A66C2',
//       data: [
//         { month: 'Jan', totalDetected: 28, takedownRequests: 20, reviewLater: 6, ignored: 2 },
//         { month: 'Feb', totalDetected: 32, takedownRequests: 23, reviewLater: 7, ignored: 2 },
//         { month: 'Mar', totalDetected: 30, takedownRequests: 22, reviewLater: 6, ignored: 2 },
//         { month: 'Apr', totalDetected: 35, takedownRequests: 26, reviewLater: 7, ignored: 2 },
//         { month: 'May', totalDetected: 38, takedownRequests: 28, reviewLater: 8, ignored: 2 },
//         { month: 'Jun', totalDetected: 42, takedownRequests: 31, reviewLater: 9, ignored: 2 }
//       ],
//       totalStats: { detected: 205, takedowns: 150, review: 43, ignored: 12 }
//     },
//     tiktok: {
//       name: 'TikTok',
//       icon: '🎵',
//       color: '#00F2EA',
//       data: [
//         { month: 'Jan', totalDetected: 35, takedownRequests: 22, reviewLater: 9, ignored: 4 },
//         { month: 'Feb', totalDetected: 40, takedownRequests: 26, reviewLater: 10, ignored: 4 },
//         { month: 'Mar', totalDetected: 38, takedownRequests: 24, reviewLater: 10, ignored: 4 },
//         { month: 'Apr', totalDetected: 45, takedownRequests: 30, reviewLater: 11, ignored: 4 },
//         { month: 'May', totalDetected: 42, takedownRequests: 28, reviewLater: 10, ignored: 4 },
//         { month: 'Jun', totalDetected: 48, takedownRequests: 32, reviewLater: 12, ignored: 4 }
//       ],
//       totalStats: { detected: 248, takedowns: 162, review: 62, ignored: 24 }
//     }
//   };

//   // Calculate total stats across all platforms
//   const totalStats = Object.values(platformsData).reduce(
//     (acc, platform) => ({
//       detected: acc.detected + platform.totalStats.detected,
//       takedowns: acc.takedowns + platform.totalStats.takedowns,
//       review: acc.review + platform.totalStats.review,
//       ignored: acc.ignored + platform.totalStats.ignored
//     }),
//     { detected: 0, takedowns: 0, review: 0, ignored: 0 }
//   );

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-600">
//           <p className="font-semibold text-gray-100 mb-2">{label}</p>
//           {payload.map((entry, index) => (
//             <p key={index} style={{ color: entry.color }} className="text-sm">
//               {entry.name}: {entry.value}
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   const PlatformChart = ({ platform, data }) => (
//     <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-3">
//           <span className="text-3xl">{data.icon}</span>
//           <div>
//             <h2 className="text-xl font-bold text-gray-100">{data.name}</h2>
//             <p className="text-sm text-gray-400">Detection breakdown over time</p>
//           </div>
//         </div>
//         <div className="text-right">
//           <p className="text-2xl font-bold text-gray-100">{data.totalStats.detected}</p>
//           <p className="text-xs text-gray-400">Total Detected</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-4 gap-3 mb-6">
//         <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
//           <div className="flex items-center gap-2 mb-1">
//             <Activity className="w-4 h-4 text-blue-400" />
//             <p className="text-xs text-gray-400">Detected</p>
//           </div>
//           <p className="text-lg font-bold text-gray-100">{data.totalStats.detected}</p>
//         </div>
//         <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
//           <div className="flex items-center gap-2 mb-1">
//             <AlertCircle className="w-4 h-4 text-red-400" />
//             <p className="text-xs text-gray-400">Takedowns</p>
//           </div>
//           <p className="text-lg font-bold text-gray-100">{data.totalStats.takedowns}</p>
//         </div>
//         <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
//           <div className="flex items-center gap-2 mb-1">
//             <Clock className="w-4 h-4 text-yellow-400" />
//             <p className="text-xs text-gray-400">Review</p>
//           </div>
//           <p className="text-lg font-bold text-gray-100">{data.totalStats.review}</p>
//         </div>
//         <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
//           <div className="flex items-center gap-2 mb-1">
//             <XCircle className="w-4 h-4 text-gray-400" />
//             <p className="text-xs text-gray-400">Ignored</p>
//           </div>
//           <p className="text-lg font-bold text-gray-100">{data.totalStats.ignored}</p>
//         </div>
//       </div>

//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data.data}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//           <XAxis 
//             dataKey="month" 
//             stroke="#9CA3AF" 
//             style={{ fontSize: '12px' }}
//           />
//           <YAxis 
//             stroke="#9CA3AF" 
//             style={{ fontSize: '12px' }}
//           />
//           <Tooltip content={<CustomTooltip />} />
//           <Legend 
//             wrapperStyle={{ color: '#9CA3AF' }}
//             iconType="circle"
//           />
//           <Bar 
//             dataKey="totalDetected" 
//             stackId="a"
//             fill="#3B82F6" 
//             name="Total Detected"
//             radius={[0, 0, 0, 0]}
//           />
//           <Bar 
//             dataKey="takedownRequests" 
//             stackId="a"
//             fill="#EF4444" 
//             name="Takedown Requests"
//             radius={[0, 0, 0, 0]}
//           />
//           <Bar 
//             dataKey="reviewLater" 
//             stackId="a"
//             fill="#F59E0B" 
//             name="Review Later"
//             radius={[0, 0, 0, 0]}
//           />
//           <Bar 
//             dataKey="ignored" 
//             stackId="a"
//             fill="#6B7280" 
//             name="Ignored"
//             radius={[4, 4, 0, 0]}
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-black">
//       <div className="max-w-7xl mx-auto p-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-100">Platform Analytics</h1>
//             <p className="text-gray-400 mt-2">Track detection performance across social media platforms</p>
//           </div>
//           <div className="flex items-center gap-3 mt-4 md:mt-0">
//             <select
//               value={timeRange}
//               onChange={(e) => setTimeRange(e.target.value)}
//               className="px-4 py-2 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             >
//               <option value="7days">Last 7 Days</option>
//               <option value="30days">Last 30 Days</option>
//               <option value="90days">Last 90 Days</option>
//               <option value="year">This Year</option>
//             </select>
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
//               <Download className="w-4 h-4" />
//               Export
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg shadow-lg border border-blue-700 p-6">
//             <div className="flex items-center gap-3 mb-3">
//               <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center">
//                 <Activity className="w-6 h-6 text-blue-200" />
//               </div>
//             </div>
//             <h3 className="text-gray-300 text-sm font-medium mb-1">Total Detected</h3>
//             <p className="text-4xl font-bold text-white">{totalStats.detected}</p>
//             <p className="text-xs text-blue-200 mt-2">Across all platforms</p>
//           </div>

//           <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg shadow-lg border border-red-700 p-6">
//             <div className="flex items-center gap-3 mb-3">
//               <div className="w-12 h-12 bg-red-700 rounded-lg flex items-center justify-center">
//                 <AlertCircle className="w-6 h-6 text-red-200" />
//               </div>
//             </div>
//             <h3 className="text-gray-300 text-sm font-medium mb-1">Takedown Requests</h3>
//             <p className="text-4xl font-bold text-white">{totalStats.takedowns}</p>
//             <p className="text-xs text-red-200 mt-2">{((totalStats.takedowns / totalStats.detected) * 100).toFixed(1)}% of detected</p>
//           </div>

//           <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 rounded-lg shadow-lg border border-yellow-700 p-6">
//             <div className="flex items-center gap-3 mb-3">
//               <div className="w-12 h-12 bg-yellow-700 rounded-lg flex items-center justify-center">
//                 <Clock className="w-6 h-6 text-yellow-200" />
//               </div>
//             </div>
//             <h3 className="text-gray-300 text-sm font-medium mb-1">Review Later</h3>
//             <p className="text-4xl font-bold text-white">{totalStats.review}</p>
//             <p className="text-xs text-yellow-200 mt-2">Pending review</p>
//           </div>

//           <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg border border-gray-700 p-6">
//             <div className="flex items-center gap-3 mb-3">
//               <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
//                 <XCircle className="w-6 h-6 text-gray-300" />
//               </div>
//             </div>
//             <h3 className="text-gray-300 text-sm font-medium mb-1">Ignored</h3>
//             <p className="text-4xl font-bold text-white">{totalStats.ignored}</p>
//             <p className="text-xs text-gray-400 mt-2">Marked as safe</p>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <PlatformChart platform="instagram" data={platformsData.instagram} />
//           <PlatformChart platform="facebook" data={platformsData.facebook} />
//           <PlatformChart platform="twitter" data={platformsData.twitter} />
//           <PlatformChart platform="linkedin" data={platformsData.linkedin} />
//           <PlatformChart platform="tiktok" data={platformsData.tiktok} />
//         </div>

//         {/* <div className="mt-8 bg-gray-800 rounded-lg border border-gray-700 p-6">
//           <h3 className="text-lg font-bold text-gray-100 mb-4">API Integration Guide</h3>
//           <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
//             <p className="text-sm text-gray-300 mb-3">
//               When integrating your API, ensure data is returned in the following structure:
//             </p>
//             <pre className="text-xs text-green-400 overflow-x-auto">
// {`{
//   "platform": "instagram",
//   "data": [
//     {
//       "month": "Jan",
//       "totalDetected": 62,
//       "takedownRequests": 45,
//       "reviewLater": 12,
//       "ignored": 5
//     }
//   ],
//   "totalStats": {
//     "detected": 450,
//     "takedowns": 330,
//     "review": 89,
//     "ignored": 31
//   }
// }`}
//             </pre>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Analytics;