import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { subscribeNewsletter } from '../services/api';
import { Logo } from './Common/Logo';
import { ContactModal } from './Common/ContactModal';
import { Sparkles, Mail, CheckCircle, ArrowRight, ShieldCheck, Info, Globe, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    await subscribeNewsletter(email, 'footer');
    setSubscribed(true);
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 text-xs pt-16 pb-24 sm:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 Brand & Value */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="md" onClick={() => setActiveTab('home')} />
            <p className="text-xs text-zinc-400 leading-relaxed">
              The premier open-access knowledge platform providing high-density SaaS calculators, Notion operating systems, prompt formulas, and verified growth playbooks.
            </p>
            <div className="flex flex-col gap-2 text-[11px] text-zinc-400 font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Free & No Account Required</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Ad-Supported & Editorial Integrity</span>
              </div>
            </div>
          </div>

          {/* Col 2 Interactive Directories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resource Directory</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('resources')} className="hover:text-white transition-colors text-left">
                  Interactive SaaS Calculators
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('resources')} className="hover:text-white transition-colors text-left">
                  AI Prompt Generators & Workflows
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('resources')} className="hover:text-white transition-colors text-left">
                  Notion Templates & Operating Systems
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('products')} className="hover:text-white transition-colors text-left">
                  Digital Toolkits & Curated Books
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai-workspace')} className="hover:text-white transition-colors text-left">
                  Gemini 3.6 AI Studio Generator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 Growth Guides & Transparency */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Guides & Transparency</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('articles')} className="hover:text-white transition-colors text-left">
                  SaaS Churn Reduction Playbook
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('articles')} className="hover:text-white transition-colors text-left">
                  Google AdSense Monetization Guide
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors text-left">
                  About Our Editorial Board
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('privacy')} className="hover:text-white transition-colors text-left">
                  Privacy Policy & Cookies
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('terms')} className="hover:text-white transition-colors text-left">
                  Terms of Service & Usage
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 Newsletter & Publisher Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Publisher Dispatch</h4>
            <p className="text-xs text-zinc-400">Receive weekly vetted SaaS calculators, growth strategies, and prompt engineering blueprints.</p>

            {subscribed ? (
              <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400 border border-emerald-500/20 text-xs font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
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

            <div className="pt-2">
              <button
                onClick={() => setContactOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 hover:text-white px-3.5 py-2 text-xs font-semibold text-zinc-300 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                <span>Contact Editorial & Support</span>
              </button>
            </div>
          </div>
        </div>

        {/* AdSense Publisher Policy & Monetization Disclosure Block */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 space-y-3 text-[11px] leading-relaxed text-zinc-400">
          <div className="flex items-center gap-2 font-semibold text-zinc-200">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>AdSense Publisher Policy & Transparency Disclosures</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong className="text-zinc-300">Advertising & AdSense Policy Notice:</strong> ResourceHub displays third-party advertisements served by Google AdSense and accredited advertising partners. These ads help maintain free, unrestricted access to all our interactive tools, calculators, and growth articles. Third-party vendors, including Google, use cookies to serve ads based on users' prior visits to our website or other websites.
            </p>
            <p>
              <strong className="text-zinc-300">Affiliate Disclosure & Independence:</strong> Some external links on ResourceHub are affiliate referral links. If you purchase products or services through these links, we may receive a referral commission at no additional cost to you. All featured software, tools, and platforms undergo rigorous independent evaluation by our editorial board.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono flex-wrap">
          <div>© 2026 ResourceHub Open SaaS Platform. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => setActiveTab('about')} className="hover:text-zinc-300">
              About Us
            </button>
            <button onClick={() => setActiveTab('privacy')} className="hover:text-zinc-300">
              Privacy Policy
            </button>
            <button onClick={() => setActiveTab('terms')} className="hover:text-zinc-300">
              Terms of Service
            </button>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300">
              Sitemap.xml
            </a>
            <button onClick={() => setContactOpen(true)} className="hover:text-zinc-300 text-indigo-400 font-bold">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </footer>
  );
};

