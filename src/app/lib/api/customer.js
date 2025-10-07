// lib/api/customer.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


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

/**
 * Get recent searches (if you have this endpoint)
 * @returns {Promise<Object>} API response with recent searches
 */
export async function getRecentSearches() {
  try {
    const response = await fetch(`${API_BASE_URL}/customer/recent-searches`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Recent searches data:', data);
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error fetching recent searches:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch recent searches',
    };
  }
}