// ─── AuthContext ──────────────────────────────────────────────────────────────
// Strongly-typed auth context with login, logout, and isAuthenticated.

import React, { createContext, useState, useEffect, useContext } from 'react';
import { getData, saveData, removeData } from '../utils/storage';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AuthUser = {
  name: string;
  email?: string;
};

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData?: Partial<AuthUser>) => Promise<void>;
  logout: () => Promise<void>;
}

// ─── Context & Hook ───────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on app launch
  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();

    const loadUser = async () => {
      try {
        const storedUser = await getData('user');

        // Enforce a minimum splash duration of 2 seconds
        const elapsed = Date.now() - startTime;
        const delay = Math.max(2000 - elapsed, 0);

        setTimeout(() => {
          if (isMounted) {
            if (storedUser) {
              setUser(storedUser);
            }
            setIsLoading(false);
          }
        }, delay);
      } catch (e) {
        console.error('Failed to load user:', e);
        if (isMounted) setIsLoading(false);
      }
    };

    loadUser();

    // Hard fallback: never hang on loading
    const fallback = setTimeout(() => {
      if (isMounted) setIsLoading(false);
    }, 2500);

    return () => {
      isMounted = false;
      clearTimeout(fallback);
    };
  }, []);

  // ── login ──────────────────────────────────────────────────────────────────
  const login = async (userData?: Partial<AuthUser>) => {
    const newUser: AuthUser = {
      name: userData?.name || 'Fashion User',
      email: userData?.email || '',
    };
    setUser(newUser);
    await saveData('user', newUser);
  };

  // ── logout ─────────────────────────────────────────────────────────────────
  const logout = async () => {
    await removeData('user');  // clear storage first
    setUser(null);             // then update state → triggers RootNavigator switch
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};