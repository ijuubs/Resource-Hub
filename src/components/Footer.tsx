import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { subscribeNewsletter } from '../services/api';
import { Logo } from './Common/Logo';
import { Sparkles, Mail, CheckCircle, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    await subscribeNewsletter(email, 'footer');
    setSubscribed(true);
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 Brand */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="md" onClick={() => setActiveTab('home')} />
            <p className="text-xs text-zinc-400 leading-relaxed">
              The premier AI-powered platform for SaaS calculators, Notion operating systems, prompt formulas, and growth playbooks.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Free & Open Value First</span>
            </div>
          </div>

          {/* Col 2 Directory Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Directory</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('resources')} className="hover:text-white transition-colors">
                  AI Tools & Prompts
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('resources')} className="hover:text-white transition-colors">
                  SaaS MRR & Financial Calculators
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('resources')} className="hover:text-white transition-colors">
                  Notion Templates & Checklists
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('products')} className="hover:text-white transition-colors">
                  Digital Products Marketplace
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 Resources & Guides */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Growth Guides</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('articles')} className="hover:text-white transition-colors">
                  SaaS Churn Reduction Playbook
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('articles')} className="hover:text-white transition-colors">
                  B2B Cold Outreach Framework
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai-workspace')} className="hover:text-white transition-colors">
                  Gemini 3.6 AI Studio Generator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sitemap')} className="hover:text-white transition-colors">
                  Dynamic Sitemap & XML Inspector
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Weekly Dispatch</h4>
            <p className="text-xs text-zinc-400">Join 14,000+ operators receiving our weekly AI growth recipes.</p>

            {subscribed ? (
              <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400 border border-emerald-500/20 text-xs font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Subscribed successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow transition-all"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
          <div>© 2026 ResourceHub SaaS Platform. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('sitemap')} className="hover:text-zinc-300">
              Sitemap.xml
            </button>
            <button onClick={() => setActiveTab('admin')} className="hover:text-zinc-300">
              Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
