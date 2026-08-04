import React from 'react';
import { useApp } from '../../context/AppContext';
import { Megaphone, ExternalLink } from 'lucide-react';

interface AdPlaceholderProps {
  format?: 'banner' | 'rectangle' | 'leaderboard';
  slotId?: string;
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ format = 'banner', className = '' }) => {
  const { settings } = useApp();

  if (!settings.monetization.enableAds) {
    return null;
  }

  const formatStyles = {
    leaderboard: 'w-full h-24 max-w-5xl mx-auto my-6',
    rectangle: 'w-full h-64 my-4',
    banner: 'w-full h-32 my-4',
  };

  return (
    <div
      className={`relative rounded-xl border border-dashed border-zinc-700/60 bg-zinc-900/40 p-4 flex flex-col items-center justify-center text-center transition-all hover:border-indigo-500/40 ${formatStyles[format]} ${className}`}
    >
      <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-mono tracking-wider text-zinc-500 uppercase bg-zinc-800/80 px-2 py-0.5 rounded">
        <span>Sponsored Ad</span>
        <Megaphone className="w-3 h-3 text-zinc-400" />
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-1">
          <ExternalLink className="w-4 h-4" />
        </div>
        <p className="text-xs font-semibold text-zinc-300">Monetization Ad Placement</p>
        <p className="text-[11px] text-zinc-500 max-w-md">
          Configurable Ad Unit (Google AdSense / Direct Sponsor Banner). Managed dynamically via Admin Dashboard.
        </p>
      </div>
    </div>
  );
};
