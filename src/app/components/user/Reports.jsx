'use client';
import React, { useState } from 'react';
import { FileText, Download, Eye, Filter, Calendar, Search, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

const Reports = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const reports = [
    {
      id: 'RPT-001',
      profileName: 'John Smith',
      platform: 'Instagram',
      scanDate: '2024-09-28',
      status: 'completed',
      reason: 'Impersonated',
      profileUrl: '@johnsmith_official'
    },
    {
      id: 'RPT-002',
      profileName: 'Sarah Johnson',
      platform: 'Facebook',
      scanDate: '2025-09-27',
      status: 'completed',
      reason: 'Not Impersonated',
      profileUrl: 'sarah.johnson.1990'
    },
    {
      id: 'RPT-003',
      profileName: 'Mike Davis',
      platform: 'Twitter',
      scanDate: '2024-09-26',
      status: 'completed',
      reason: 'Impersonated',
      profileUrl: '@mikedavis'
    },
    {
      id: 'RPT-004',
      profileName: 'Emily Chen',
      platform: 'LinkedIn',
      scanDate: '2024-09-25',
      status: 'completed',
      reason: 'Not Impersonated',
      profileUrl: 'emily-chen-marketing'
    },
    {
      id: 'RPT-005',
      profileName: 'Robert Wilson',
      platform: 'Instagram',
      scanDate: '2024-09-24',
      status: 'completed',
      reason: 'Impersonated',
      profileUrl: '@robertwilson'
    }
  ];

  // Helper: Calculate date range based on timeframe filter
  const isWithinTimeframe = (dateStr, timeframe) => {
    if (timeframe === 'all') return true;

    const reportDate = new Date(dateStr);
    const today = new Date();
    const diffTime = today - reportDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    switch (timeframe) {
      case 'week':
        return diffDays <= 7;
      case 'month':
        return diffDays <= 30;
      case 'two-months':
        return diffDays <= 60;
      default:
        return true;
    }
  };

  const filteredReports = reports.filter(report => {
    // Filter by impersonation reason
    const matchesReason =
      selectedFilter === 'all' ||
      (selectedFilter === 'impersonated' && report.reason === 'Impersonated') ||
      (selectedFilter === 'not-impersonated' && report.reason === 'Not Impersonated');

    // Filter by platform
    const matchesPlatform =
      selectedPlatform === 'all' || report.platform.toLowerCase() === selectedPlatform.toLowerCase();

    // Filter by timeframe
    const matchesTimeframe = isWithinTimeframe(report.scanDate, selectedTimeframe);

    // Filter by search query
    const matchesSearch =
      report.profileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesReason && matchesPlatform && matchesTimeframe && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-black min-h-screen text-gray-100">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Reports</h1>
        <p className="text-gray-400 mt-1">View and download detailed scan reports</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800/15 rounded-lg shadow-md p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Reports</p>
              <p className="text-2xl font-bold text-white mt-1">147</p>
            </div>
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800/15 rounded-lg shadow-md p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Impersonated</p>
              <p className="text-2xl font-bold text-gray-200 mt-1">23</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-gray-800/15 rounded-lg shadow-md p-4 border ">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Not impersonated</p>
              <p className="text-2xl font-bold text-gray-200 mt-1">45</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </div>

        {/* <div className="bg-gray-800/15 rounded-lg shadow-md p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">No Risk</p>
              <p className="text-2xl font-bold text-gray-400 mt-1">79</p>
            </div>
            <CheckCircle className="w-8 h-8 text-gray-400" />
          </div>
        </div> */}
      </div>

      {/* Filters */}
      <div className="bg-gray-800/15 rounded-lg shadow-md p-6 border border-gray-600">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 flex-wrap">
          <div className="flex flex-wrap items-center gap-3">
            {/* Reason Filter */}
            {/* <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Reports</option>
                <option value="impersonated">Impersonated</option>
                <option value="not-impersonated">Not Impersonated</option>
              </select>
            </div> */}

            {/* Platform Filter */}
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Platforms</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Twitter">Twitter</option>
              <option value="Twitter">Tiktok</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>

            {/* Timeframe Filter */}
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="two-months">Last 2 Months</option>
            </select>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports..."
              className="w-full pl-10 pr-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Report ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Profile URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Platform</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Scan Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{report.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{report.profileName}</div>
                      <div className="text-sm text-gray-400">{report.profileUrl}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{report.platform}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {report.scanDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        report.reason === 'Impersonated'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {report.reason}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No reports found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Showing {filteredReports.length} of {reports.length} reports
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
