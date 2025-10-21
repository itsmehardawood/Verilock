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

      // Get stats from localStorage for each platform
      const platforms = ['facebook', 'instagram', 'twitter', 'tiktok', 'linkedin'];
      const platformStats = {};
      let totalProfilesDetected = 0;
      let totalTakedownRequests = 0;

      platforms.forEach(platform => {
        const statsKey = `${user_id}-${platform}-stats`;
        const platformData = localStorage.getItem(statsKey);
        
        if (platformData) {
          try {
            const stats = JSON.parse(platformData);
            platformStats[platform] = stats;
            totalProfilesDetected += stats.profilesDetected || 0;
            totalTakedownRequests += stats.takedownRequests || 0;
          } catch (parseError) {
            console.warn(`Error parsing stats for ${platform}:`, parseError);
            platformStats[platform] = {
              profilesDetected: 0,
              takedownRequests: 0,
              pending: 0,
              ignored: 0
            };
          }
        } else {
          platformStats[platform] = {
            profilesDetected: 0,
            takedownRequests: 0,
            pending: 0,
            ignored: 0
          };
        }
      });

      console.log('📊 Platform stats from localStorage:', platformStats);

      // Generate platform-specific data
      const platformDistribution = processPlatformDistributionFromStats(platformStats);
      const facebookData = generatePlatformData('facebook', platformStats.facebook, timeRange);
      const instagramData = generatePlatformData('instagram', platformStats.instagram, timeRange);
      const twitterData = generatePlatformData('twitter', platformStats.twitter, timeRange);
      const tiktokData = generatePlatformData('tiktok', platformStats.tiktok, timeRange);
      const linkedinData = generatePlatformData('linkedin', platformStats.linkedin, timeRange);

      // Calculate accuracy rate
      const accuracyRate = totalProfilesDetected > 0 
        ? Math.round((totalTakedownRequests / totalProfilesDetected) * 100)
        : 0;

      setAnalyticsData({
        totalScans: totalProfilesDetected,
        totalFakes: totalTakedownRequests,
        accuracyRate: accuracyRate > 100 ? 100 : accuracyRate,
        platformData: platformDistribution,
        facebookData,
        instagramData,
        twitterData,
        tiktokData,
        linkedinData
      });

    } catch (error) {
      console.error('Error in analytics data processing:', error);
      loadFallbackData();
    } finally {
      setLoading(false);
    }
  };

  const processPlatformDistributionFromStats = (platformStats) => {
    const platformMap = {
      'facebook': 'Facebook',
      'instagram': 'Instagram', 
      'twitter': 'Twitter',
      'tiktok': 'TikTok',
      'linkedin': 'LinkedIn'
    };

    const colors = {
      'Facebook': '#1877F2',
      'Instagram': '#E4405F',
      'Twitter': '#1DA1F2',
      'TikTok': '#000000',
      'LinkedIn': '#0A66C2'
    };

    return Object.entries(platformStats)
      .map(([platform, stats]) => ({
        name: platformMap[platform] || platform,
        value: stats.takedownRequests || 0,
        color: colors[platformMap[platform]] || '#6B7280'
      }))
      .filter(item => item.value > 0);
  };

  const generatePlatformData = (platform, stats, range) => {
    const scans = stats?.profilesDetected || 0;
    const takedowns = stats?.takedownRequests || 0;
    
    if (scans === 0 && takedowns === 0) {
      // Return empty data structure for platforms with no activity
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

    // Platform-specific data generation
    switch (platform) {
      case 'facebook':
        // Line chart data for Facebook
        return Array.from({ length: dataPoints }, (_, index) => {
          const monthIndex = (currentMonth - dataPoints + 1 + index + 12) % 12;
          const progress = index / dataPoints;
          const trendFactor = 0.7 + progress * 0.6;
          
          return {
            month: months[monthIndex],
            scans: Math.max(1, Math.round((scans / dataPoints) * trendFactor * (0.8 + Math.random() * 0.4))),
            takedowns: Math.max(0, Math.round((takedowns / dataPoints) * trendFactor * (0.8 + Math.random() * 0.4)))
          };
        });

      case 'instagram':
        // Pie chart data for Instagram
        const instagramStatusData = [
          { name: 'Takedowns', value: takedowns, color: '#E4405F' },
          { name: 'Pending', value: stats?.pending || 0, color: '#F59E0B' },
          { name: 'Ignored', value: stats?.ignored || 0, color: '#6B7280' },
          { name: 'Remaining', value: Math.max(0, scans - takedowns), color: '#10B981' }
        ].filter(item => item.value > 0);

        return instagramStatusData.length > 0 ? instagramStatusData : [
          { name: 'No Data', value: 1, color: '#6B7280' }
        ];

      case 'twitter':
        // Bar chart data for Twitter
        return days.map(day => {
          const dayMultiplier = 
            day === 'Wed' || day === 'Thu' ? 1.4 : 
            day === 'Tue' || day === 'Fri' ? 1.2 :
            day === 'Mon' ? 1.0 : 0.6;
          
          return {
            day,
            scans: Math.max(0, Math.round((scans / 7) * dayMultiplier * (0.8 + Math.random() * 0.4))),
            takedowns: Math.max(0, Math.round((takedowns / 7) * dayMultiplier * (0.8 + Math.random() * 0.4)))
          };
        });

      case 'tiktok':
        // Line chart data for TikTok (growth trend)
        return Array.from({ length: dataPoints }, (_, index) => {
          const monthIndex = (currentMonth - dataPoints + 1 + index + 12) % 12;
          const progress = index / dataPoints;
          // TikTok typically shows faster growth
          const growthFactor = 0.5 + progress * 1.0;
          
          return {
            month: months[monthIndex],
            profiles: Math.max(1, Math.round((scans / dataPoints) * growthFactor * (0.7 + Math.random() * 0.6))),
            engagement: Math.min(100, Math.round(60 + progress * 30 + (Math.random() - 0.5) * 10))
          };
        });

      case 'linkedin':
        // Bar chart data for LinkedIn (professional pattern)
        return days.map(day => {
          // LinkedIn has more activity on weekdays
          const dayMultiplier = 
            day === 'Tue' || day === 'Wed' || day === 'Thu' ? 1.5 : 
            day === 'Mon' || day === 'Fri' ? 1.2 : 0.3; // Very low weekend activity
          
          return {
            day,
            professional: Math.max(0, Math.round((scans / 7) * dayMultiplier * (0.8 + Math.random() * 0.4))),
            verified: Math.max(0, Math.round((takedowns / 7) * dayMultiplier * (0.8 + Math.random() * 0.4)))
          };
        });

      default:
        return [];
    }
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

    const platformDistribution = processPlatformDistributionFromStats(platformStats);
    const accuracyRate = totalProfilesDetected > 0 
      ? Math.round((totalTakedownRequests / totalProfilesDetected) * 100)
      : 0;

    setAnalyticsData({
      totalScans: totalProfilesDetected,
      totalFakes: totalTakedownRequests,
      accuracyRate: accuracyRate > 100 ? 100 : accuracyRate,
      platformData: platformDistribution,
      facebookData: generatePlatformData('facebook', platformStats.facebook, timeRange),
      instagramData: generatePlatformData('instagram', platformStats.instagram, timeRange),
      twitterData: generatePlatformData('twitter', platformStats.twitter, timeRange),
      tiktokData: generatePlatformData('tiktok', platformStats.tiktok, timeRange),
      linkedinData: generatePlatformData('linkedin', platformStats.linkedin, timeRange)
    });
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

  // const PlatformIcon = ({ platform, size = 24 }) => {
  //   const icons = {
  //     facebook: <Facebook className={`w-${size} h-${size} text-[#1877F2]`} />,
  //     instagram: <Instagram className={`w-${size} h-${size} text-[#E4405F]`} />,
  //     twitter: <Twitter className={`w-${size} h-${size} text-[#1DA1F2]`} />,
  //     tiktok: <TikTok className={`w-${size} h-${size} text-black`} />,
  //     linkedin: <Linkedin className={`w-${size} h-${size} text-[#0A66C2]`} />
  //   };
  //   return icons[platform] || <Activity className={`w-${size} h-${size}`} />;
  // };

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
          <p className="text-gray-300 mt-1">Individual platform performance insights</p>
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

      {/* Key Metrics */}
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