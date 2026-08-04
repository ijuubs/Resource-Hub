import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Users, Award, ShieldCheck, Mail, Globe, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutUs: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-8 pb-16"
    >
      {/* Header */}
      <div className="space-y-3 text-center border-b border-zinc-800 pb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Our Platform & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About ResourceHub
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl mx-auto">
          Empowering founders, operators, and developers with open-access AI tools, financial calculators, Notion operating systems, and SaaS growth teardowns.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Open Value First</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            We believe value should be accessible before asking for anything. 100% of our financial calculators and prompt generators remain free to use without gated paywalls.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Vetted Quality</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Every prompt formula and unit economics model is engineered and tested against real-world SaaS operational metrics before release.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Community Driven</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Serving over 14,000+ active founders, bootstrappers, and digital product creators worldwide across tech hubs.
          </p>
        </div>
      </div>

      {/* Platform Editorial Standards */}
      <div className="space-y-6 bg-zinc-900/60 p-6 sm:p-10 rounded-2xl border border-zinc-800 text-sm text-zinc-300 leading-relaxed">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-400" />
          Editorial & Compliance Standards
        </h2>
        <p>
          ResourceHub maintains high editorial standards to ensure all guides, teardowns, and financial algorithms deliver accurate data. We adhere strictly to Google Webmaster guidelines, Google AdSense Quality Policies, and data privacy regulations.
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Regularly audited formula logic for MRR, Churn, and CAC metrics.</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Strict privacy controls & clear disclosure of advertising vendors.</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Clean, responsive accessibility across desktop and mobile devices.</span>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-white">Have feedback or suggestions?</h3>
          <p className="text-xs text-zinc-400">Contact our editorial team or propose new interactive tool ideas.</p>
        </div>
        <a
          href="mailto:support@resourcehub.dev"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow transition-all shrink-0"
        >
          <Mail className="w-4 h-4" />
          <span>Contact Team</span>
        </a>
      </div>

      <div className="flex justify-between items-center text-xs text-zinc-400 pt-4">
        <button onClick={() => setActiveTab('privacy')} className="text-indigo-400 hover:underline">
          Privacy Policy
        </button>
        <button onClick={() => setActiveTab('terms')} className="text-indigo-400 hover:underline">
          Terms of Service
        </button>
      </div>
    </motion.div>
  );
};
