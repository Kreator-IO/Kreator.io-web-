import React, { createContext, useCallback, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import config from '../config';
import { auth } from '../firebase';

export const UserContext = createContext(null);

const API_BASE = config.apiUrl.replace(/\/$/, '');
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_ROLES_KEY = 'firebaseUserRoles';

const getStoredRoles = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_ROLES_KEY) || '{}');
  } catch {
    return {};
  }
};

const getStoredRole = (email, fallbackRole = 'Client') => {
  if (!email) return fallbackRole;
  return getStoredRoles()[email.toLowerCase()] || fallbackRole;
};

const storeRole = (email, role) => {
  if (!email || !role) return;
  const roles = getStoredRoles();
  roles[email.toLowerCase()] = role;
  localStorage.setItem(USER_ROLES_KEY, JSON.stringify(roles));
};

const unlockPortalAccess = (role) => {
  if (role === 'Team') {
    sessionStorage.setItem('portal-it-unlocked', 'unlocked');
    sessionStorage.setItem('portal-hr-unlocked', 'unlocked');
  }

  if (role === 'Manager') {
    sessionStorage.setItem('portal-manager-unlocked', 'unlocked');
  }
};

const mapFirebaseUser = (firebaseUser, fallbackRole = 'Client') => ({
  name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Firebase User',
  email: firebaseUser.email,
  role: getStoredRole(firebaseUser.email, fallbackRole),
});

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

  // Load persisted preferences on mount.
  useEffect(() => {
    const initAuth = async () => {
      const storedSettings = localStorage.getItem('settings');
      if (storedSettings) setSettings(JSON.parse(storedSettings));
      
      const storedShared = localStorage.getItem('sharedData');
      if (storedShared) setSharedData(JSON.parse(storedShared));
    };

    initAuth();
  }, []);

  // Keep the app session connected to Firebase Auth.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        clearAuth();
        setIsLoading(false);
        return;
      }

      const token = await firebaseUser.getIdToken();
      const userData = mapFirebaseUser(firebaseUser);

      setAccessToken(token);
      setUser(userData);
      unlockPortalAccess(userData.role);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [clearAuth]);

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

  const setFirebaseSession = async (firebaseUser, role = 'Client') => {
    storeRole(firebaseUser.email, role);
    unlockPortalAccess(role);

    const token = await firebaseUser.getIdToken();
    const userData = {
      name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Firebase User',
      email: firebaseUser.email,
      role,
    };

    setAccessToken(token);
    setUser(userData);

    return userData;
  };

  const login = async ({ email, password, role = 'Client' }) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return setFirebaseSession(result.user, role);
  };

  const register = async (form) => {
    const result = await createUserWithEmailAndPassword(auth, form.email, form.password);

    if (form.name) {
      await updateProfile(result.user, { displayName: form.name });
    }

    return setFirebaseSession(result.user, form.role || 'Client');
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      // The local session should still be cleared if Firebase sign-out is interrupted.
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
        setFirebaseSession,
        logout,
        authFetch,
        isLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
