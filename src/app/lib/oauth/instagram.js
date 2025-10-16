// app/lib/oauth/instagram.js
export class InstagramOAuth {
  static getAuthUrl() {
    const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
    const redirectUri = `${window.location.origin}/api/instagram/callback`;
    const scope = 'user_profile,user_media';
    const state = this.generateState();
    
    // Store state for security validation
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('instagram_oauth_state', state);
    }
    
    return `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code&state=${state}`;
  }

  static generateState() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  static validateState(state) {
    if (typeof window !== 'undefined') {
      const storedState = sessionStorage.getItem('instagram_oauth_state');
      sessionStorage.removeItem('instagram_oauth_state');
      return state === storedState;
    }
    return false;
  }

  static async exchangeCodeForToken(code) {
    try {
      const response = await fetch('/api/instagram/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to exchange code for token');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Token exchange error:', error);
      throw error;
    }
  }

  static getStoredToken() {
    if (typeof window !== 'undefined') {
      try {
        const tokenData = localStorage.getItem('instagram_token');
        return tokenData ? JSON.parse(tokenData) : null;
      } catch (error) {
        this.removeToken();
        return null;
      }
    }
    return null;
  }

  static storeToken(tokenData) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('instagram_token', JSON.stringify({
        ...tokenData,
        timestamp: Date.now()
      }));
    }
  }

  static removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('instagram_token');
      sessionStorage.removeItem('instagram_oauth_state');
    }
  }

  static isTokenExpired(tokenData) {
    if (!tokenData?.timestamp || !tokenData?.expires_in) return true;
    const elapsed = Date.now() - tokenData.timestamp;
    return elapsed > (tokenData.expires_in * 1000);
  }

  static async refreshToken() {
    const tokenData = this.getStoredToken();
    if (!tokenData?.refresh_token) {
      this.removeToken();
      return null;
    }

    try {
      const response = await fetch('/api/instagram/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: tokenData.refresh_token }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const newTokenData = await response.json();
      this.storeToken(newTokenData);
      return newTokenData;
    } catch (error) {
      this.removeToken();
      throw error;
    }
  }
}