'use client';
import React from 'react';
import { X, ExternalLink, AlertCircle, Shield, Calendar, Users, MapPin, XCircle } from 'lucide-react';

// Generic Modal Component
const Modal = ({ isOpen, onClose, title, children, size = 'lg' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex items-center justify-center min-h-screen px-4 py-6 text-center sm:block sm:p-0">
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div
          className={`inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle w-full ${sizeClasses[size]} relative z-10`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto text-gray-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Detail Modal Component
const ProfileDetailModal = ({ isOpen, onClose, profile }) => {
  if (!profile) return null;

  const getStatusInfo = (status) => {
    const statusMap = {
      blocked: {
        icon: XCircle,
        text: 'Blocked',
        bgColor: 'bg-red-900/40',
        textColor: 'text-red-400',
        borderColor: 'border-red-700'
      },
      reported: {
        icon: AlertCircle,
        text: 'Reported',
        bgColor: 'bg-yellow-900/40',
        textColor: 'text-yellow-400',
        borderColor: 'border-yellow-700'
      },
      pending: {
        icon: AlertCircle,
        text: 'Pending Review',
        bgColor: 'bg-blue-900/40',
        textColor: 'text-blue-400',
        borderColor: 'border-blue-700'
      }
    };
    return statusMap[status] || statusMap.pending;
  };

  const statusInfo = getStatusInfo(profile.status);
  const StatusIcon = statusInfo.icon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Profile Details" size="lg">
      <div className="space-y-6">
        {/* Status Banner */}
        <div className={`${statusInfo.bgColor} ${statusInfo.borderColor} border rounded-lg p-4 flex items-center gap-3`}>
          <StatusIcon className={`w-6 h-6 ${statusInfo.textColor}`} />
          <div>
            <p className={`font-bold ${statusInfo.textColor}`}>{statusInfo.text}</p>
            <p className="text-sm text-gray-400">
              This profile has been {profile.status} on {profile.blockedDate}
            </p>
          </div>
        </div>

        {/* Fake Profile Only */}
        <div className="border-2 border-red-700 rounded-lg p-5 bg-red-950/50">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-bold text-red-300">Fake Profile</h3>
          </div>

          <div className="mb-4">
            <div className="w-full h-48 bg-gradient-to-br from-red-700 to-red-900 rounded-lg flex items-center justify-center">
              <Users className="w-20 h-20 text-white opacity-40" />
            </div>
          </div>

          <div className="space-y-3 text-gray-200">
            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase">Profile Name</label>
              <p className="text-sm font-bold text-white mt-1">{profile.fakeProfileName}</p>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase">Username/URL</label>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-200 font-medium">{profile.fakeProfileUrl}</p>
                <button className="text-blue-400 hover:text-blue-300">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase">Platform</label>
              <p className="text-sm text-gray-200 font-medium mt-1">{profile.platform}</p>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase">Followers</label>
              <p className="text-sm text-gray-200 font-medium mt-1">{profile.followers}</p>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase">Account Created</label>
              <p className="text-sm text-gray-200 font-medium mt-1">Aug 15, 2024</p>
            </div>

            <div>
              <label className="text-xs text-gray-400 font-semibold uppercase">Location</label>
              <p className="text-sm text-gray-200 font-medium mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Unknown / Spoofed
              </p>
            </div>
          </div>
        </div>

        {/* Detection Analysis */}
        <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">Detection Analysis</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <label className="text-xs text-gray-400 font-semibold uppercase">Similarity Score</label>
              <div className="flex items-baseline gap-2 mt-1">
                <span
                  className={`text-3xl font-bold ${
                    profile.similarity >= 90
                      ? 'text-red-400'
                      : profile.similarity >= 75
                      ? 'text-yellow-400'
                      : 'text-green-400'
                  }`}
                >
                  {profile.similarity}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${
                    profile.similarity >= 90
                      ? 'bg-red-500'
                      : profile.similarity >= 75
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${profile.similarity}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <label className="text-xs text-gray-400 font-semibold uppercase">Detection Date</label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-lg font-bold text-white">{profile.blockedDate}</span>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <label className="text-xs text-gray-400 font-semibold uppercase">Block ID</label>
              <p className="text-lg font-bold text-white mt-1">{profile.id}</p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <label className="text-xs text-gray-400 font-semibold uppercase mb-2 block">Reason for Block</label>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-sm font-bold text-white">{profile.reason}</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              This profile was automatically detected by our AI system and flagged for {profile.reason.toLowerCase()}. The similarity score indicates a high probability of fraudulent activity.
            </p>
          </div>
        </div>

        {/* Matching Indicators */}
        <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">Matching Indicators</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Profile Photo</p>
              <p className="text-2xl font-bold text-red-400">98%</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Display Name</p>
              <p className="text-2xl font-bold text-red-400">95%</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Bio/Description</p>
              <p className="text-2xl font-bold text-yellow-400">87%</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 text-center border border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Post Content</p>
              <p className="text-2xl font-bold text-yellow-400">82%</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Report to Platform
          </button>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
            Remove from List
          </button>
        </div>
      </div>
    </Modal>
  );
};

export { Modal, ProfileDetailModal };
