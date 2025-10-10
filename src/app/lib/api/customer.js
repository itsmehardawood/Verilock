// lib/api/customer.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetch Instagram profiles by name using the backend API
 * 
 * @param {string} searchName - The username or keyword to search.
 * @param {number} [limit=10] - Optional: number of profiles to fetch (default = 10).
 * @returns {Promise<Object[]>} - List of normalized Instagram profiles.
 */
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

export async function fetchLinkedInProfiles(searchName, limit) {
  try {
    const params = new URLSearchParams({
      search_query: searchName,
      max_items: limit,
      profile_scraper_mode: "Short",
    });

    const response = await fetch(`${API_BASE_URL}/customer/linkedin_search?${params}`, {
      method: "POST",
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log("✅ [fetchLinkedInProfiles] Parsed response data:", result);
    
    // ✅ Return the data as-is without transformation
    return Array.isArray(result) ? result : [result];
    
  } catch (error) {
    console.error("❌ Error fetching LinkedIn profiles:", error);
    throw new Error(error.message || "Failed to fetch LinkedIn profiles");
  }
}


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


