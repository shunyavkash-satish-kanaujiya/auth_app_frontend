import { useState } from 'react';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { FormField } from '../components/FormField';
import { ApiError } from '../lib/api';
import { useAuth } from '../features/auth/useAuth';

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await signIn(username, password);
      navigate('/welcome', { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to sign in right now.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout eyebrow="Secure access" title="Welcome back." description="Sign in to continue to your private workspace.">
      {error && <div className="notice error" role="alert">{error}</div>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <FormField label="Username" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />
        <FormField label="Password" id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <LoaderCircle className="spin" size={18} /> : <>Sign in <ArrowRight size={18} /></>}
        </button>
      </form>
      <p className="form-footer">New here? <Link to="/register">Create an account</Link></p>
    </AuthLayout>
  );
}
