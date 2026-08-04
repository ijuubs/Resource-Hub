import React from 'react';
import { motion } from 'motion/react';
import { Scale, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TermsOfService: React.FC = () => {
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
          <Scale className="w-4 h-4 text-indigo-400" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl mx-auto">
          Effective date: August 3, 2026. Please read these Terms of Service carefully before accessing or using ResourceHub services.
        </p>
      </div>

      <div className="space-y-8 text-sm text-zinc-300 leading-relaxed bg-zinc-900/60 p-6 sm:p-10 rounded-2xl border border-zinc-800">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-400" />
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using ResourceHub, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to all terms, you must discontinue using our services immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-400" />
            2. Intellectual Property & License
          </h2>
          <p>
            All content, interactive financial calculators, Notion operating templates, AI prompt formulas, software code, and educational playbooks published on ResourceHub are owned by or licensed to ResourceHub.
          </p>
          <ul className="list-disc pl-6 space-y-1 text-zinc-400">
            <li><strong>Personal & Commercial Use:</strong> Free tools and downloadable resources are provided under an open-value license for internal business use.</li>
            <li><strong>Restrictions:</strong> You may not scrape, republish, resell, or duplicate our raw database assets without prior written consent.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-indigo-400" />
            3. Disclaimer of Financial & Legal Advice
          </h2>
          <p>
            The interactive SaaS calculators, financial MRR forecasters, and unit economics tools provided on this website are for informational and estimation purposes only. They do not constitute certified accounting, financial, or legal advice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            4. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, ResourceHub shall not be liable for any indirect, incidental, or consequential damages resulting from your reliance on tools or information published on the site.
          </p>
        </section>
      </div>

      <div className="flex justify-between items-center text-xs text-zinc-400 pt-4">
        <button onClick={() => setActiveTab('privacy')} className="text-indigo-400 hover:underline">
          ← Privacy Policy
        </button>
        <button onClick={() => setActiveTab('about')} className="text-indigo-400 hover:underline">
          About ResourceHub →
        </button>
      </div>
    </motion.div>
  );
};
