// // Search Form Component

// 'use client';
// import { AlertCircle, SearchIcon } from "lucide-react";
// import React, { useState } from "react";


// export default function  SearchForm () {
//   // const [handle, setHandle] = useState('');
//   const [username, setUsername] = useState('');

//   const [platforms, setPlatforms] = useState([]);

//   const handleCheckboxChange = (e) => {
//     const { value, checked } = e.target;

//     if (checked) {
//       // Add to array
//       setPlatforms([...platforms, value]);
//     } else {
//       // Remove from array
//       setPlatforms(platforms.filter((p) => p !== value));
//     }
//   };



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ username, platforms });
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Search for Fake Profiles</h2>
//         <p className="text-gray-600 mt-1">Enter the social media profile details to detect impersonation</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Name
//           </label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Name"
//             className="w-full px-4 py-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//           />
//         </div>
        
//         {/* Platform Selection */}
//         {/* <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Social Media Platform *
//           </label>
//           <select
//             value={platforms}
//             onChange={(e) => setPlatforms(e.target.value)}
//             className="w-full px-4 py-3 text-gray-600 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//             required
//           >
//             <option value="">Select a platform</option>
//             <option value="facebook">Facebook</option>
//             <option value="instagram">Instagram</option>
//             <option value="linkedin">LinkedIn</option>
//             <option value="tiktok">TikTok</option>
//           </select>
//         </div> */}
//          <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Social Media Platform *
//           </label>
//           <div className="space-y-2">
//             {["Facebook", "Instagram", "LinkedIn", "Tiktok"].map((platform) => (
//               <label key={platform} className="flex text-gray-700 items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   value={platform}
//                   checked={platforms.includes(platform)}
//                   onChange={handleCheckboxChange}
//                   className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <span className="capitalize">{platform}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Social handle */}
//         {/* <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Social_Handle
//           </label>
//           <input
//             type="text"
//             value={handle}
//             onChange={(e) => setHandle(e.target.value)}
//             placeholder="@username"
//             className="w-full px-4 py-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//           />
//         </div> */}

//         {/* Info Box */}
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
//           <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
//           <div className="text-sm text-blue-800">
//             <p className="font-medium">Each search costs 1 credit</p>
//             <p className="text-blue-700 mt-1">You have 250 credits remaining</p>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
//         >
//           <SearchIcon className="w-5 h-5" />
//           <span>Search for Duplicates</span>
//         </button>
//       </form>

//       {/* Recent Searches */}
//       <div className="mt-8 pt-6 border-t border-gray-200">
//         <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Searches</h3>
//         <div className="space-y-2">
//           {[
//             { platform: 'Instagram', username: '@johndoe', time: '2 hours ago' },
//             { platform: 'Facebook', username: 'John Doe', time: '5 hours ago' },
//           ].map((item, idx) => (
//             <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-800">{item.username}</p>
//                   <p className="text-xs text-gray-500">{item.platform}</p>
//                 </div>
//               </div>
//               <span className="text-xs text-gray-500">{item.time}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

'use client';
import { AlertCircle, SearchIcon } from "lucide-react";
import React, { useState } from "react";

export default function SearchForm() {
  const [username, setUsername] = useState('');
  const [platforms, setPlatforms] = useState([]);

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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <SearchIcon className="w-5 h-5" />
          <span>Search for Duplicates</span>
        </button>
      </form>

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
