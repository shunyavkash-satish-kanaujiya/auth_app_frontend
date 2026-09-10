import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { authApi, type User } from '../../lib/api';
import { AuthContext, type AuthContextValue } from './auth-context';

export function AuthProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const result = await authApi.dashboard();
      const currentUser = { fullName: result.fullName, username: result.username };
      setUser(currentUser);
      return currentUser;
    } catch {
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    const isProtectedRoute = location.pathname.startsWith('/welcome');
    if (!isProtectedRoute || user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    void refreshUser().finally(() => setIsLoading(false));
  }, [location.pathname, user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      signIn: async (username, password) => {
        const result = await authApi.login({ username, password });
        setUser(result.user);
        return result.user;
      },
      setAuthenticatedUser: (authenticatedUser) => setUser(authenticatedUser),
      signOut: async () => {
        await authApi.logout();
        setUser(null);
      },
      refreshUser,
    }),
    [isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
