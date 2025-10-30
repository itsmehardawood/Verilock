// lib/api/customer.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetch Instagram profiles by name using the backend API
 * 
 * @param {string} searchName - The username or keyword to search.
 * @param {number} [limit=10] - Optional: number of profiles to fetch (default = 10).
 * @returns {Promise<Object[]>} - List of normalized Instagram profiles.
 */

export async function fetchFacebookProfiles(searchName, limit) {
  try {
    const params = new URLSearchParams({
      query: searchName,
      maxItems: limit,
      search_type: "user",
    });

    const response = await fetch(`${API_BASE_URL}/customer/facebook_search?${params}`, {
      method: "POST",
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log("✅ [fetchFacebookProfiles] Parsed response data:", result);
    
    // ✅ Return the data as-is without transformation
    return Array.isArray(result) ? result : [result];
    
  } catch (error) {
    console.error("❌ Error fetching Facebook profiles:", error);
    throw new Error(error.message || "Failed to fetch Facebook profiles");
  }
}


export async function fetchInstagramProfiles(searchName, limit) {
  try {
    const params = new URLSearchParams({
    search: searchName,
    search_limit: limit,
    search_type: "user",
  });

  const response = await fetch(`${API_BASE_URL}/customer/instagram_search?${params}`, {
    method: "POST",
  });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log("✅ [fetchInstagramProfiles] Parsed response data:", result);
    
    // ✅ CRITICAL FIX: Return the data as-is without transformation
    // Let the component handle the mapping since it has the correct field names
    return Array.isArray(result) ? result : [result];
    
  } catch (error) {
    console.error("❌ Error fetching Instagram profiles:", error);
    throw new Error(error.message || "Failed to fetch Instagram profiles");
  }
}

export async function fetchLinkedInProfiles(searchName, limit, location = "") {
  try {
    const params = new URLSearchParams({
      search_query: searchName,
      max_items: limit,
      profile_scraper_mode: "Short",
    });

    // ✅ PREPARE REQUEST BODY with location array
    const requestBody = {};
    
    if (location && location.trim() !== "") {
      requestBody.locations = [location.trim()];
    }

    console.log("📍 [fetchLinkedInProfiles] API Request:", {
      searchName,
      limit,
      location,
      params: Object.fromEntries(params),
      requestBody
    });

    const response = await fetch(`${API_BASE_URL}/customer/linkedin_search?${params}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: Object.keys(requestBody).length > 0 ? JSON.stringify(requestBody) : undefined,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log("✅ [fetchLinkedInProfiles] Parsed response data:", result);
    
    // Step 2: If profiles exist, fetch their profile pictures
    if (result?.profiles?.length) {
      const enrichedProfiles = await Promise.all(
        result.profiles.map(async (profile) => {
          try {
            // Call Next.js route that extracts profile image
            const imageResponse = await fetch('/api/fetchProfileImage', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ url: profile.url }),
            });

            const imageresult = await imageResponse.json();
            return {
              ...profile,
              profile_image: imageresult?.imageUrl || null,
            };
          } catch (error) {
            console.error(`Error fetching image for ${profile.url}:`, error);
            return { ...profile, profile_image: null };
          }
        })
      );

      result.profiles = enrichedProfiles;
    }

    // ✅ Return the result as-is without transformation
    return Array.isArray(result) ? result : [result];
    
  } catch (error) {
    console.error("❌ Error fetching LinkedIn profiles:", error);
    throw new Error(error.message || "Failed to fetch LinkedIn profiles");
  }
}

// app/lib/api/customer.js (or wherever your fetchLinkedInProfiles is)
// export async function fetchLinkedInProfiles(searchName, limit) {
//   try {
//     const params = new URLSearchParams({
//       search_query: searchName,
//       max_items: limit,
//       profile_scraper_mode: "Short",
//     });

//     const response = await fetch(`${API_BASE_URL}/customer/linkedin_search?${params}`, {
//       method: "POST",
//     });
    
//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//     }
    
//     const result = await response.json();
//     console.log("✅ [fetchLinkedInProfiles] Raw API response:", result);
    
//     // Extract profiles array from response
//     const profilesArray = Array.isArray(result) ? result : 
//                          (result.results || result.data || [result]);
    
//     console.log("📊 Profiles found:", profilesArray.length);
    
//     // Fetch profile images for each profile
//     const profilesWithImages = await Promise.all(
//       profilesArray.map(async (profile, index) => {
//         try {
//           let profileImageUrl = null;
          
//           // Only fetch image if profile URL exists
//           if (profile.profileUrl || profile.url || profile.publicIdentifier) {
//             try {
//               const imageResponse = await fetch('/api/fetchProfileImage', {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ 
//                   url: profile.profileUrl || profile.url || `https://www.linkedin.com/in/${profile.publicIdentifier}` 
//                 }),
//               });
              
//               if (imageResponse.ok) {
//                 const imageData = await imageResponse.json();
//                 if (imageData.success && imageData.imageUrl) {
//                   profileImageUrl = imageData.imageUrl;
//                   console.log(`✅ Fetched image for profile ${index}:`, profileImageUrl);
//                 }
//               }
//             } catch (imageError) {
//               console.warn(`⚠️ Could not fetch image for profile ${index}:`, imageError.message);
//             }
//           }
          
//           // Transform profile data with consistent field names
//           return {
//             id: profile.id || profile.publicIdentifier || `linkedin-${index}`,
//             username: profile.publicIdentifier || profile.username || `user-${index}`,
//             fullName: profile.fullName || profile.name || profile.title || "Unknown Name",
//             profilePicUrl: profileImageUrl || profile.profilePicture || profile.imageUrl || "/images/linkedin.png",
//             profileUrl: profile.profileUrl || profile.url || `https://www.linkedin.com/in/${profile.publicIdentifier}`,
//             // LinkedIn specific fields
//             headline: profile.headline || profile.description || profile.subtitle,
//             location: profile.location || profile.geoLocationName,
//             connections: profile.connections || profile.followerCount,
//             currentPosition: profile.currentPosition || profile.occupation,
//             company: profile.company || profile.companyName,
//             industry: profile.industry,
//             about: profile.about || profile.summary,
//             // Social metrics
//             followers: profile.followers || profile.followerCount || 0,
//             following: profile.following || 0,
//             postsCount: profile.postsCount || 0,
//             // Platform identification
//             platform: "linkedin",
//             verified: profile.verified || false,
//             private: profile.private || false,
//           };
          
//         } catch (profileError) {
//           console.error(`❌ Error processing profile ${index}:`, profileError);
//           // Return a basic profile even if image fetch fails
//           return {
//             id: profile.id || `linkedin-error-${index}`,
//             username: "error",
//             fullName: "Error Loading Profile",
//             profilePicUrl: "/images/linkedin.png",
//             profileUrl: "#",
//             platform: "linkedin",
//             followers: 0,
//             following: 0,
//             postsCount: 0,
//           };
//         }
//       })
//     );
    
//     console.log("🎉 Final profiles with images:", profilesWithImages);
//     return profilesWithImages;
    
//   } catch (error) {
//     console.error("❌ Error fetching LinkedIn profiles:", error);
//     throw new Error(error.message || "Failed to fetch LinkedIn profiles");
//   }
// }

export async function fetchTwitterProfiles(searchName, limit) {
  try {
    const params = new URLSearchParams({
      query: searchName,
      max_results: limit,
      search_type: "People",
    });

    const response = await fetch(`${API_BASE_URL}/customer/twitter_search?${params}`, {
      method: "POST",
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log("✅ [fetchTwitterProfiles] Parsed response data:", result);
    
    // ✅ Return the data as-is without transformation
    // Let the component handle the mapping since it has the correct field names
    return Array.isArray(result) ? result : [result];
    
  } catch (error) {
    console.error("❌ Error fetching Twitter profiles:", error);
    throw new Error(error.message || "Failed to fetch Twitter profiles");
  }
}

export async function fetchTikTokProfiles(searchName, limit) {
  try {
    const params = new URLSearchParams({
      query: searchName,
      max_results: limit,
    });

    const response = await fetch(`${API_BASE_URL}/customer/tiktok_search?${params}`, {
      method: "POST",
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log("✅ [fetchTikTokProfiles] Parsed response data:", result);
    
    // ✅ Return the data as-is without transformation
    return Array.isArray(result) ? result : [result];
    
  } catch (error) {
    console.error("❌ Error fetching TikTok profiles:", error);
    throw new Error(error.message || "Failed to fetch TikTok profiles");
  }
}


// *****Comprehensive function to search profiles across multiple platforms

export async function searchProfiles({ name, platforms }) {
  try {
    const response = await fetch(`${API_BASE_URL}/customer/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        platforms,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();    

    // Step 2: If profiles exist, fetch their profile pictures
//     if (data?.profiles?.length) {
//       const enrichedProfiles = await Promise.all(
//         data.profiles.map(async (profile) => {
//           try {
//             // Call Next.js route that extracts profile image
//             const imageResponse = await fetch('/api/fetchProfileImage', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ url: profile.url }),
//             });

//             const imageData = await imageResponse.json();
//             return {
//               ...profile,
//               profile_image: imageData?.imageUrl || null,
//             };
//           } catch (error) {
//             console.error(`Error fetching image for ${profile.url}:`, error);
//             return { ...profile, profile_image: null };
//           }
//         })
//       );

//       data.profiles = enrichedProfiles;
//     }

//     // Step 3: Return enriched data
//     return {
//       success: true,
//       data,
//     };
//   } catch (error) {
//     console.error('Error searching profiles:', error);
//     return {
//       success: false,
//       error: error.message || 'Failed to search profiles',
//     };
//   }
// }
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error searching profiles:', error);
    return {
      success: false,
      error: error.message || 'Failed to search profiles',
    };
  }
}


