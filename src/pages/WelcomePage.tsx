import { LogOut, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';

export function WelcomePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    try { await signOut(); } finally { navigate('/login', { replace: true }); }
  }

  return (
    <main className="welcome-shell">
      <nav className="topbar" aria-label="Main navigation">
        <div className="wordmark"><span className="wordmark-dot" />auth<span className="wordmark-muted">/space</span></div>
        <button className="icon-button" onClick={handleSignOut} title="Sign out" aria-label="Sign out"><LogOut size={18} /></button>
      </nav>
      <section className="welcome-content">
        <div className="welcome-label"><Sparkles size={16} /> Your space is ready</div>
        <h1>Hello, {user?.fullName || user?.username}.</h1>
        <p className="welcome-copy">You are signed in securely. This is the beginning of your private workspace.</p>
        <div className="welcome-meta">
          <span>Signed in as</span>
          <strong>@{user?.username}</strong>
        </div>
      </section>
    </main>
  );
}
