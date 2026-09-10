import { createContext } from 'react';
import type { User } from '../../lib/api';

export type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<User>;
  setAuthenticatedUser: (user: User) => void;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<User | null>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
