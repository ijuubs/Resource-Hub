import React, { useState } from 'react';
import { subscribeNewsletter } from '../../services/api';
import { Mail, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export const NewsletterCTA: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    await subscribeNewsletter(email, 'inline-cta');
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/60 via-zinc-900 to-zinc-950 p-8 sm:p-10 shadow-2xl ${className}`}
    >
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Weekly Growth Toolkit Dispatch</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Get 50+ Premium AI Tools & SaaS Calculators Delivered Weekly
        </h3>

        <p className="text-sm text-zinc-300 leading-relaxed">
          Join 14,000+ founders, operators, and creators who receive our weekly teardowns, updated prompt formulas, and downloadable Notion frameworks every Tuesday.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 p-4 text-emerald-400 border border-emerald-500/20 text-sm font-medium">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>You're in! Check your inbox for your welcome starter kit.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <div className="relative w-full">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="email"
                required
                placeholder="Enter your work email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950/80 pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:from-indigo-500 hover:to-violet-500 active:scale-95 disabled:opacity-50 whitespace-nowrap"
            >
              <span>{loading ? 'Joining...' : 'Subscribe Free'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-zinc-500">Zero spam. Unsubscribe anytime in 1 click.</p>
      </div>
    </div>
  );
};
