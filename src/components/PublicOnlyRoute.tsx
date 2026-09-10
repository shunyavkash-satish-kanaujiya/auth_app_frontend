import { Navigate, Outlet } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { useAuth } from '../features/auth/useAuth';

export function PublicOnlyRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <main className="loading-screen" aria-label="Loading"><LoaderCircle className="spin" size={28} /></main>;
  }
  return user ? <Navigate to="/welcome" replace /> : <Outlet />;
}
