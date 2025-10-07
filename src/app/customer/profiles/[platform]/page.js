'use client';
import { useParams } from 'next/navigation';
import SearchProfile from '@/app/components/customer/search_Profile';
import { AlertCircle, CreditCard, Search } from 'lucide-react';
import React, { useState } from 'react';
import { searchProfiles } from '@/app/lib/api/customer';
import ProfileDetailsCard from '@/app/components/customer/modal';
// import ProfileDetailsModal from '@/app/components/customer/ProfileDetailsModal'; // ✅ import modal

export default function PlatformProfilePage() {
  const { platform } = useParams();
  const [data, setData] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null); // ✅ to show profile details

  // Stats states
  const [totalDetected, setTotalDetected] = useState(0);
  const [totalTakedowns, setTotalTakedowns] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalIgnored, setTotalIgnored] = useState(0);

  // Profiles state
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Search handler
  const handleSearch = async (name) => {
    setLoading(true);
    setError('');
    setProfiles([]);

    const res = await searchProfiles({ name, platforms: [platform] });

    if (res.success) {
      const foundProfiles = res.data?.profiles || [];
      setProfiles(foundProfiles);

      // Update stats dynamically
      setTotalDetected((prev) => prev + foundProfiles.length);

      const newTakedowns = foundProfiles.filter(p => p.status === 'takedown').length;
      const newPending = foundProfiles.filter(p => p.status === 'pending').length;
      const newIgnored = foundProfiles.filter(p => p.status === 'ignored').length;

      setTotalTakedowns(prev => prev + newTakedowns);
      setTotalPending(prev => prev + newPending);
      setTotalIgnored(prev => prev + newIgnored);
    } else {
      setError(res.error || 'Search failed.');
    }

    setLoading(false);
  };

  // ✅ If a profile is selected, show the detail view
  if (selectedProfile) {
    return (
      <div className="flex h-screen bg-black">
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto">
              <ProfileDetailsCard
                isOpen={true}
                profile={selectedProfile}
                onClose={() => setSelectedProfile(null)} // go back to stats & search
              />
            </div>
          </main>
        </div>
      </div>
    );
  }

  // ✅ Default dashboard view
  return (
    <div className="flex h-screen bg-black">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <StatCard
                title="Total Profiles Detected"
                value={totalDetected}
                icon={<Search className="w-6 h-6 text-blue-600" />}
                bg="bg-blue-400/20"
              />
              <StatCard
                title="Total Takedown Requests"
                value={totalTakedowns}
                icon={<AlertCircle className="w-6 h-6 text-red-600" />}
                bg="bg-red-100/10"
              />
              <StatCard
                title="Total Pending"
                value={totalPending}
                icon={<CreditCard className="w-6 h-6 text-yellow-600" />}
                bg="bg-green-200/15"
              />
              <StatCard
                title="Total Ignored"
                value={totalIgnored}
                icon={<CreditCard className="w-6 h-6 text-gray-600" />}
                bg="bg-gray-200/15"
              />
            </div>

            {/* Search + Results */}
            <div>
              <SearchProfile
                platform={platform}
                data={data}
                onSearchComplete={(results) => {
                  const foundProfiles = results || [];
                  setProfiles(foundProfiles);
                  setTotalDetected((prev) => prev + foundProfiles.length);
                }}
                onViewProfile={(profile) => setSelectedProfile(profile)} // ✅ pass to open detail view
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ✅ Reusable stat card
const StatCard = ({ title, value, icon, bg }) => (
  <div className="bg-black rounded-xl shadow-sm border border-gray-700 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-300">{title}</p>
        <p className="text-3xl font-bold text-gray-200 mt-1">{value}</p>
      </div>
      <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);
