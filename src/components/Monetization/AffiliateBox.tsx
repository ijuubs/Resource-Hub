import React from 'react';
import { AffiliateLink } from '../../types';
import { useApp } from '../../context/AppContext';
import { ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AffiliateBoxProps {
  affiliate: AffiliateLink;
  className?: string;
}

export const AffiliateBox: React.FC<AffiliateBoxProps> = ({ affiliate, className = '' }) => {
  const { settings, incrementAffiliateClick } = useApp();

  if (!settings.monetization.enableAffiliates) {
    return null;
  }

  const handleClick = () => {
    incrementAffiliateClick(affiliate.id);
    window.open(affiliate.targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/30 via-zinc-900 to-zinc-950 p-5 shadow-lg transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/10 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {affiliate.badgeText && (
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-medium text-indigo-400 border border-indigo-500/20">
                <ShieldCheck className="w-3 h-3 text-indigo-400" />
                {affiliate.badgeText}
              </span>
            )}
            <span className="text-xs text-zinc-500 font-mono">{affiliate.partnerName}</span>
          </div>

          <h4 className="text-base font-semibold text-zinc-100 group-hover:text-indigo-300 transition-colors">
            {affiliate.productTitle}
          </h4>
          <p className="text-xs text-zinc-400 line-clamp-2">{affiliate.description}</p>
        </div>

        <button
          onClick={handleClick}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-xs font-medium text-white shadow-md transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/25 active:scale-95 whitespace-nowrap"
        >
          <span>{affiliate.ctaText}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Tested & Verified Partner Link
        </span>
        <span>{affiliate.clickCount.toLocaleString()} community clicks</span>
      </div>
    </div>
  );
};
