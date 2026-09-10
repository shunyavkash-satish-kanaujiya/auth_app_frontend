import { useState } from 'react';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { FormField } from '../components/FormField';
import { ApiError, authApi } from '../lib/api';
import { useAuth } from '../features/auth/useAuth';

export function RegisterPage() {
  const { setAuthenticatedUser } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const result = await authApi.register({ fullName, username, password });
      setAuthenticatedUser(result.user);
      navigate('/welcome', { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to create your account right now.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout eyebrow="Create your account" title="Start with a clean slate." description="Set up your account and go straight to your welcome space.">
      {error && <div className="notice error" role="alert">{error}</div>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <FormField label="Full name" id="fullName" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" required />
        <FormField label="Username" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" minLength={3} required />
        <FormField label="Password" id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" minLength={8} required />
        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <LoaderCircle className="spin" size={18} /> : <>Create account <ArrowRight size={18} /></>}
        </button>
      </form>
      <p className="form-footer">Already registered? <Link to="/login">Sign in</Link></p>
    </AuthLayout>
  );
}
