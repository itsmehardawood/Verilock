
'use client';
import { searchProfiles } from "@/app/lib/api/customer";
import { AlertCircle, SearchIcon, Loader2 } from "lucide-react";
import React, { useState } from "react";

export default function SearchForm() {
  const [username, setUsername] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPlatforms([...platforms, value]);
    } else {
      setPlatforms(platforms.filter((p) => p !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log({ username, platforms });
    // Reset states
    setError(null);
    setSearchResults(null);

    // Validation
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    if (platforms.length === 0) {
      setError("Please select at least one platform");
      return;
    }
    
    setLoading(true);

    try {
      const result = await searchProfiles({
        name: username,
        platforms: platforms,
      });

      if (result.success) {
        setSearchResults(result.data);
        console.log("Search results:", result.data);
        
        // Optional: You can redirect to results page or show results inline
        // router.push('/customer/results');
      } else {
        setError(result.error || "Failed to search profiles");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-700 p-6">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Search for Fake Profiles</h2>
        <p className="text-gray-400 mt-1">
          Enter the social media profile details to detect impersonation
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-900/40 border border-red-700 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {searchResults && (
        <div className="mb-4 bg-green-900/40 border border-green-700 rounded-lg p-4">
          <p className="text-sm text-green-300 font-medium">
            {searchResults.message || "Search completed successfully!"}
          </p>
          <p className="text-sm text-green-400 mt-1">
            Found {searchResults.profiles?.length || 0} profile(s)
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            UserName
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter social profile name for search"
            className="w-full px-4 py-3 bg-gray-800 text-gray-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            disabled={loading}
          />
        </div>

        {/* Platforms */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Social Media Platform *
          </label>
          <div className="space-y-2">
            {["Facebook", "Instagram", "LinkedIn", "Tiktok"].map((platform) => (
              <label
                key={platform}
                className="flex text-gray-200 items-center space-x-2"
              >
                <input
                  type="checkbox"
                  value={platform}
                  checked={platforms.includes(platform)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-500 border-gray-600 rounded focus:ring-blue-500 bg-gray-800"
                  disabled={loading}
                />
                <span className="capitalize">{platform}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-900/40 border border-blue-700 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-300">
            <p className="font-medium">Each search costs 1 credit</p>
            <p className="mt-1">You have 250 credits remaining</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Searching...</span>
            </>
          ) : (
            <>
              <SearchIcon className="w-5 h-5" />
              <span>Search for Duplicates</span>
            </>
          )}
        </button>
      </form>

      {/* Search Results */}
      {searchResults && searchResults.profiles && searchResults.profiles.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">
            Search Results
          </h3>
          <div className="space-y-2">
            {searchResults.profiles.map((profile, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-300">
                      {profile.platform.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-100">
                      {profile.profile_name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {profile.platform} • {profile.profile_handle}
                    </p>
                    <a 
                      href={profile.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
                {profile.is_duplicate && (
                  <span className="px-3 py-1 bg-red-900/40 text-red-400 text-xs font-medium rounded-full border border-red-700">
                    Duplicate
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Searches */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">
          Recent Searches
        </h3>
        <div className="space-y-2">
          {[
            { platform: "Instagram", username: "@johndoe", time: "2 hours ago" },
            { platform: "Facebook", username: "John Doe", time: "5 hours ago" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-100">
                    {item.username}
                  </p>
                  <p className="text-xs text-gray-400">{item.platform}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}