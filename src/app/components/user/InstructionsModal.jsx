// // components/InstructionsModal.js
// 'use client';
// import React, { useState } from 'react';
// import { X, AlertCircle, CheckCircle } from 'lucide-react';
// import { PLATFORM_INSTRUCTIONS, COLOR_CLASSES } from '@/app/lib/instructions';
// // import { PLATFORM_INSTRUCTIONS, COLOR_CLASSES } from '@/utils/platform-instructions';
// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// const InstructionsModal = ({ isOpen, onClose, platform ,profile, onTakedownRequest }) => {
//   const [isReporting, setIsReporting] = useState(false);
//   const [reportSuccess, setReportSuccess] = useState(false);


//   if (!isOpen || !platform) return null;

//   const instructions = PLATFORM_INSTRUCTIONS[platform];
//   if (!instructions) return null;

//   // Handle the "Let's Continue" button click
//   const handleContinue = async () => {
//     if (reportSuccess) {
//       // If already reported successfully, just close
//       onClose();
//       return;
//     }

//     setIsReporting(true);
//     try {
//       // Get user_id from localStorage (logged in user)
//       const user_id = localStorage.getItem('user_id') || localStorage.getItem('userId');
      
//       if (!user_id) {
//         throw new Error('User not found. Please login again.');
//       }

//       // Prepare report data according to API requirements
//       const reportData = {
//         reportedProfile: {
//           id: profile.id.toString(),
//           platform: platform.charAt(0).toUpperCase() + platform.slice(1), // Capitalize platform name
//           username: profile.username,
//           fullName: profile.fullName,
//           profileUrl: profile.profileUrl,
//           profilePicUrl: profile.profilePicUrl,
//           followers: 0
//         },
//         reason: "Impersonation",
//         status: "takedown_complete"
//       };

//       console.log('📤 Sending report data:', reportData);

//       const response = await fetch(`${BASE_URL}/api/takedown?user_id=${user_id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(reportData),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log('✅ Profile reported successfully:', result);
//         setReportSuccess(true);

//         // ✅ CALLBACK: Increment takedown requests count
//         if (onTakedownRequest) {
//           onTakedownRequest();
//         }
        
//         // Close modal after 2 seconds automatically
//         setTimeout(() => {
//           onClose();
//         }, 2000);
//       } else {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to report profile');
//       }
//     } catch (error) {
//       console.error('❌ Error reporting profile:', error);
//       alert(error.message || 'Failed to report profile. Please try again.');
//     } finally {
//       setIsReporting(false);
//     }
//   };


//   // Show success state
//   if (reportSuccess) {
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//         <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md mx-4">
//           <div className="p-8 text-center">
//             <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//             <h3 className="text-2xl font-bold text-white mb-2">Reported Successfully! ✅</h3>
//             <p className="text-gray-300 text-lg mb-4">
//               {platform.charAt(0).toUpperCase() + platform.slice(1)} profile has been reported successfully.
//             </p>
//             <p className="text-gray-400 text-sm">Redirecting...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-start justify-start bg-black/70 backdrop-blur-sm md:pl-16 md:pt-16">
//       <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto mx-4">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-900 rounded-t-2xl">
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <AlertCircle className="w-6 h-6 text-red-400" />
//               <div className="absolute inset-0 text-red-400 animate-ping opacity-75">
//                 <AlertCircle className="w-6 h-6" />
//               </div>
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-white">Reporting Instructions</h2>
//               <p className="text-gray-400 text-sm">Follow these steps carefully</p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-200 transition-colors p-2 hover:bg-gray-800 rounded-lg"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {/* <div className="mb-6">
//             <h3 className="text-red-400 font-bold text-lg mb-2">{instructions.title}</h3>
//             <p className="text-gray-400 text-sm">{instructions.description}</p>
//           </div> */}

//           <div className="space-y-4">
//             {instructions.steps.map((step, index) => {
//               const colorClass = COLOR_CLASSES[step.color] || COLOR_CLASSES.blue;
//               return (
//                 <div
//                   key={step.number}
//                   className={`flex items-start gap-4 p-4 bg-gradient-to-r ${colorClass.bg} border ${colorClass.border} rounded-xl hover:${colorClass.hover} transition-all duration-300 animate-fade-in`}
//                   style={{ animationDelay: `${index * 100}ms` }}
//                 >
//                   <div className="flex-shrink-0">
//                     <div className="relative">
//                       <div className={`w-8 h-8 bg-gradient-to-br ${colorClass.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
//                         {step.number}
//                       </div>
//                       <div className={`absolute inset-0 ${colorClass.ping} rounded-full animate-ping opacity-60`} 
//                            style={{ animationDelay: `${index * 1000}ms` }}></div>
//                     </div>
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-gray-100 font-medium mb-1">{step.title}</p>
//                     <p className="text-gray-300 text-sm">{step.description}</p>
//                     {step.important && (
//                       <div className="mt-2 flex items-center gap-2 text-xs text-purple-300">
//                         <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
//                         <span>{step.important}</span>
//                       </div>
//                     )}
//                   </div>
//                   {step.icon && (
//                     <div className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
//                       <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
//                         <span className="text-2xl">{step.icon}</span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}

//             {/* Final Step */}
//             <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl hover:border-green-500/50 transition-all duration-300 animate-fade-in" 
//                  style={{ animationDelay: `${instructions.steps.length * 100}ms` }}>
//               <div className="flex-shrink-0">
//                 <div className="relative">
//                   <CheckCircle className="w-8 h-8 text-green-400" />
//                   <div className="absolute inset-0 text-green-400 animate-ping opacity-60" 
//                        style={{ animationDelay: `${instructions.steps.length * 1000}ms` }}></div>
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <p className="text-green-400 font-bold mb-1">{instructions.finalStep.title}</p>
//                 <p className="text-gray-300 text-sm">{instructions.finalStep.description}</p>
//                 {/* <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
//                   <p className="text-green-300 text-xs font-medium">
//                     💡 {instructions.finalStep.important}
//                   </p>
//                 </div> */}
//               </div>
//             </div>
//           </div>

//           {/* Action Button */}
//           {/* <div className=" pt-6 border-t border-gray-700">
//             <button
//               onClick={onClose}
//               className="w-full bg-red-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
//             >
//               Submit Takedown 
//             </button>
//           </div> */}

//           {/* Action Button */}
//           <div className="mt-8 pt-6 border-t border-gray-700">
//             <button
//               onClick={handleContinue}
//               disabled={isReporting}
//               className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {isReporting ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   Reporting...
//                 </>
//               ) : (
//                 "I've Completed Reporting - Submit Takedown"
//               )}
//             </button>
//             {/* <p className="text-gray-400 text-xs text-center mt-2">
//               Click after you've completed all the steps on {platform.charAt(0).toUpperCase() + platform.slice(1)}
//             </p> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstructionsModal;

// components/InstructionsModal.js
'use client';
import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle, Loader2, ExternalLink } from 'lucide-react';
import { PLATFORM_INSTRUCTIONS, COLOR_CLASSES } from '@/app/lib/instructions';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const InstructionsModal = ({ isOpen, onClose, platform, profile, onTakedownRequest }) => {
  const [isReporting, setIsReporting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  if (!isOpen || !platform) return null;

  const instructions = PLATFORM_INSTRUCTIONS[platform];
  if (!instructions) return null;

  // Function to open reporting URL in new window
  const openReportWindow = (url) => {
    const width = 600;
    const height = 500;
    const left = window.screenX + (window.outerWidth - width) / 6;
    const top = window.screenY + (window.outerHeight - height) / 4;
    
    const features = `
      width=${width},
      height=${height},
      left=${left},
      top=${top},
      resizable=yes,
      scrollbars=yes,
      status=no,
      toolbar=no,
      menubar=no,
      noopener,
      noreferrer
    `.replace(/\s+/g, "");

    window.open(url, "_blank", features);
  };

  // Function to open profile in new window
  const openProfileWindow = (url) => {
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 1;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const features = `
      width=${width},
      height=${height},
      left=${left},
      top=${top},
      resizable=yes,
      scrollbars=yes,
      status=no,
      toolbar=no,
      menubar=no,
      noopener,
      noreferrer
    `.replace(/\s+/g, "");

    window.open(url, "_blank", features);
  };

  // Handle the "Let's Continue" button click
  const handleContinue = async () => {
    if (reportSuccess) {
      onClose();
      return;
    }

    // Validate profile data before proceeding
    if (!profile) {
      alert('Profile information is missing. Please try again.');
      return;
    }

    if (!profile.id) {
      alert('Profile ID is missing. Cannot submit report.');
      return;
    }

    setIsReporting(true);
    try {
      // Get user_id from localStorage (logged in user)
      const user_id = localStorage.getItem('user_id') || localStorage.getItem('userId');
      
      if (!user_id) {
        throw new Error('User not found. Please login again.');
      }

      // Prepare report data with safe property access
      const reportData = {
        reportedProfile: {
          id: profile.id?.toString() || 'unknown',
          platform: platform.charAt(0).toUpperCase() + platform.slice(1),
          username: profile.username || 'N/A',
          fullName: profile.fullName || 'Unknown User',
          profileUrl: profile.profileUrl || '',
          profilePicUrl: profile.profilePicUrl || '',
          followers: 0
        },
        reason: "Impersonation",
        status: "takedown_complete"
      };

      console.log('📤 Sending report data:', reportData);

      const response = await fetch(`${BASE_URL}/api/takedown?user_id=${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Profile reported successfully:', result);
        setReportSuccess(true);

        // ✅ CALLBACK: Increment takedown requests count
        if (onTakedownRequest) {
          onTakedownRequest();
        }
        
        // Close modal after 2 seconds automatically
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to report profile');
      }
    } catch (error) {
      console.error('❌ Error reporting profile:', error);
      alert(error.message || 'Failed to report profile. Please try again.');
    } finally {
      setIsReporting(false);
    }
  };

  // Show success state
  if (reportSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md mx-4">
          <div className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Reported Successfully! ✅</h3>
            <p className="text-gray-300 text-lg mb-4">
              {platform.charAt(0).toUpperCase() + platform.slice(1)} profile has been reported successfully.
            </p>
            <p className="text-gray-400 text-sm">Redirecting...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-start bg-black/70 backdrop-blur-sm md:pl-16 md:pt-16">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-900 rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <div className="absolute inset-0 text-red-400 animate-ping opacity-75">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Reporting Instructions</h2>
              <p className="text-gray-400 text-sm">Follow these steps carefully</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors p-2 hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 pt-8">
          {/* Quick Action - Open Profile */}
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 font-medium text-sm">First, open the profile to report:</p>
                <p className="text-gray-400 text-xs mt-1">Click the button below to open the profile in a new window</p>
              </div>
              <button
                onClick={() => openProfileWindow(profile.profileUrl)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open Profile
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {instructions.steps.map((step, index) => {
              const colorClass = COLOR_CLASSES[step.color] || COLOR_CLASSES.blue;
              return (
                <div
                  key={step.number}
                  className={`flex items-start gap-4 p-4 bg-gradient-to-r ${colorClass.bg} border ${colorClass.border} rounded-xl hover:${colorClass.hover} transition-all duration-300 animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className={`w-8 h-8 bg-gradient-to-br ${colorClass.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                        {step.number}
                      </div>
                      <div className={`absolute inset-0 ${colorClass.ping} rounded-full animate-ping opacity-60`} 
                           style={{ animationDelay: `${index * 1000}ms` }}></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-100 font-medium mb-1">{step.title}</p>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                    
                    {/* ✅ ADDED: URL Button for Reporting Forms */}
                    {step.url && (
                      <button
                        onClick={() => openReportWindow(step.url)}
                        className="inline-flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors mt-2 text-sm cursor-pointer bg-green-500/10 hover:bg-green-500/20 px-3 py-1 rounded-lg border border-green-500/30"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>{step.urlText || "Open Reporting Form"}</span>
                      </button>
                    )}
                    
                    {step.important && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-purple-300">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <span>{step.important}</span>
                      </div>
                    )}
                  </div>
                  {step.icon && (
                    <div className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">{step.icon}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Final Step */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl hover:border-green-500/50 transition-all duration-300 animate-fade-in" 
                 style={{ animationDelay: `${instructions.steps.length * 100}ms` }}>
              <div className="flex-shrink-0">
                <div className="relative">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <div className="absolute inset-0 text-green-400 animate-ping opacity-60" 
                       style={{ animationDelay: `${instructions.steps.length * 1000}ms` }}></div>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-green-400 font-bold mb-1">{instructions.finalStep.title}</p>
                <p className="text-gray-300 text-sm">{instructions.finalStep.description}</p>
                {/* <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-300 text-xs font-medium">
                    💡 {instructions.finalStep.important}
                  </p>
                </div> */}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={handleContinue}
              disabled={isReporting || !profile}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isReporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Reporting...
                </>
              ) : (
                "I've Completed Reporting - Submit Takedown"
              )}
            </button>
            {!profile && (
              <p className="text-red-400 text-xs text-center mt-2">
                Error: Profile information is missing
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;