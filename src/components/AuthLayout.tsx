import type { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';

export function AuthLayout({ children, eyebrow, title, description }: {
  children: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <main className="auth-shell">
      <section className="auth-panel" aria-labelledby="auth-title">
        <div className="brand-mark"><ShieldCheck size={20} strokeWidth={2.3} /></div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="auth-title">{title}</h1>
        <p className="auth-description">{description}</p>
        {children}
      </section>
      <aside className="auth-aside" aria-label="Security note">
        <div className="aside-rule" />
        <p className="aside-kicker">Private by design</p>
        <p className="aside-copy">Your session stays protected in the browser while you move through your workspace.</p>
      </aside>
    </main>
  );
}
