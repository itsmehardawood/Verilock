'use client';
import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Activity, AlertCircle, Calendar, Download } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30days');

  // Scan trends data
  const scanTrendsData = [
    { month: 'Jan', scans: 45, fakesFound: 8 },
    { month: 'Feb', scans: 52, fakesFound: 12 },
    { month: 'Mar', scans: 48, fakesFound: 9 },
    { month: 'Apr', scans: 61, fakesFound: 15 },
    { month: 'May', scans: 55, fakesFound: 11 },
    { month: 'Jun', scans: 67, fakesFound: 18 },
    { month: 'Jul', scans: 72, fakesFound: 21 },
    { month: 'Aug', scans: 68, fakesFound: 19 },
    { month: 'Sep', scans: 78, fakesFound: 23 }
  ];

  // Platform distribution data
  const platformData = [
    { name: 'Instagram', value: 145, color: '#E4405F' },
    { name: 'Facebook', value: 98, color: '#1877F2' },
    { name: 'Twitter', value: 67, color: '#1DA1F2' },
    { name: 'LinkedIn', value: 45, color: '#0A66C2' },
    { name: 'TikTok', value: 32, color: '#000000' }
  ];

  // Risk level distribution
  const riskData = [
    { name: 'High Risk', value: 89, color: '#EF4444' },
    { name: 'Medium Risk', value: 142, color: '#F59E0B' },
    { name: 'Low Risk', value: 256, color: '#10B981' }
  ];

  // Weekly activity data
  const weeklyData = [
    { day: 'Mon', scans: 12, blocked: 3 },
    { day: 'Tue', scans: 15, blocked: 4 },
    { day: 'Wed', scans: 18, blocked: 6 },
    { day: 'Thu', scans: 14, blocked: 2 },
    { day: 'Fri', scans: 20, blocked: 5 },
    { day: 'Sat', scans: 8, blocked: 1 },
    { day: 'Sun', scans: 6, blocked: 2 }
  ];

  // Detection accuracy over time
  const accuracyData = [
    { month: 'Jan', accuracy: 87 },
    { month: 'Feb', accuracy: 89 },
    { month: 'Mar', accuracy: 91 },
    { month: 'Apr', accuracy: 90 },
    { month: 'May', accuracy: 93 },
    { month: 'Jun', accuracy: 94 },
    { month: 'Jul', accuracy: 95 },
    { month: 'Aug', accuracy: 96 },
    { month: 'Sep', accuracy: 97 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black p-3 rounded-lg shadow-lg border border-gray-200">
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-200">Analytics</h1>
          <p className="text-gray-300 mt-1">Track detection performance and insights</p>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-black  text-gray-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-black rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100/25 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            {/* <span className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              12%
            </span> */}
          </div>
          <h3 className="text-gray-200 text-sm font-medium">Total Scans</h3>
          <p className="text-3xl font-bold text-gray-100 mt-1">387</p>
          {/* <p className="text-xs text-gray-500 mt-2">+45 from last month</p> */}
        </div>

        <div className="bg-black rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-red-100/25 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <span className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              8%
            </span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Fakes Detected</h3>
          <p className="text-3xl font-bold text-gray-200 mt-1">89</p>
          <p className="text-xs text-gray-500 mt-2">23% detection rate</p>
        </div>

        <div className="bg-black rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100/25 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              3%
            </span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Accuracy Rate</h3>
          <p className="text-3xl font-bold text-gray-200 mt-1">97%</p>
          <p className="text-xs text-gray-500 mt-2">Improved from 94%</p>
        </div>

        {/* <div className="bg-black rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <span className="flex items-center text-red-600 text-sm font-medium">
              <TrendingDown className="w-4 h-4 mr-1" />
              5%
            </span>
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Avg Response Time</h3>
          <p className="text-3xl font-bold text-gray-200 mt-1">2.3s</p>
          <p className="text-xs text-gray-500 mt-2">Faster processing</p>
        </div> */}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Scan Trends Chart */}
        <div className="bg-black rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-lg font-bold text-gray-200">Facebook Scans Trend</h1>
              {/* <h2 className="text-lg font-bold text-gray-200">Scan Trends</h2> */}
              <p className="text-sm text-gray-400">Monthly scans vs fakes found</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={scanTrendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="scans" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Total Scans"
                dot={{ fill: '#3B82F6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="fakesFound" 
                stroke="#EF4444" 
                strokeWidth={2}
                name="Fakes Found"
                dot={{ fill: '#EF4444', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Distribution */}
        <div className="bg-black rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-200">All Channels Distribution</h2>
              <p className="text-sm text-gray-400">Scans by social media platform</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#ffffff"
                dataKey="value"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Activity */}
        <div className="bg-black rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-200">Instagram Chart</h2>
              <p className="text-sm text-gray-400">Scans and blocks this week</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="scans" fill="#3B82F6" name="Scans" radius={[8, 8, 0, 0]} />
              <Bar dataKey="blocked" fill="#EF4444" name="Blocked" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-black rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-200">LinkedIn Scans</h2>
              <p className="text-sm text-gray-400">Scans and blocks this week</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="scans" fill="#3B82F6" name="Scans" radius={[8, 8, 0, 0]} />
              <Bar dataKey="blocked" fill="#EF4444" name="Blocked" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        {/* <div className="bg-black rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-200">LinkedIn Profiles </h2>
              <p className="text-sm text-gray-400">Profiles categorized by risk</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div> */}
      </div>

      {/* Detection Accuracy Chart */}
      <div className="bg-black rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-200">TikTok profiles Graph </h2>
            <p className="text-sm text-gray-400"></p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={accuracyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
            <YAxis domain={[80, 100]} stroke="#6B7280" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="accuracy" 
              stroke="#10B981" 
              strokeWidth={3}
              name="profiles %"
              dot={{ fill: '#10B981', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {/* <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Most Active Platform</h3>
          <p className="text-2xl font-bold text-blue-600">Instagram</p>
          <p className="text-sm text-blue-700 mt-1">37% of total scans</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-5 border border-red-200">
          <h3 className="text-sm font-semibold text-red-900 mb-2">Peak Detection Day</h3>
          <p className="text-2xl font-bold text-red-600">Wednesday</p>
          <p className="text-sm text-red-700 mt-1">33% more fakes found</p>
        </div>
         */}
        {/* <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 border border-green-200">
          <h3 className="text-sm font-semibold text-green-900 mb-2">Success Rate</h3>
          <p className="text-2xl font-bold text-green-600">94.5%</p>
          <p className="text-sm text-green-700 mt-1">Profiles successfully blocked</p>
        </div> */}
      </div>
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