import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, Shield, Check } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent_accepted');
    if (!consent) {
      // Show after slight delay
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent_accepted', 'true');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-[80px] left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[60] rounded-2xl border border-zinc-700 bg-zinc-950/95 backdrop-blur-xl p-5 shadow-2xl shadow-black/90 text-xs space-y-3"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-400 border border-indigo-500/20 shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <span>Cookie & Ad Preferences</span>
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
              </h4>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                We use cookies and Google AdSense vendor tags to personalize content, analyze traffic, and ensure optimal platform speed.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow transition-all active:scale-95"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Accept & Continue</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
