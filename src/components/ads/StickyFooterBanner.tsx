import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AdWrapper } from './AdWrapper';

export const StickyFooterBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className={`fixed bottom-0 left-0 w-full z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800/80 flex justify-center items-center pb-safe pt-2 px-4 shadow-lg ${className}`}>
      <div className="relative w-full max-w-5xl flex items-center justify-center">
        <AdWrapper placementKey="stickyFooter" className="!my-0" />
        <button
          onClick={() => setClosed(true)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          title="Close ad"
          aria-label="Close advertisement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
