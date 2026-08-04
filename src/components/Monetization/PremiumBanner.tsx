import React from 'react';
import { Lock, Crown, Sparkles, ArrowRight } from 'lucide-react';

interface PremiumBannerProps {
  title?: string;
  description?: string;
  onUpgrade?: () => void;
  className?: string;
}

export const PremiumBanner: React.FC<PremiumBannerProps> = ({
  title = 'Unlock Premium Unlimited AI Access',
  description = 'Get full access to all 50+ downloadable spreadsheets, unlimited Gemini 3.6 Flash generation, and exportable financial models.',
  onUpgrade,
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-zinc-900 to-amber-950/20 p-6 shadow-xl ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400 border border-amber-500/20 shrink-0">
            <Crown className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wider text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                PRO Membership
              </span>
            </div>
            <h4 className="text-base font-bold text-white">{title}</h4>
            <p className="text-xs text-zinc-300">{description}</p>
          </div>
        </div>

        <button
          onClick={onUpgrade}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2.5 text-xs font-bold text-zinc-950 shadow-lg shadow-amber-500/20 transition-all active:scale-95 shrink-0"
        >
          <Sparkles className="w-4 h-4 fill-zinc-950" />
          <span>Upgrade to PRO ($19/mo)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
