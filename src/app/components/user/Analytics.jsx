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

      const apiResponse = await takedownResponse.json();
      // console.log('📊 Full API Response:', apiResponse);

      // ✅ FIXED: Extract reports array from the response
      const takedownData = apiResponse.reports || [];
      // console.log('📋 Takedown reports data:', takedownData);

      // Process the takedown data to get platform statistics
      const platformStats = processTakedownData(takedownData);
      // console.log('📈 Processed platform stats:', platformStats);

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

  // ✅ FIXED: Process actual takedown data from API with correct structure
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

    // console.log('🔍 Processing takedown data:', takedownData);

    // Process each takedown record
    if (Array.isArray(takedownData)) {
      takedownData.forEach((record, index) => {
        // console.log(`📝 Record ${index}:`, record);
        
        // ✅ FIXED: Check for different possible platform field locations
        let platform = null;
        
        // Check multiple possible locations for platform data
        if (record.reportedProfile && record.reportedProfile.platform) {
          platform = record.reportedProfile.platform.toLowerCase();
        } else if (record.platform) {
          platform = record.platform.toLowerCase();
        } else if (record.profile && record.profile.platform) {
          platform = record.profile.platform.toLowerCase();
        }

        // console.log(`🏷️  Detected platform for record ${index}:`, platform);

        if (platform && platforms.includes(platform)) {
          platformStats[platform].profilesDetected++;
          
          // ✅ FIXED: Check status with multiple possible field names
          const status = record.status || record.takedownStatus || 'unknown';
          // console.log(`📊 Status for ${platform}:`, status);

          // Count based on status
          if (status === 'takedown_complete' || status === 'completed' || status === 'successful') {
            platformStats[platform].takedownRequests++;
            platformStats[platform].successful++;
          } else if (status === 'pending' || status === 'in_review' || status === 'processing') {
            platformStats[platform].pending++;
            platformStats[platform].takedownRequests++; // Count pending as requests too
          } else if (status === 'ignored' || status === 'dismissed' || status === 'rejected') {
            platformStats[platform].ignored++;
          } else {
            // For any other status, count as a takedown request
            platformStats[platform].takedownRequests++;
          }

          // console.log(`✅ Updated stats for ${platform}:`, platformStats[platform]);
        } else {
          console.warn(`❌ Unknown or missing platform in record ${index}:`, platform);
        }
      });
    } else {
      console.warn('❌ Takedown data is not an array:', takedownData);
    }

    return platformStats;
  };

  // ✅ FIXED: Generate analytics from actual takedown data
  const generateAnalyticsFromTakedownData = (platformStats, range) => {
    let totalProfilesDetected = 0;
    let totalTakedownRequests = 0;

    // console.log('📊 Calculating totals from platform stats:', platformStats);

    // Calculate totals
    Object.values(platformStats).forEach((stats, index) => {
      totalProfilesDetected += stats.profilesDetected;
      totalTakedownRequests += stats.takedownRequests;
      console.log(`Platform ${Object.keys(platformStats)[index]}:`, stats);
    });

    // console.log('🎯 Final totals:', { totalProfilesDetected, totalTakedownRequests });

    // Generate platform distribution for pie chart
    const platformDistribution = Object.entries(platformStats)
      .map(([platform, stats]) => ({
        name: platform.charAt(0).toUpperCase() + platform.slice(1),
        value: stats.takedownRequests,
        color: getPlatformColor(platform),
        fullStats: stats
      }))
      .filter(item => item.value > 0);

    // console.log('🥧 Platform distribution:', platformDistribution);

    // Calculate accuracy rate
    const accuracyRate = totalProfilesDetected > 0 
      ? Math.round((totalTakedownRequests / totalProfilesDetected) * 100)
      : 0;

    // console.log('📈 Accuracy rate:', accuracyRate);

    // Generate platform-specific chart data
    const result = {
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

    // console.log('🎨 Final analytics data:', result);
    return result;
  };


  // ✅ FIXED: Generate chart data based on actual platform stats
const generatePlatformChartData = (platform, stats, range) => {
  const { profilesDetected, takedownRequests, pending, ignored, successful } = stats;
  
  // console.log(`📈 Generating chart for ${platform}:`, stats);

  // If no data, return empty structure
  if (profilesDetected === 0) {
    console.log(`📭 No data for ${platform}, returning empty structure`);
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

  let chartData = [];

  switch (platform) {
    case 'facebook':
      // Line chart with actual data distribution
      chartData = Array.from({ length: dataPoints }, (_, index) => {
        const monthIndex = (currentMonth - dataPoints + 1 + index + 12) % 12;
        // ✅ FIXED: Ensure at least 1 for small numbers
        const scans = Math.max(1, Math.round(profilesDetected / dataPoints));
        const takedowns = Math.max(0, Math.round(takedownRequests / dataPoints));
        
        return {
          month: months[monthIndex],
          scans: scans,
          takedowns: takedowns
        };
      });
      break;

    case 'instagram':
      // Pie chart with actual status data
      chartData = [
        { name: 'Successful', value: successful, color: '#10B981' },
        { name: 'Pending', value: pending, color: '#F59E0B' },
        { name: 'Ignored', value: ignored, color: '#6B7280' }
      ].filter(item => item.value > 0);

      if (chartData.length === 0) {
        chartData = [{ name: 'No Takedowns', value: 1, color: '#6B7280' }];
      }
      break;

    case 'twitter':
      // ✅ FIXED: Bar chart with proper distribution for small numbers
      chartData = days.map((day, index) => {
        // ✅ FIXED: Distribute data properly for small numbers
        // For small numbers, concentrate data on a few days instead of spreading too thin
        const isActiveDay = index < Math.min(profilesDetected, 3); // Concentrate on first few days
        const dailyScans = isActiveDay ? Math.max(1, Math.ceil(profilesDetected / Math.min(profilesDetected, 3))) : 0;
        const dailyTakedowns = isActiveDay ? Math.max(0, Math.ceil(takedownRequests / Math.min(takedownRequests, 3))) : 0;
        
        return {
          day,
          scans: dailyScans,
          takedowns: dailyTakedowns
        };
      });
      break;

    case 'tiktok':
      // ✅ FIXED: Line chart showing growth with proper scaling
      chartData = Array.from({ length: dataPoints }, (_, index) => {
        const monthIndex = (currentMonth - dataPoints + 1 + index + 12) % 12;
        const progress = (index + 1) / dataPoints;
        // ✅ FIXED: Ensure values are at least 1 for visibility
        const cumulativeScans = Math.max(1, Math.round(profilesDetected * progress));
        const cumulativeTakedowns = Math.max(0, Math.round(takedownRequests * progress));
        
        return {
          month: months[monthIndex],
          profiles: cumulativeScans,
          engagement: Math.min(100, Math.round((cumulativeTakedowns / (cumulativeScans || 1)) * 100))
        };
      });
      break;

    case 'linkedin':
      // ✅ FIXED: Bar chart for professional platform with proper distribution
      chartData = days.map((day, index) => {
        // ✅ FIXED: Concentrate data on weekdays for LinkedIn
        const isWeekday = index < 5; // Mon-Fri
        const isActiveDay = isWeekday && index < Math.min(profilesDetected, 3);
        const dailyScans = isActiveDay ? Math.max(1, Math.ceil(profilesDetected / Math.min(profilesDetected, 3))) : 0;
        const dailyTakedowns = isActiveDay ? Math.max(0, Math.ceil(takedownRequests / Math.min(takedownRequests, 3))) : 0;
        
        return {
          day,
          professional: dailyScans,
          verified: dailyTakedowns
        };
      });
      break;

    default:
      chartData = [];
  }

  // console.log(`📊 Chart data for ${platform}:`, chartData);
  return chartData;
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

    let emptyData = [];

    switch (platform) {
      case 'facebook':
        emptyData = Array.from({ length: dataPoints }, (_, index) => ({
          month: months[index % 12],
          scans: 0,
          takedowns: 0
        }));
        break;
      case 'instagram':
        emptyData = [{ name: 'No Data', value: 1, color: '#6B7280' }];
        break;
      case 'twitter':
        emptyData = days.map(day => ({ day, scans: 0, takedowns: 0 }));
        break;
      case 'tiktok':
        emptyData = Array.from({ length: dataPoints }, (_, index) => ({
          month: months[index % 12],
          profiles: 0,
          engagement: 0
        }));
        break;
      case 'linkedin':
        emptyData = days.map(day => ({ day, professional: 0, verified: 0 }));
        break;
      default:
        emptyData = [];
    }

    return emptyData;
  };

  const loadFallbackData = () => {
    console.warn('🔄 Loading fallback data from localStorage');
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

  // ... rest of your component (CustomTooltip, JSX, etc.) remains the same
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
