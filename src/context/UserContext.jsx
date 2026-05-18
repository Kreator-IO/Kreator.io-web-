import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // Basic user session info (null means not authenticated)
  const [user, setUser] = useState(null);
  // Global app settings (e.g., theme, language)
  const [settings, setSettings] = useState({ theme: 'dark', language: 'en' });
  // Generic shared data store for cross‑portal communication
  const [sharedData, setSharedData] = useState({});

  // Load persisted data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    const storedSettings = localStorage.getItem('settings');
    if (storedSettings) setSettings(JSON.parse(storedSettings));
    const storedShared = localStorage.getItem('sharedData');
    if (storedShared) setSharedData(JSON.parse(storedShared));
  }, []);

  // Persist changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
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

  return (
    <UserContext.Provider
      value={{ user, settings, sharedData, updateUser, updateSettings, updateSharedData }}
    >
      {children}
    </UserContext.Provider>
  );
};
