'use client';
import React, { useState } from 'react';
import { FileText, Download, Eye, Filter, Calendar, Search, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

const Reports = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const reports = [
    {
      id: 'RPT-001',
      profileName: 'John Smith',
      platform: 'Instagram',
      scanDate: '2024-09-28',
      status: 'completed',
      fakesFound: 5,
      confidence: 'high',
      profileUrl: '@johnsmith_official'
    },
    {
      id: 'RPT-002',
      profileName: 'Sarah Johnson',
      platform: 'Facebook',
      scanDate: '2024-09-27',
      status: 'completed',
      fakesFound: 0,
      confidence: 'low',
      profileUrl: 'sarah.johnson.1990'
    },
    {
      id: 'RPT-003',
      profileName: 'Mike Davis',
      platform: 'Twitter',
      scanDate: '2024-09-26',
      status: 'completed',
      fakesFound: 12,
      confidence: 'high',
      profileUrl: '@mikedavis'
    },
    {
      id: 'RPT-004',
      profileName: 'Emily Chen',
      platform: 'LinkedIn',
      scanDate: '2024-09-25',
      status: 'completed',
      fakesFound: 3,
      confidence: 'medium',
      profileUrl: 'emily-chen-marketing'
    },
    {
      id: 'RPT-005',
      profileName: 'Robert Wilson',
      platform: 'Instagram',
      scanDate: '2024-09-24',
      status: 'completed',
      fakesFound: 8,
      confidence: 'high',
      profileUrl: '@robertwilson'
    }
  ];

  const getConfidenceBadge = (confidence) => {
    const styles = {
      high: 'bg-red-500/20 text-red-400',
      medium: 'bg-yellow-500/20 text-yellow-400',
      low: 'bg-green-500/20 text-green-400'
    };
    return styles[confidence] || styles.low;
  };

  const filteredReports = reports.filter(report => {
    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'high-risk' && report.fakesFound > 5) ||
      (selectedFilter === 'medium-risk' && report.fakesFound > 0 && report.fakesFound <= 5) ||
      (selectedFilter === 'no-risk' && report.fakesFound === 0);

    const matchesSearch =
      report.profileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen text-gray-100">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Reports</h1>
        <p className="text-gray-400 mt-1">View and download detailed scan reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Reports</p>
              <p className="text-2xl font-bold text-white mt-1">147</p>
            </div>
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">High Risk</p>
              <p className="text-2xl font-bold text-red-400 mt-1">23</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Medium Risk</p>
              <p className="text-2xl font-bold text-yellow-400 mt-1">45</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">No Risk</p>
              <p className="text-2xl font-bold text-green-400 mt-1">79</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Reports</option>
              <option value="high-risk">High Risk</option>
              <option value="medium-risk">Medium Risk</option>
              <option value="no-risk">No Risk</option>
            </select>
          </div>

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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Report ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Profile URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Platform</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Scan Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fakes Found</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Risk Level</th>
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
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      report.fakesFound > 5 ? 'bg-red-500/20 text-red-400' :
                      report.fakesFound > 0 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {report.fakesFound}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getConfidenceBadge(report.confidence)}`}>
                      {report.confidence.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No reports found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Showing {filteredReports.length} of {reports.length} reports
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
