import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';
import { CURRENCIES, getSelectedCurrency, setSelectedCurrency } from '../utils/currency';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [currency, setCurrencyState] = useState(getSelectedCurrency());
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('mkv-sidebar-collapsed') === 'true';
  });
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('mkv-theme') || 'dark';
  });
  const [accent, setAccentState] = useState(() => {
    return localStorage.getItem('mkv-accent') || 'olive';
  });

  const fetchUser = useCallback(async () => {
    try {
      const data = await api.get('/auth/web/me');
      setUser(data);
    } catch (e) {
      console.warn('Could not fetch user, using default profile');
      setUser({
        id: 9269,
        full_name: 'Михайло Шевченко',
        position: 'Власник',
        role_name: 'Власник',
        permissions: ['*'],
        is_previewing: false
      });
    }
  }, []);

  const fetchUsersAndRoles = useCallback(async () => {
    try {
      const [usersData, rolesData] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/roles')
      ]);
      setAllUsers(usersData || []);
      setAllRoles(rolesData || []);
    } catch (e) {
      console.warn('Could not fetch users and roles list', e);
    }
  }, []);

  useEffect(() => {
    fetchUser();
    fetchUsersAndRoles();
    const handleCurrencyChange = (e) => setCurrencyState(e.detail);
    window.addEventListener('mkv-currency-change', handleCurrencyChange);
    return () => window.removeEventListener('mkv-currency-change', handleCurrencyChange);
  }, [fetchUser, fetchUsersAndRoles]);

  const switchUser = async (userId) => {
    try {
      const res = await api.post('/auth/web/switch-user', { user_id: userId });
      if (res?.user) {
        setUser(res.user);
        window.dispatchEvent(new CustomEvent('mkv-user-switched', { detail: res.user }));
        return res.user;
      }
    } catch (err) {
      console.error('Failed to switch user account:', err);
    }
  };

  const switchRole = async (roleName) => {
    try {
      const res = await api.post('/auth/web/switch-user', { role_name: roleName });
      if (res?.user) {
        setUser(res.user);
        window.dispatchEvent(new CustomEvent('mkv-user-switched', { detail: res.user }));
        return res.user;
      }
    } catch (err) {
      console.error('Failed to switch role:', err);
    }
  };

  const resetToOwner = async () => {
    try {
      const res = await api.post('/auth/web/reset-user', {});
      if (res?.user) {
        setUser(res.user);
        window.dispatchEvent(new CustomEvent('mkv-user-switched', { detail: res.user }));
        return res.user;
      }
    } catch (err) {
      console.error('Failed to reset to owner:', err);
    }
  };

  const changeCurrency = (currCode) => {
    setSelectedCurrency(currCode);
    setCurrencyState(currCode);
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemeState(next);
    localStorage.setItem('mkv-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const changeAccent = (newAccent) => {
    setAccentState(newAccent);
    localStorage.setItem('mkv-accent', newAccent);
    document.documentElement.setAttribute('data-accent', newAccent);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('mkv-sidebar-collapsed', String(next));
      return next;
    });
  };

  const isImpersonating = Boolean(user && user.position !== 'Власник');

  return (
    <AppContext.Provider value={{
      user,
      allUsers,
      allRoles,
      switchUser,
      switchRole,
      resetToOwner,
      isImpersonating,
      currency,
      changeCurrency,
      theme,
      toggleTheme,
      accent,
      changeAccent,
      sidebarCollapsed,
      toggleSidebar,
      isNewOrderModalOpen,
      setIsNewOrderModalOpen,
      refreshUser: fetchUser
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
