
'use client';
import { AlertCircle, SearchIcon } from "lucide-react";
import React, { useState } from "react";

export default function Facebook() {
  const [username, setUsername] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPlatforms([...platforms, value]);
    } else {
      setPlatforms(platforms.filter((p) => p !== value));
    }
  };

    const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare payload
    const formData = {
      username, // just an example field
      platforms, // array of selected platforms
    };

    console.log("Submitting data:", formData);

    // Example: send to backend
    fetch(`${API_BASE_URL}/customer/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log({ username, platforms });
  // };

  return (
    <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-700 p-6">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Search for Fake Profiles</h2>
        <p className="text-gray-400 mt-1">
          Enter the social media profile details to detect impersonation
        </p>
      </div>

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
          />
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <SearchIcon className="w-5 h-5" />
          <span>Search for Duplicates</span>
        </button>
      </form>
    </div>
  );
}
