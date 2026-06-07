import React, { createContext, useCallback, useState, useEffect } from 'react';

export const UserContext = createContext(null);

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
const REFRESH_TOKEN_KEY = 'refreshToken';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [settings, setSettings] = useState({ theme: 'dark', language: 'en' });
  const [sharedData, setSharedData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const persistAuth = useCallback((data) => {
    localStorage.removeItem('token');
    if (data.accessToken || data.token) {
      setAccessToken(data.accessToken || data.token);
    }
    if (data.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    }
    if (data.user) {
      setUser(data.user);
    }
  }, []);

  const clearAuth = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const buildAuthHeaders = useCallback((token, options = {}) => {
    const headers = new Headers(options.headers || {});
    if (token) headers.set('Authorization', `Bearer ${token}`);
    if (!headers.has('Content-Type') && options.body) headers.set('Content-Type', 'application/json');
    return headers;
  }, []);

  const refreshSession = useCallback(async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) return null;

    try {
      const response = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ refreshToken }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        clearAuth();
        return null;
      }

      persistAuth(data);
      return data.accessToken || data.token || null;
    } catch (error) {
      console.error("Session refresh failed", error);
      clearAuth();
      return null;
    }
  }, [clearAuth, persistAuth]);

  const authFetch = useCallback(async (path, options = {}) => {
    const makeRequest = (token) => fetch(`${API_BASE}${path}`, {
      ...options,
      credentials: 'include',
      headers: buildAuthHeaders(token, options),
    });

    const response = await makeRequest(accessToken);
    if (response.status !== 401) return response;

    const nextAccessToken = await refreshSession();
    if (!nextAccessToken) return response;

    return makeRequest(nextAccessToken);
  }, [accessToken, buildAuthHeaders, refreshSession]);

  // Load persisted data on mount and verify token
  useEffect(() => {
    const initAuth = async () => {
      const storedSettings = localStorage.getItem('settings');
      if (storedSettings) setSettings(JSON.parse(storedSettings));
      
      const storedShared = localStorage.getItem('sharedData');
      if (storedShared) setSharedData(JSON.parse(storedShared));

      const legacyToken = localStorage.getItem('token');
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

      if (legacyToken) {
        try {
          const response = await fetch(`${API_BASE}/auth/verify-token`, {
            headers: {
              Authorization: `Bearer ${legacyToken}`
            },
            credentials: 'include',
          });
          
          const data = await response.json();
          if (response.ok && data.user) {
            persistAuth({ accessToken: legacyToken, user: data.user });
          } else {
            clearAuth();
          }
        } catch (error) {
          console.error("Token verification failed", error);
          clearAuth();
        }
      } else if (refreshToken) {
        await refreshSession();
      } else {
        clearAuth();
      }
      setIsLoading(false);
    };

    initAuth();
  }, [clearAuth, refreshSession]);

  // Persist changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('sharedData', JSON.stringify(sharedData));
  }, [sharedData]);

  const updateUser = (newUser) => setUser(newUser);
  const updateSettings = (newSettings) => setSettings(newSettings);
  const updateSharedData = (newData) => setSharedData(prev => ({ ...prev, ...newData }));

  const login = async ({ email, password }) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Invalid email or password.');
    persistAuth(data);
    return data.user;
  };

  const register = async (form) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (!response.ok) {
      const message = data.error || data.errors?.join(', ') || 'Registration failed';
      throw new Error(message);
    }
    persistAuth(data);
    return data.user;
  };

  const logout = async () => {
    try {
      await authFetch('/auth/logout', { method: 'POST' });
    } catch {
      // The local session should still be cleared if the network is unavailable.
    }
    clearAuth();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        accessToken,
        settings,
        sharedData,
        updateUser,
        updateSettings,
        updateSharedData,
        login,
        register,
        logout,
        authFetch,
        isLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
