import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { authApi, type User } from '../../lib/api';
import { AuthContext, type AuthContextValue } from './auth-context';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const result = await authApi.me();
      setUser(result.user);
      return result.user;
    } catch {
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    void refreshUser().finally(() => setIsLoading(false));
  }, []);

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
