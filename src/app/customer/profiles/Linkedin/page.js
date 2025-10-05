// import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, AlertCircle, Clock, XCircle, Download } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaTiktok } from 'react-icons/fa';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30days');

  // Platform data structure with real React Icons
  const platformsData = {
    facebook: {
      name: 'Facebook',
      icon: <FaFacebook className="text-3xl text-[#1877F2]"/>,
      color: '#1877F2',
      data: [
        { month: 'Jan', totalDetected: 45, takedownRequests: 30, reviewLater: 10, ignored: 5 },
        { month: 'Feb', totalDetected: 52, takedownRequests: 35, reviewLater: 12, ignored: 5 },
        { month: 'Mar', totalDetected: 48, takedownRequests: 32, reviewLater: 11, ignored: 5 },
        { month: 'Apr', totalDetected: 61, takedownRequests: 40, reviewLater: 15, ignored: 6 },
        { month: 'May', totalDetected: 55, takedownRequests: 38, reviewLater: 12, ignored: 5 },
        { month: 'Jun', totalDetected: 67, takedownRequests: 45, reviewLater: 16, ignored: 6 }
      ],
      totalStats: { detected: 328, takedowns: 220, review: 76, ignored: 32 }
    },
    instagram: {
      name: 'Instagram',
      icon: <FaInstagram className="text-3xl text-[#E4405F]" />,
      color: '#E4405F',
      data: [
        { month: 'Jan', totalDetected: 62, takedownRequests: 45, reviewLater: 12, ignored: 5 },
        { month: 'Feb', totalDetected: 68, takedownRequests: 50, reviewLater: 13, ignored: 5 },
        { month: 'Mar', totalDetected: 71, takedownRequests: 52, reviewLater: 14, ignored: 5 },
        { month: 'Apr', totalDetected: 78, takedownRequests: 58, reviewLater: 15, ignored: 5 },
        { month: 'May', totalDetected: 82, takedownRequests: 60, reviewLater: 17, ignored: 5 },
        { month: 'Jun', totalDetected: 89, takedownRequests: 65, reviewLater: 18, ignored: 6 }
      ],
      totalStats: { detected: 450, takedowns: 330, review: 89, ignored: 31 }
    },
    twitter: {
      name: 'Twitter/X',
      icon: <FaTwitter className="text-3xl text-[#1DA1F2]" />,
      color: '#1DA1F2',
      data: [
        { month: 'Jan', totalDetected: 38, takedownRequests: 25, reviewLater: 9, ignored: 4 },
        { month: 'Feb', totalDetected: 42, takedownRequests: 28, reviewLater: 10, ignored: 4 },
        { month: 'Mar', totalDetected: 45, takedownRequests: 30, reviewLater: 11, ignored: 4 },
        { month: 'Apr', totalDetected: 50, takedownRequests: 35, reviewLater: 11, ignored: 4 },
        { month: 'May', totalDetected: 48, takedownRequests: 33, reviewLater: 11, ignored: 4 },
        { month: 'Jun', totalDetected: 53, takedownRequests: 37, reviewLater: 12, ignored: 4 }
      ],
      totalStats: { detected: 276, takedowns: 188, review: 64, ignored: 24 }
    },
    linkedin: {
      name: 'LinkedIn',
      icon: <FaLinkedin className="text-3xl text-[#0A66C2]" />,
      color: '#0A66C2',
      data: [
        { month: 'Jan', totalDetected: 28, takedownRequests: 20, reviewLater: 6, ignored: 2 },
        { month: 'Feb', totalDetected: 32, takedownRequests: 23, reviewLater: 7, ignored: 2 },
        { month: 'Mar', totalDetected: 30, takedownRequests: 22, reviewLater: 6, ignored: 2 },
        { month: 'Apr', totalDetected: 35, takedownRequests: 26, reviewLater: 7, ignored: 2 },
        { month: 'May', totalDetected: 38, takedownRequests: 28, reviewLater: 8, ignored: 2 },
        { month: 'Jun', totalDetected: 42, takedownRequests: 31, reviewLater: 9, ignored: 2 }
      ],
      totalStats: { detected: 205, takedowns: 150, review: 43, ignored: 12 }
    },
    tiktok: {
      name: 'TikTok',
      icon: <FaTiktok className="text-3xl text-[#00F2EA]" />,
      color: '#00F2EA',
      data: [
        { month: 'Jan', totalDetected: 35, takedownRequests: 22, reviewLater: 9, ignored: 4 },
        { month: 'Feb', totalDetected: 40, takedownRequests: 26, reviewLater: 10, ignored: 4 },
        { month: 'Mar', totalDetected: 38, takedownRequests: 24, reviewLater: 10, ignored: 4 },
        { month: 'Apr', totalDetected: 45, takedownRequests: 30, reviewLater: 11, ignored: 4 },
        { month: 'May', totalDetected: 42, takedownRequests: 28, reviewLater: 10, ignored: 4 },
        { month: 'Jun', totalDetected: 48, takedownRequests: 32, reviewLater: 12, ignored: 4 }
      ],
      totalStats: { detected: 248, takedowns: 162, review: 62, ignored: 24 }
    }
  };

  // Calculate total stats across all platforms
  const totalStats = Object.values(platformsData).reduce(
    (acc, platform) => ({
      detected: acc.detected + platform.totalStats.detected,
      takedowns: acc.takedowns + platform.totalStats.takedowns,
      review: acc.review + platform.totalStats.review,
      ignored: acc.ignored + platform.totalStats.ignored
    }),
    { detected: 0, takedowns: 0, review: 0, ignored: 0 }
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-600">
          <p className="font-semibold text-gray-100 mb-2">{label}</p>
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

  const PlatformChart = ({ platform, data }) => (
    <div className="bg-black rounded-lg shadow-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {data.icon}
          <div>
            <h2 className="text-xl font-bold text-gray-100">{data.name}</h2>
            <p className="text-sm text-gray-400">Detection breakdown over time</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-100">{data.totalStats.detected}</p>
          <p className="text-xs text-gray-400">Total Detected</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-black rounded-lg p-3 border border-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-blue-400" />
            <p className="text-xs text-gray-400">Detected</p>
          </div>
          <p className="text-lg font-bold text-gray-100">{data.totalStats.detected}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <p className="text-xs text-gray-400">Takedowns</p>
          </div>
          <p className="text-lg font-bold text-gray-100">{data.totalStats.takedowns}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-yellow-400" />
            <p className="text-xs text-gray-400">Review</p>
          </div>
          <p className="text-lg font-bold text-gray-100">{data.totalStats.review}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="w-4 h-4 text-gray-400" />
            <p className="text-xs text-gray-400">Ignored</p>
          </div>
          <p className="text-lg font-bold text-gray-100">{data.totalStats.ignored}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="month" 
            stroke="#9CA3AF" 
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9CA3AF" 
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ color: '#9CA3AF' }}
            iconType="circle"
          />
          <Bar 
            dataKey="totalDetected" 
            stackId="a"
            fill="#3B82F6" 
            name="Total Detected"
            radius={[0, 0, 0, 0]}
          />
          <Bar 
            dataKey="takedownRequests" 
            stackId="a"
            fill="#EF4444" 
            name="Takedown Requests"
            radius={[0, 0, 0, 0]}
          />
          <Bar 
            dataKey="reviewLater" 
            stackId="a"
            fill="#F59E0B" 
            name="Review Later"
            radius={[0, 0, 0, 0]}
          />
          <Bar 
            dataKey="ignored" 
            stackId="a"
            fill="#6B7280" 
            name="Ignored"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-100">Platform Analytics</h1>
            <p className="text-gray-400 mt-2">Track detection performance across social media platforms</p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-black to-black rounded-lg shadow-lg border border-blue-700 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-200" />
              </div>
            </div>
            <h3 className="text-gray-300 text-sm font-medium mb-1">Total Detected</h3>
            <p className="text-4xl font-bold text-white">{totalStats.detected}</p>
            <p className="text-xs text-blue-200 mt-2">Across all platforms</p>
          </div>

          <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg shadow-lg border border-red-700 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-red-700 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-200" />
              </div>
            </div>
            <h3 className="text-gray-300 text-sm font-medium mb-1">Takedown Requests</h3>
            <p className="text-4xl font-bold text-white">{totalStats.takedowns}</p>
            <p className="text-xs text-red-200 mt-2">{((totalStats.takedowns / totalStats.detected) * 100).toFixed(1)}% of detected</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 rounded-lg shadow-lg border border-yellow-700 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-yellow-700 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-200" />
              </div>
            </div>
            <h3 className="text-gray-300 text-sm font-medium mb-1">Review Later</h3>
            <p className="text-4xl font-bold text-white">{totalStats.review}</p>
            <p className="text-xs text-yellow-200 mt-2">Pending review</p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-gray-300" />
              </div>
            </div>
            <h3 className="text-gray-300 text-sm font-medium mb-1">Ignored</h3>
            <p className="text-4xl font-bold text-white">{totalStats.ignored}</p>
            <p className="text-xs text-gray-400 mt-2">Marked as safe</p>
          </div>
        </div>

        <div className="space-y-6">
          <PlatformChart platform="instagram" data={platformsData.instagram} />
          <PlatformChart platform="facebook" data={platformsData.facebook} />
          <PlatformChart platform="twitter" data={platformsData.twitter} />
          <PlatformChart platform="linkedin" data={platformsData.linkedin} />
          <PlatformChart platform="tiktok" data={platformsData.tiktok} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;