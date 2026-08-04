import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Eye, FileText, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PrivacyPolicy: React.FC = () => {
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
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>Legal & Data Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl mx-auto">
          Last updated: August 3, 2026. Learn how ResourceHub collects, uses, and protects your personal information and respects your privacy rights under GDPR and CCPA.
        </p>
      </div>

      <div className="space-y-8 text-sm text-zinc-300 leading-relaxed bg-zinc-900/60 p-6 sm:p-10 rounded-2xl border border-zinc-800">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-400" />
            1. Information We Collect
          </h2>
          <p>
            ResourceHub ("we", "our", or "us") operates the website located at{' '}
            <code className="text-indigo-300">https://resource-hub-blond.vercel.app/</code>. We collect minimal information required to deliver high-quality interactive SaaS tools, calculators, and educational guides.
          </p>
          <ul className="list-disc pl-6 space-y-1 text-zinc-400">
            <li><strong>Personal Information:</strong> Email address provided voluntarily when subscribing to our newsletter or creating an account.</li>
            <li><strong>Usage Data:</strong> Device details, browser type, IP address, page views, and interactive calculator usage stats aggregated via analytics.</li>
            <li><strong>Local Cookies & Storage:</strong> Saved bookmarks, user preferences, and theme choices saved locally in your browser.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-400" />
            2. Google AdSense & Third-Party Advertising
          </h2>
          <p>
            We use <strong>Google AdSense</strong> to serve advertising banners and monetization tags on our platform.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-400">
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites.
            </li>
            <li>
              Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 underline hover:text-indigo-300"
              >
                Google Ads Settings
              </a>
              . Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 underline hover:text-indigo-300"
              >
                aboutads.info
              </a>
              .
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            3. How We Use Your Data
          </h2>
          <p>We strictly utilize collected data to:</p>
          <ul className="list-disc pl-6 space-y-1 text-zinc-400">
            <li>Deliver interactive financial models, AI prompt outputs, and downloadable templates.</li>
            <li>Improve website speed, responsive UI design, and platform performance.</li>
            <li>Send periodic newsletter updates containing tech recipes and growth playbooks (opt-out anytime).</li>
            <li>Prevent fraud, spam, or malicious software activities.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-400" />
            4. Contact & Data Access Requests
          </h2>
          <p>
            If you have any questions regarding this Privacy Policy or wish to request data deletion under GDPR / CCPA, please contact our privacy compliance office at:
          </p>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-mono">
            Email: support@resourcehub.dev | kavi.kavinay@gmail.com<br />
            Address: ResourceHub Operations, Tech Park Tower, Suite 400
          </div>
        </section>
      </div>

      <div className="flex justify-between items-center text-xs text-zinc-400 pt-4">
        <button onClick={() => setActiveTab('terms')} className="text-indigo-400 hover:underline">
          Read Terms of Service →
        </button>
        <button onClick={() => setActiveTab('home')} className="hover:text-white">
          Return to Home
        </button>
      </div>
    </motion.div>
  );
};
